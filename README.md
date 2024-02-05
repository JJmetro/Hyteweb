
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
