import { useState, useEffect } from 'react';
import { fetchAssignments } from '../services/api';
import AssignmentCard from '../components/AssignmentCard';
import Loading from '../components/Loading';

function AssignmentListPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments()
      .then(setAssignments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading text="Loading assignments…" />;

  return (
    <div className="assignment-list">
      <div className="container">
        <h1 className="assignment-list__heading">SQL Assignments</h1>
        <p className="assignment-list__subheading">
          Practice your SQL skills with these curated assignments.
        </p>

        {error && <div className="assignment-list__error">{error}</div>}

        {!error && assignments.length === 0 && (
          <div className="assignment-list__empty">
            No assignments available yet.
          </div>
        )}

        <div className="assignment-list__grid">
          {assignments.map((a) => (
            <AssignmentCard key={a._id} assignment={a} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssignmentListPage;
