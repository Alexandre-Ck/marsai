import db from '../config/database.config.js';

const create = async (rate, userId, movieId) => {
  const sql = 'INSERT INTO ratings (rate, user_id, movie_id) VALUES (?, ?, ?)';
  const [result] = await db.query(sql, [rate, userId, movieId]);
  return result;
}; 

const getRating = async (userId, movieId) => {
  const sql = 'SELECT * FROM ratings WHERE user_id = ? AND movie_id = ?';
  const [rows] = await db.query(sql, [userId, movieId]);
  return rows[0]; // Retourne le premier résultat (s'il existe)
};

const deleteRating = async (userId, movieId) => {
  const sql = 'DELETE FROM ratings WHERE user_id = ? AND movie_id = ?';
  const [result] = await db.query(sql, [userId, movieId]);
  return result;
};

const updateRating = async (rate, userId, movieId) => {
  const sql = 'UPDATE ratings SET rate = ? WHERE user_id = ? AND movie_id = ?';
  const [result] = await db.query(sql, [rate, userId, movieId]);
  return result;
};

export { create as default, getRating, deleteRating, updateRating };