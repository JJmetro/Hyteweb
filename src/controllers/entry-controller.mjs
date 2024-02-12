import { listAllEntries, findEntryById, addEntry, updateEntryById, deleteEntryById } from "../models/entry-model.mjs";

const getEntries = async (req, res) => {
  try {
    const result = await listAllEntries();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const getEntryById = async (req, res) => {
  try {
    const entry = await findEntryById(req.params.id);
    if (entry) {
      res.json(entry);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const postEntry = async (req, res) => {
  const { filename, title, description, user_id } = req.body;
  if (filename && title && description && user_id) {
    try {
      const result = await addEntry({ filename, title, description, user_id });
      res.status(201).json({ message: 'New entry added.', ...result });
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  } else {
    res.sendStatus(400);
  }
};

const putEntry = async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await updateEntryById(req.params.id, { title, description });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const result = await deleteEntryById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

export { getEntries, getEntryById, postEntry, putEntry, deleteEntry };
