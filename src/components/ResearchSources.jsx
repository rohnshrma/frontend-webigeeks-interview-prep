import React from 'react';
import { ExternalLink, Newspaper } from 'lucide-react';

function ResearchSources({ sources }) {
  if (!sources?.length) {
    return null;
  }

  return (
    <div className="panel-surface rounded-[28px] p-5">
      <div className="flex items-center gap-2">
        <Newspaper size={18} className="text-slate-500 dark:text-slate-300" />
        <h3 className="font-semibold text-slate-900 dark:text-white">Research Sources</h3>
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
        Question mix tuned against recent 2025-2026 interview-bank pages and common fresher prep topics.
      </p>
      <div className="mt-4 space-y-3">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-slate-200 bg-white/95 p-4 text-sm text-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50/80 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800"
          >
            <span className="inline-flex items-center gap-2 font-semibold">
              {source.label}
              <ExternalLink size={14} />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ResearchSources;
