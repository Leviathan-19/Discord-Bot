const { pool } = require('../config/database');

async function addMovie(title, type, year) {
  await pool.query(
    'INSERT INTO movies(title, type, release_year) VALUES($1,$2,$3)',
    [title, type, year]
  );
}

async function getRandomMovie() {
  const result = await pool.query(
    'SELECT * FROM movies ORDER BY RANDOM() LIMIT 1'
  );
  return result.rows[0];
}

module.exports = { addMovie, getRandomMovie };