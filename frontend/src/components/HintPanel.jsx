function HintPanel({ hint, loading }) {
  if (!hint && !loading) return null;

  return (
    <div className="hint-panel">
      <div className="hint-panel__header">
        <span className="hint-panel__icon">💡</span>
        <span className="hint-panel__title">Hint</span>
      </div>
      <div className="hint-panel__body">
        {loading ? (
          <div className="hint-panel__loading">
            <span className="spinner-inline" />
            Getting hint…
          </div>
        ) : (
          <p className="hint-panel__text">{hint}</p>
        )}
      </div>
    </div>
  );
}

export default HintPanel;
