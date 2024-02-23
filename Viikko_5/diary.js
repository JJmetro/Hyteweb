const fetchbutton = document.getElementById('button5');
fetchbutton.addEventListener('click', showDiary);



// Fetch all users
async function showDiary() {

  
sessionStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VybmFtZSI6Imhhc2h0ZXN0MiIsImVtYWlsIjoidXBkYXRlNEBleGFtcGxlLmNvbSIsImNyZWF0ZWRfYXQiOiIyMDI0LTAyLTE2VDEwOjEzOjQwLjAwMFoiLCJ1c2VyX2xldmVsIjoicmVndWxhciIsImlhdCI6MTcwODY4MDk2NywiZXhwIjoxNzA4NzY3MzY3fQ.4qjK6BbFAmLe9fCfgasT_72Ug1oiofv1WjrxxzfvQnM');

  try {
    const token = sessionStorage.getItem('jwt_token');


    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('http://127.0.0.1:3000/api/entries/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Unauthorized');
    }

    const data = await response.json();
    console.log(data);

    const container = document.getElementById('container1');
    container.innerHTML = '';

    data.forEach(element => {
      const card = createCard(element);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    // Handle error or unauthorized access
    // For example, redirect to login page or display an error message
  }
}

function createCard(entry) {
  const card = document.createElement('div');
  card.classList.add('card');

  const entryId = document.createElement('p');
  entryId.textContent = `entry_id: ${entry.entry_id}`;
  card.appendChild(entryId);

  const userId = document.createElement('p');
  userId.textContent = `user_id: ${entry.user_id}`;
  card.appendChild(userId);

  const entryDate = document.createElement('p');
  entryDate.textContent = `user_id: ${entry.entry_date}`;
  card.appendChild(entryDate);

  const mood2 = document.createElement('p');
  mood2.textContent = `mood: ${entry.mood}`;
  card.appendChild(mood2);

  const weight2 = document.createElement('p');
  weight2.textContent = `weight: ${entry.weight}`;
  card.appendChild(weight2);

  const sleep_hours2 = document.createElement('p');
  sleep_hours2.textContent = `sleep_hours: ${entry.sleep_hours}`;
  card.appendChild(sleep_hours2);

  const notes2 = document.createElement('p');
  notes2.textContent = `notes: ${entry.notes}`;
  card.appendChild(notes2);

  console.log(entryId, userId,entryDate,mood2,weight2,sleep_hours2,notes2);

  return card;
}
