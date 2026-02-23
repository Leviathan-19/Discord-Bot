const db = require('../config/database');

async function searchTitlesByPrefix(prefix) {
  const query = `
    SELECT title
    FROM movies
    WHERE title ILIKE $1
    ORDER BY title ASC
    LIMIT 25
  `;

  const values = [`${prefix}%`];

  const { rows } = await db.query(query, values);
  return rows;
}

module.exports = {
  searchTitlesByPrefix,
};