const Assignment = require('../models/Assignment');
const { getHint } = require('../services/hintService');

const getHintController = async (req, res, next) => {
  try {
    const { assignmentId, query } = req.body;

    if (!assignmentId) {
      return res.status(400).json({ success: false, error: 'assignmentId is required' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }

    const hint = await getHint(assignment.title, assignment.description, query || '');
    res.json({ success: true, hint });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHint: getHintController };
