import { Component } from 'react';
import Editor from '@monaco-editor/react';

class EditorErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function SqlEditor({ value, onChange }) {
  const fallback = (
    <textarea
      className="sql-editor-fallback"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your SQL query here..."
      spellCheck={false}
    />
  );

  return (
    <EditorErrorBoundary fallback={fallback}>
      <Editor
        language="sql"
        theme="vs-dark"
        value={value}
        onChange={(val) => onChange(val || '')}
        loading={<div className="sql-editor-loading">Loading editor…</div>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 12 },
          wordWrap: 'on',
        }}
      />
    </EditorErrorBoundary>
  );
}

export default SqlEditor;
