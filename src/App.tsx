import { useMemo, useState } from 'react';
import { runProductSearch } from './examples/product-search';
import { runSearchTermPrediction } from './examples/search-term-prediction';

const EXAMPLE_OPTIONS = [
  { id: 'search-term-prediction', label: 'Search Term Prediction' },
  { id: 'product-search', label: 'Product Search' },
];

function resolveExampleId() {
  const params = new URLSearchParams(window.location.search);

  // Explicit example param takes priority: ?example=search-term-prediction
  const exampleParam = params.get('example');
  if (exampleParam) return exampleParam;

  // Fallback: derive from the StackBlitz file param: ?file=src%2Fsearch-term-prediction.ts
  const fileParam = params.get('file');
  if (fileParam) {
    const decoded = fileParam.split('/').pop();
    if (decoded) {
      return decoded.replace(/\.[^.]+$/, '');
    }
  }

  return 'search-term-prediction';
}

function App() {
  const exampleId = useMemo(() => {
    const resolved = resolveExampleId();
    return EXAMPLE_OPTIONS.some((opt) => opt.id === resolved)
      ? resolved
      : 'search-term-prediction';
  }, []);
  const [selectedExample, setSelectedExample] = useState(exampleId);
  const [datasetId, setDatasetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    const logs: string[] = [];

    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      const message = args
        .map((arg) =>
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        )
        .join(' ');
      logs.push(message);
      originalLog(...args);
    };

    try {
      if (selectedExample === 'product-search') {
        await runProductSearch({ datasetId, apiKey, serverUrl });
      } else {
        await runSearchTermPrediction({ datasetId, apiKey, serverUrl });
      }
    } catch (error) {
      logs.push(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    console.log = originalLog;
    setOutput(logs);
    setIsRunning(false);
  };

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label htmlFor="example" style={{ fontWeight: 600, fontSize: '14px' }}>
          Example
        </label>
        <select
          id="example"
          value={selectedExample}
          onChange={(e) => setSelectedExample(e.target.value)}
          style={{ padding: '6px 8px', fontSize: '14px' }}
        >
          {EXAMPLE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <h2>
        {EXAMPLE_OPTIONS.find((opt) => opt.id === selectedExample)?.label ??
          'Search Term Prediction'}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="datasetId"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Dataset ID
          </label>
          <input
            id="datasetId"
            type="text"
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            placeholder="Enter dataset ID"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="apiKey"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="serverUrl"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Server URL
          </label>
          <input
            id="serverUrl"
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="Enter server URL"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={isRunning}
        style={{ marginBottom: '20px' }}
      >
        {isRunning ? 'Running...' : 'Run'}
      </button>

      <pre
        style={{
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          overflow: 'auto',
          minHeight: '200px',
        }}
      >
        {output.length > 0
          ? output.join('\n')
          : 'Click "Run" to execute the selected example'}
      </pre>
    </div>
  );
}

export default App;
