const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wjj030529!',
  database: 'menu_items'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Route to handle fetching menu items
app.get('/menu', async (req, res) => {
    const { mealType } = req.query;
    try {
      let query = `
        SELECT * 
        FROM food 
        WHERE calories <> 'None' 
      `;
      if (mealType) {
        query += `AND meal_type = '${mealType}'`;
      }
    console.log('mealType:', mealType);
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Error fetching menu items');
        return;
      }
      res.json(results);
    });
    }
    catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send('Error fetching menu items');
      };
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
