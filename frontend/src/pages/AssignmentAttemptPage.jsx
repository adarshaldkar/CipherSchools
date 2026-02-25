import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchAssignmentById,
  executeQuery as executeQueryApi,
  getHint as getHintApi,
} from '../services/api';
import SqlEditor from '../components/SqlEditor';
import SampleDataViewer from '../components/SampleDataViewer';
import ResultsTable from '../components/ResultsTable';
import HintPanel from '../components/HintPanel';
import Loading from '../components/Loading';

function AssignmentAttemptPage() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState('');
  const [executing, setExecuting] = useState(false);
  const [results, setResults] = useState(null);
  const [queryError, setQueryError] = useState(null);

  const [hint, setHint] = useState(null);
  const [hintLoading, setHintLoading] = useState(false);

  useEffect(() => {
    fetchAssignmentById(id)
      .then(setAssignment)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleExecute = useCallback(async () => {
    if (!query.trim()) return;
    setExecuting(true);
    setQueryError(null);
    setResults(null);
    try {
      const data = await executeQueryApi(query);
      setResults(data);
    } catch (err) {
      setQueryError(err.message);
    } finally {
      setExecuting(false);
    }
  }, [query]);

  const handleHint = useCallback(async () => {
    setHintLoading(true);
    try {
      const h = await getHintApi(assignment._id, query);
      setHint(h);
    } catch (err) {
      setHint('Unable to get hint at this time.');
    } finally {
      setHintLoading(false);
    }
  }, [assignment, query]);

  if (loading) return <Loading text="Loading assignment…" />;

  if (error) {
    return (
      <div className="attempt-page">
        <div className="container">
          <Link to="/" className="attempt-page__back">Back to Assignments</Link>
          <div className="attempt-page__error">{error}</div>
        </div>
      </div>
    );
  }

  const difficultyClass = assignment.difficulty.toLowerCase();

  return (
    <div className="attempt-page">
      <div className="container">
        <Link to="/" className="attempt-page__back">Back to Assignments</Link>

        <div className="attempt-page__layout">
          {/* Sidebar: Question + Sample Data */}
          <aside className="attempt-page__sidebar">
            <div className="attempt-page__question">
              <div className="attempt-page__question-header">
                <span
                  className={`attempt-page__difficulty attempt-page__difficulty--${difficultyClass}`}
                >
                  {assignment.difficulty}
                </span>
              </div>
              <h2 className="attempt-page__question-title">
                {assignment.title}
              </h2>
              <p className="attempt-page__question-desc">
                {assignment.description}
              </p>
            </div>

            <SampleDataViewer sampleData={assignment.sampleData} />
          </aside>

          {/* Main: Editor + Actions + Results */}
          <div className="attempt-page__main">
            <div className="attempt-page__editor-wrap">
              <div className="attempt-page__editor-header">
                <span className="attempt-page__editor-label">SQL Editor</span>
              </div>
              <div className="attempt-page__editor-container">
                <SqlEditor value={query} onChange={setQuery} />
              </div>
            </div>

            <div className="attempt-page__actions">
              <button
                className="attempt-page__btn attempt-page__btn--execute"
                onClick={handleExecute}
                disabled={!query.trim() || executing}
              >
                {executing && <span className="spinner-inline" />}
                {executing ? 'Executing…' : '▶ Execute Query'}
              </button>
              <button
                className="attempt-page__btn attempt-page__btn--hint"
                onClick={handleHint}
                disabled={hintLoading}
              >
                {hintLoading && <span className="spinner-inline" />}
                {hintLoading ? 'Getting Hint…' : '💡 Get Hint'}
              </button>
            </div>

            <HintPanel hint={hint} loading={hintLoading} />

            {queryError && (
              <div className="attempt-page__error">{queryError}</div>
            )}

            {executing && <Loading text="Executing query…" />}

            {results && (
              <ResultsTable columns={results.columns} rows={results.rows} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentAttemptPage;
