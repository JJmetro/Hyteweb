import './style.css';
import { fetchData } from './fetch.js';


  let name = localStorage.getItem('name');
  document.getElementById('name').innerHTML = name;
 
  // # Get entries by id
  // # GET http://localhost:3000/api/entries/:id


// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat
const button1 = document.querySelector('.get_users');
button1.addEventListener('click', getAllUsers);


async function getAllUsers() {
  console.log('Button clicked!');

  try {
    const tokeni = localStorage.getItem('token');
    
    const response = await fetch('https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/users', {
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

    const data = await response.json();
    console.log(data);

    // Clear table body
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      let tr = document.createElement('tr');

      // td1 Username
      let td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2 userlvl
      let td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3 info-button
      let td3 = document.createElement('td');
      let button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      button1.addEventListener('click', () => getOneUserDialog(element.user_id)); 
      td3.appendChild(button1);

      // td4 delete-button
      let td4 = document.createElement('td');
      let button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      button2.innerText = 'Delete';
      button2.addEventListener('click', () => confirmDelete(element.user_id)); 
      td4.appendChild(button2);

      // td5 user-id
      let td5 = document.createElement('td');
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table body
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getOneUserDialog(userId) {
  try {
    const tokeni = localStorage.getItem('token');
      const response = await fetch(`https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

      const userData = await response.json();
      console.log(userData);
      // Open dialog and display user details
      openDialog(userData);
  } catch (error) {
      console.error('Error fetching user data:', error);
  }
}
function openDialog(userData) {
    // Get the dialog element
    const dialog = document.querySelector('.info_dialog');
    const spans = dialog.querySelectorAll('span');

    // Populate the spans with the data
    spans[0].innerText = userData.user_id;
    spans[1].innerText = userData.username;
    spans[2].innerText = userData.email;
    spans[3].innerText = userData.user_level;

    // Show dialog
    dialog.showModal();

    // close button
    const closeButton = dialog.querySelector('button[autofocus]');
    closeButton.addEventListener('click', () => {
        dialog.close();
    });
}

//user delete
async function confirmDelete(userId) {
  try {
    const tokeni = localStorage.getItem('token');
    const userLevel = localStorage.getItem('user_level');

    // Check if user is admin
    if (userLevel !== 'admin') {
      alert('Unauthorized: Only admins can delete users');
      return;
    }

    // Confirm the delete
    const isConfirmed = confirm(`Are you sure you want to delete the user with ID: ${userId}?`);

    if (!isConfirmed) {
      // If not confirmed, exit
      return;
    }

    // DELETE request
    const response = await fetch(`https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

    if (!response.ok) {
      const responseData = await response.json();
      if (responseData.error && responseData.error === 409) {
        alert('Cannot delete user: user has diary entries, need to be deleted first.');
      } else {
        throw new Error('Failed to delete user');
      }
  } else {
    // Show success message if the user is successfully deleted
    alert('User deleted successfully');
  }

  // to refresh the list after succesful delete
  await getAllUsers();
      
  } catch (error) {
    alert('Error deleting user: ' + error.message);
  }
}


//entry delete

async function confirmEntryDelete(entry_id) {
  try {
    const tokeni = localStorage.getItem('token');
      // confirm the delete
      const isConfirmed = confirm(`Are you sure you want to delete the entry with ID: ${entry_id}?`);

      if (!isConfirmed) {
          // if not confirmed, goes back
          return;
      }

      // DELETE-req
      const response = await fetch(`https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries/${entry_id}`, {
        method: 'DELETE',
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });
     
      if (!response.ok) {
          throw new Error('Failed to delete entry');
      }

      alert('entry deleted successfully');

// to refresh the list after succesful delete
      await getEntry();
      
  } catch (error) {
      window.alert('Error deleting entry', error);
  }
}
// adding entry

const addButton = document.getElementById('addEntryButton');

const entryForm = document.querySelector('.addform');

addButton.addEventListener('click', async (event) => {
  event.preventDefault();
console.log(addButton)

const entryDateInput = document.getElementById('entry_date').value;
const entryDate = formatDate(entryDateInput);
  const mood = document.getElementById('mood').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const sleephours = parseInt(document.getElementById('sleep_hours').value);
  const notes = document.getElementById('notes').value;

  const entryData = {
    entry_date: entryDate,
    mood: mood,
    weight: weight,
    sleep_hours: sleephours,
    notes: notes
  };
console.log(entryData)
try {
  const tokeni = localStorage.getItem('token');

  const response = await fetch('https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + tokeni
    },
    body: JSON.stringify(entryData)
  });

  if (!response.ok) {
    throw new Error('Failed to add entry');
  }

  alert('Entry added successfully');


  // input field reset
  document.getElementById('entry_date').value = '';
  document.getElementById('mood').value = '';
  document.getElementById('weight').value = '';
  document.getElementById('sleep_hours').value = '';
  document.getElementById('notes').value = '';


} catch (error) {
  console.error('Error adding entry:', error);
  alert('Error adding entry: ' + error.message);
}
});

//need to reformat the date so the backend accepts it.
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// user info update
const put = document.getElementById('putUserButton');
put.addEventListener('click', async () => {
  const tokeni = localStorage.getItem('token');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  const formData = {
    username: username,
    password: password,
    email: email
  };

  try {
    const response = await fetch(`https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/users/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tokeni, 
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    window.alert('User updated successfully');

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('email').value = '';

  } catch (error) {
    window.alert('Error updating user: Inserted account information is not valid or dont meet the requirements. ');
  }
});


// get users own entries!

const button = document.querySelector('.get_entry');
button.addEventListener('click', getEntry);

async function getEntry(){


  console.log('Button clicked!');

  try {
    const tokeni = localStorage.getItem('token');

    const response = await fetch('https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries', {
      headers: {
        Authorization: 'Bearer: ' + tokeni,
      }
    });

    const data = await response.json();
    console.log(data)
    
    if (data.length === 0) {
      alert('No diary entries found!');
      return;
    }

    // Clear table body
    const tbody = document.querySelector('.tbody1');
    tbody.innerHTML = '';

    // Iterate over each entry in the data array
    data.forEach(entry => {
      // Create table row element
      let tr = document.createElement('tr');


      // entry_id
      let entd0 = document.createElement('td');
      entd0.innerText = entry.entry_id;

      //username from users
      let entd1 = document.createElement('td');
      entd1.innerText = entry.username;

      // entry_date
      let entd2 = document.createElement('td');
      entd2.innerText = entry.entry_date;

      // mood
      let entd3 = document.createElement('td');
      entd3.innerText = entry.mood;

      // weight
      let entd4 = document.createElement('td');
      entd4.innerText = parseFloat(entry.weight).toFixed(2);

      // sleep_hours
      let entd5 = document.createElement('td');
      entd5.innerText = parseInt(entry.sleep_hours);

      // notes
      let entd6 = document.createElement('td');
      entd6.innerText = entry.notes;

      // created_at
      let entd7 = document.createElement('td');
      entd7.innerText = entry.created_at;


      // delete-button
      let entd8 = document.createElement('td');
      let button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', entry.entry_id);
      button2.innerText = 'Delete';
      button2.addEventListener('click', () => confirmEntryDelete(entry.entry_id)); 
      entd8.appendChild(button2);

      tr.appendChild(entd0);
      tr.appendChild(entd1);
      tr.appendChild(entd2);
      tr.appendChild(entd3);
      tr.appendChild(entd4);
      tr.appendChild(entd5);
      tr.appendChild(entd6);
      tr.appendChild(entd7);
      tr.appendChild(entd8);

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}


// logout function!

const logoutLink = document.querySelector('.activate_logout');
logoutLink.addEventListener('click', logout);

// Logout function
function logout(evt) {
  evt.preventDefault();

  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('user_level');

  alert('You have been logged out successfully!');

  // Redirect user to login page
  window.location.href = 'start-auth.html'; 
}