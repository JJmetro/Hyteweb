SELECT 
  Users.user_id, 
  Users.username, 
  DiaryEntries.entry_id, 
  DiaryEntries.entry_date, 
  DiaryEntries.mood, 
  DiaryEntries.notes
FROM 
  Users
LEFT JOIN DiaryEntries 
  ON Users.user_id = DiaryEntries.user_id;


  SELECT * FROM users;
  SELECT * FROM diaryentries;