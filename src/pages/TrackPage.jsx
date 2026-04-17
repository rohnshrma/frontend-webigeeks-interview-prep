import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getTopicProgress } from '../utils/topicHelpers';

function TrackPage() {
  const { trackId } = useParams();
  const { tracks, state, dispatch } = useAppContext();
  const track = tracks.find((item) => item.id === trackId);

  if (!track) {
    return <p className="text-sm text-slate-500">Track not found.</p>;
  }

  const progress = getTopicProgress(state, track);

  return (
    <div className="space-y-8">
      {/* Track header */}
      <section className="panel-surface rounded-[34px] p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Track overview</p>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">{track.title}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-700 dark:text-slate-300">{track.shortDescription}</p>
          </div>
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-300">
              <span>Completion</span>
              <span className="font-bold text-slate-800 dark:text-white">
                {progress.completed}/{progress.total} topics
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${track.accent} transition-all duration-500`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 text-right">{progress.percentage}% complete</p>
          </div>
        </div>
      </section>

      {/* Topic cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {track.topics.map((topic) => {
          const completed = state.completedTopics.includes(topic.id);
          const qCount   = topic.questions?.length ?? 0;

          return (
            <article key={topic.id} className="panel-surface rounded-[28px] p-5 flex flex-col hover:shadow-lg transition-shadow dark:hover:shadow-slate-900/30">
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{topic.level}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{topic.title}</h3>
                </div>
                {/* Completion indicator */}
                <div className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border ${
                  completed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20'
                    : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20'
                }`}>
                  {completed
                    ? <><CheckCircle2 size={12} className="fill-current" /> Done</>
                    : <><Clock size={12} /> Pending</>
                  }
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 flex-1">{topic.intro}</p>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Completion toggle + Practice button */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: 'TOGGLE_COMPLETE_TOPIC', payload: topic.id });
                  }}
                  className={`flex-shrink-0 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                    completed
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300'
                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {completed ? '✓ Completed' : 'Mark Done'}
                </button>

                <Link
                  to={`/track/${track.id}/topic/${topic.id}`}
                  className="primary-pill flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold"
                >
                  {qCount} questions
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default TrackPage;
