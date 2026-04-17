import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function TopicList({ topics, trackId }) {
  const { topicId } = useParams();
  const { state } = useAppContext();

  return (
    <div className="space-y-3">
      {topics.map((topic) => {
        const active = topic.id === topicId;
        const completed = state.completedTopics.includes(topic.id);

        return (
          <NavLink
            key={topic.id}
            to={`/track/${trackId}/topic/${topic.id}`}
            className={`block rounded-2xl border px-4 py-4 transition-all duration-200 ${
              active
                ? 'border-sky-500 bg-gradient-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/20 dark:border-white dark:bg-white dark:bg-none dark:text-slate-950 dark:shadow-none'
                : 'bg-white/95 text-slate-800 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50/80 hover:shadow-lg hover:shadow-sky-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-500'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{topic.title}</p>
                <p className={`mt-1 text-xs ${active ? 'text-white/80 dark:text-slate-500' : 'text-slate-500'}`}>
                  {topic.level}
                </p>
              </div>
              {completed ? <CheckCircle2 size={18} className={active ? 'text-emerald-200' : 'text-emerald-500'} /> : null}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                    active ? 'bg-white/10 text-white dark:bg-slate-200 dark:text-slate-950' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}

export default TopicList;
