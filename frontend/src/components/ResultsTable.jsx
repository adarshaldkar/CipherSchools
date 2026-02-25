function ResultsTable({ columns, rows }) {
  return (
    <div className="results-table">
      <div className="results-table__header">
        <span className="results-table__title">Query Results</span>
        <span className="results-table__count">
          {rows.length} row{rows.length !== 1 ? 's' : ''}
        </span>
      </div>
      {rows.length === 0 ? (
        <div className="results-table__empty">Query returned no results.</div>
      ) : (
        <div className="results-table__scroll">
          <table className="results-table__table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} className="results-table__th">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="results-table__tr">
                  {columns.map((col) => (
                    <td key={col} className="results-table__td">
                      {row[col] === null ? 'NULL' : String(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResultsTable;
