const Assignment = require('../models/Assignment');

const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };

const getAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find().lean();
    assignments.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    res.json({ success: true, data: assignments });
  } catch (err) {
    next(err);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id).lean();
    if (!assignment) {
      return res.status(404).json({ success: false, error: 'Assignment not found' });
    }
    res.json({ success: true, data: assignment });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAssignments, getAssignmentById };
