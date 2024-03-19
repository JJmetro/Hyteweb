# Prequisites
node.js + Express
# Start
start dev server: 'npm run dev'
pm2 start src/index.js
# Link to API documentation

https://hyte-vm-servu.northeurope.cloudapp.azure.com/docs/


# Link to the application

https://hyte-vm-servu.northeurope.cloudapp.azure.com/index.html




# Get all users (requires token)

https://hyte-vm-servu.northeurope.cloudapp.azure.com/users

![](images/get_users.png)




# Delete user (requires token)

In the UI its been modified that admin can delete any user and regular user can only affect only in own userdata. First user must delete their own entries before user deletion.

![](images/delete_user.png)

https://hyte-vm-servu.northeurope.cloudapp.azure.com/users/:id

# Create user

![](images/create_user.png)


POST https://hyte-vm-servu.northeurope.cloudapp.azure.com/users
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Update user's own data (requires token)

user can see the updates in user data in the user list immediately when user refreshes the list.

![](images/update_user.png)

PUT https://hyte-vm-servu.northeurope.cloudapp.azure.com/users/
content-type: application/json

{
  "username": "test-update4",
  "password": "test-pw-update4",
  "email": "update4@example.com"
}

# Login

![](images/login.png)




POST https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/users/login
content-type: application/json

{
  "username": "user",
  "password": "secret"
}

# Logout

UI has a functioning logout, After user clicks the logout, The localstorage empties itself with the gathered data so relogin is required to get back in.



# Get all entries(requires token)

Modified in the UI that user that is logged in can see only their own entries,
User that is admin can see everyones entries and delete them also.

![](images/get_entries.png)



GET https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries/:id
GET https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/auth/entries


# Post entry (requires token)

Idecided to get rid off the update entry (PUT), The deletion is so quick and easy so user can delete old entry and just do it again.

![](images/add_entry.png)

POST https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day"

}



# Delete entry ( requires token)

user can delete own entries and have to delete them if they want to delete their user from the application.
Admin can do that also.

DELETE https://hyte-vm-servu.northeurope.cloudapp.azure.com/api/entries/:id

![](images/delete_entries.png)

# Database architecture
At this stage this application is using only 2 of the 4 tables (users, diaryentries)

![](images/database_diagram.png)


# Known bugs / problems
After user deletes its account, user must logout to finalize the deletion. 
#home and #about is unresponsive. (does not reroute to another site)
/docs has wrong example url. problems with the server to clone new modified code so the url would change. 


# Contributors

with support and teaching from course teachers: Matti Peltoniemi and Ulla Sederlöf at Metropolia UAS.
