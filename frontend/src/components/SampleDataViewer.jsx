function SampleDataViewer({ sampleData }) {
  if (!sampleData) return null;

  const { tableName, columns = [], rows = [] } = sampleData;

  if (columns.length === 0) return null;

  return (
    <div className="sample-data">
      <div className="sample-data__header">
        <span className="sample-data__title">Sample Data</span>
        <span className="sample-data__table-name">{tableName}</span>
      </div>

      <div className="sample-data__section">
        <div className="sample-data__section-title">Schema</div>
        <div className="sample-data__schema">
          {columns.map((col) => (
            <span key={col.name} className="sample-data__column">
              <span className="sample-data__column-name">{col.name}</span>
              <span className="sample-data__column-type">{col.type}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="sample-data__section">
        <div className="sample-data__section-title">Rows</div>
        <div className="sample-data__scroll">
          <table className="sample-data__table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.name} className="sample-data__th">
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="sample-data__tr">
                  {row.map((cell, j) => (
                    <td key={j} className="sample-data__td">
                      {cell === null ? 'NULL' : String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SampleDataViewer;
