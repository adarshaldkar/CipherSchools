const queryValidator = (req, res, next) => {
  const { query } = req.body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Query cannot be empty' });
  }

  const trimmed = query.trim();
  const upper = trimmed.toUpperCase();

  const blockedKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE'];
  for (const keyword of blockedKeywords) {
    const regex = new RegExp(`\b${keyword}\b`);
    if (regex.test(upper)) {
      return res.status(400).json({ success: false, error: `Forbidden keyword: ${keyword}` });
    }
  }

  if (trimmed.includes(';')) {
    return res.status(400).json({ success: false, error: 'Multiple statements are not allowed' });
  }

  if (trimmed.includes('--') || trimmed.includes('/*') || trimmed.includes('*/')) {
    return res.status(400).json({ success: false, error: 'SQL comments are not allowed' });
  }

  if (!upper.startsWith('SELECT')) {
    return res.status(400).json({ success: false, error: 'Only SELECT queries are allowed' });
  }

  next();
};

module.exports = queryValidator;
