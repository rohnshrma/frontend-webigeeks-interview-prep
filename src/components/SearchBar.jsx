import React from 'react';
import { Search, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function SearchBar({ placeholder = 'Search interview questions, answers, or code...' }) {
  const { state, dispatch } = useAppContext();

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input
        type="text"
        value={state.searchTerm}
        onChange={(event) => dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value })}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-800 outline-none ring-0 transition-all duration-200 placeholder:text-slate-500 focus:border-sky-300 focus:bg-white focus:shadow-lg focus:shadow-sky-500/10 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-100"
      />
      {state.searchTerm ? (
        <button
          type="button"
          onClick={() => dispatch({ type: 'SET_SEARCH_TERM', payload: '' })}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-100"
        >
          <X size={18} />
        </button>
      ) : null}
    </div>
  );
}

export default SearchBar;
