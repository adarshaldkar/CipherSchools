import { Link } from 'react-router-dom';

function AssignmentCard({ assignment }) {
  const difficultyClass = assignment.difficulty.toLowerCase();

  return (
    <div className="assignment-card">
      <div className="assignment-card__header">
        <span
          className={`assignment-card__difficulty assignment-card__difficulty--${difficultyClass}`}
        >
          {assignment.difficulty}
        </span>
      </div>
      <h3 className="assignment-card__title">{assignment.title}</h3>
      <p className="assignment-card__description">{assignment.description}</p>
      <div className="assignment-card__footer">
        <Link
          to={`/assignment/${assignment._id}`}
          className="assignment-card__button"
        >
          Start Assignment →
        </Link>
      </div>
    </div>
  );
}

export default AssignmentCard;
