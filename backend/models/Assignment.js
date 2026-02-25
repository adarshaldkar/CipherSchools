const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  sampleData: {
    tableName: String,
    columns: [
      {
        name: { type: String },
        type: { type: String },
      },
    ],
    rows: [[mongoose.Schema.Types.Mixed]],
  },
  expectedConcept: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
