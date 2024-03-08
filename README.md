
node.js + Express

start dev server: 'npm run dev'

Kysy matilta "getuserByid ja putuser" tarviiko merkkijono muutta numeroksi? = const userId = Number(req.params.id);



 // tietokanta kysely perusteet

SELECT [ALL | DISTINCT] column1[,column2]
  FROM table1[,table2]
  [WHERE conditions]
  [GROUP BY column-list]
  [HAVING conditions]
  [ORDER BY column-list [ASC | DESC] ]
  [LIMIT number];

select - selects desired column(s) * means every column
from which table(s) the data is retrieved from
where - Conditions that records must satisfy (optional)
group by - Group records by given column(s) (optional)
having - Conditions that groups must satisfy (optional)
order by - Order records by given column(s) in ASCending or DESCending order (optional)
limit - Limit the number of records (optional)

// exmample querys "  SELECT username, entry_date, mood, notes FROM users, DiaryEntries WHERE DiaryEntries.user_id = Users.user_id; "

mariaDB root user password: 1234


Testaa entry id 9 postmänillä kun jatkat.   hashtest2    pw: hash2_password


# Get all users (requires token)
GET http://127.0.0.1:3000/users

# Get user by id (requires token)
GET http://127.0.0.1:3000/users/:id

# Delete user (requires token)
DELETE http://127.0.0.1:3000/users/:id

# Create user
POST http://127.0.0.1:3000/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Update user's own data (requires token)
PUT http://127.0.0.1:3000/users/
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Login
POST http://localhost:3000/api/users/login
content-type: application/json

{
  "username": "user",
  "password": "secret"
}


# Get all entries for a logged in user (requires token)
GET http://localhost:3000/api/auth/entries

# Get entries by id (needs token too)
GET http://localhost:3000/api/entries/:id

# Post entry(posting new entry takes the user_id from the token, so it requires token to post)
POST http://localhost:3000/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day"

}

# Update entry (requires token/ can only update users own entries)
PUT http://localhost:3000/api/entries/:id
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Delete entry ( requires token / user cna only delete his own entries.)
DELETE http://localhost:3000/api/entries/:id
