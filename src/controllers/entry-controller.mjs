import { validationResult } from 'express-validator';
import {
  listAllEntries,
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesById,
} from '../models/entry-model.mjs';

const getEntries = async (req, res) => {
  try {
    let result;
    const userLevel = req.user.user_level;

    if (userLevel === 'admin') {
      // If user is admin, retrieve all entries
      result = await listAllEntries();
    } else {
      // if not, retrieve only logged-in user's own entries
      result = await listAllEntriesById(req.user.user_id);
    }

    res.json(result);
  } catch (error) {
    console.error('Error getting entries:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};



const postEntry = async (req, res, next) => {
  const errors = validationResult(req);

  // check if any validation errors
  if (!errors.isEmpty()) {
    console.log('postEntry errors', errors.array());
    const error = new Error('Invalid input');
    error.status = 400;
    error.errors = validationErrors.errors;
    return next(error);
  }

  // get fields from request body
  const { entry_date, mood, weight, sleep_hours, notes } = req.body;
  // req.user is added by authenticateToken middleware
  const user_id = req.user.user_id;
  // combine fields into a new entry object
  const newEntry = { user_id, entry_date, mood, weight, sleep_hours, notes };
  const result = await addEntry(newEntry);

  if (result.error) {
    const error = new Error(result.error);
    error.status = 400;
    return next(error);
  }

  res.status(201).json({ message: 'New entry added.', ...result });
};



const putEntry = async (req, res, next) => {
  const entry_id = req.params.id;

  // Check if any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  if (entry_id) {
      try {
          // get user_id
          const userIdFromToken = req.user.user_id;


          const entry = await findEntryById(entry_id);
          if (!entry) {
              return res.status(404).json({ error: 'Entry not found' });
          }
          // Check if the user ID from token matches the user ID
          if (entry.user_id !== userIdFromToken) {
              return res.status(403).json({ error: 'Unauthorized' });
          }

          // If the user is authorized --> update entry
          const result = await updateEntryById({ entry_id, ...req.body });
          return res.status(200).json(result);
      } catch (error) {
          console.error('Error updating entry:', error);
          return res.status(500).json({ error: 'Internal server error' });
      }
  } else {
      return res.status(400).json({ error: 400, message: 'Bad request' });
  }
};


const deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;

    // Check if the user is an administrator, they can delete anything.
    if (req.user.user_level === 'admin') {
      const result = await deleteEntryById(entryId);
      if (result.error) {
        return res.status(result.error).json(result);
      }
      return res.json(result);
    }

    // Check if the user is deleting their own entry
    const userId = req.user.user_id;
    const entry = await getEntryById(entryId);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (entry.user_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own entries' });
    }

    const result = await deleteEntryById(entryId);
    if (result.error) {
      return res.status(result.error).json(result);
    }
    return res.json(result);
  } catch (error) {
    console.error('Error deleting entry:', error);
    return res.status(500).json({ error: 'Database error' });
  }
};






export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
