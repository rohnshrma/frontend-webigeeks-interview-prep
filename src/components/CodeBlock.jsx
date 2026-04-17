import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

function getLanguage(code) {
  const normalized = code.trim();

  if (normalized.startsWith('<')) {
    return 'markup';
  }

  if (normalized.startsWith('.') || normalized.includes('{') && normalized.includes('color:')) {
    return 'css';
  }

  if (code.includes('SELECT') || code.includes('FROM') || code.includes('GROUP BY')) {
    return 'sql';
  }

  if (code.startsWith('=')) {
    return 'excel-formula';
  }

  if (code.includes('import pandas as pd') || code.includes('import numpy as np') || code.includes('print(')) {
    return 'python';
  }

  if (code.includes('db.') || code.includes('ObjectId(')) {
    return 'javascript';
  }

  return 'jsx';
}

function CodeBlock({ code }) {
  if (!code) {
    return null;
  }

  const language = getLanguage(code);

  return (
    <Highlight code={code} language={language} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm`}
          style={style}
        >
          {tokens.map((line, index) => (
            <div key={index} {...getLineProps({ line })}>
              <span className="mr-4 inline-block w-6 select-none text-slate-500">{index + 1}</span>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

export default CodeBlock;
