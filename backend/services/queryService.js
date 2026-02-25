const { pool } = require('../config/db');

const executeQuery = async (query) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN READ ONLY');
    await client.query('SET statement_timeout = 5000');

    const result = await client.query(query);

    await client.query('COMMIT');

    const columns = result.fields.map((f) => f.name);
    const rows = result.rows;

    return { columns, rows };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { executeQuery };
