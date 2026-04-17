import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTopicProgress } from '../utils/topicHelpers';
import { useAppContext } from '../context/AppContext';

function TrackSummaryCard({ track }) {
  const { state } = useAppContext();
  const progress = getTopicProgress(state, track);

  return (
    <article className="panel-surface soft-hover relative overflow-hidden rounded-[32px] p-6 md:p-8">
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${track.accent}`} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">
          {track.heroStats.map((stat) => (
            <span
              key={stat}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {stat}
            </span>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{track.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 dark:text-slate-300">{track.shortDescription}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {track.topics.slice(0, 4).map((topic) => (
            <div key={topic.id} className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{topic.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{topic.level}</p>
                </div>
                {state.completedTopics.includes(topic.id) ? <CheckCircle2 size={18} className="text-emerald-500" /> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-300">
            <span>Track progress</span>
            <span>{progress.completed}/{progress.total} topics</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className={`h-full rounded-full bg-gradient-to-r ${track.accent}`} style={{ width: `${progress.percentage}%` }} />
          </div>
        </div>

        <Link
          to={`/track/${track.id}`}
          className="primary-pill inline-flex w-fit items-center gap-2 px-5 py-3 text-sm font-semibold"
        >
          Explore {track.title}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

export default TrackSummaryCard;
