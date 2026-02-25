const { executeQuery } = require('../services/queryService');

const runQuery = async (req, res, next) => {
  try {
    const { query } = req.body;
    const data = await executeQuery(query);
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { executeQuery: runQuery };
