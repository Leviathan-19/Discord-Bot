const pool = require('../config/database');

async function searchTitlesByPrefix(prefix) {
  const { rows } = await pool.query(
    `SELECT title FROM movies 
     WHERE title ILIKE $1 
     LIMIT 25`,
    [`${prefix}%`]
  );

  return rows;
}

module.exports = {
  searchTitlesByPrefix
};