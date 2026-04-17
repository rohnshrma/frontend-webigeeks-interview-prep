import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  BookOpenCheck,
  Bookmark,
  LogOut,
  Moon,
  SunMedium,
  UserCircle2,
  ChevronDown,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { useAppContext } from "../context/AppContext";

function UserMenu({ user, logout }) {
  const { state, dispatch } = useAppContext();
  const darkMode = state.theme === "dark";
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="ghost-chip inline-flex items-center gap-2 px-2.5 py-1.5 text-sm font-semibold"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Avatar circle */}
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-orange-400 text-xs font-extrabold text-white shadow">
          {initial}
        </span>
        <span className="hidden max-w-[120px] truncate md:block">
          {user?.name}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right animate-in fade-in slide-in-from-top-2 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-slate-950/50"
          style={{ animationDuration: "150ms" }}
        >
          {/* Profile row */}
          <div className="flex items-center gap-3 rounded-xl px-3 py-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-orange-400 text-sm font-extrabold text-white shadow">
              {initial}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {darkMode ? (
              <SunMedium size={16} className="flex-shrink-0 text-amber-500" />
            ) : (
              <Moon size={16} className="flex-shrink-0 text-sky-500" />
            )}
            {darkMode ? "Light mode" : "Dark mode"}
          </button>

          <div className="my-1 h-px bg-slate-100 dark:bg-slate-800" />

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <LogOut size={16} className="flex-shrink-0" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function GuestMenu() {
  const { state, dispatch } = useAppContext();
  const darkMode = state.theme === "dark";

  return (
    <>
      {/* Theme icon-only button for guests */}
      <button
        type="button"
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className="ghost-chip inline-flex items-center justify-center p-2 text-sm"
        aria-label="Toggle theme"
      >
        {darkMode ? <SunMedium size={17} /> : <Moon size={17} />}
      </button>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            isActive
              ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950"
              : "text-slate-700 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-300 dark:hover:bg-slate-900"
          }`
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="primary-pill inline-flex items-center px-4 py-2 text-sm font-semibold"
      >
        Register
      </NavLink>
    </>
  );
}

function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAppContext();
  const hideSearch = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/82 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/55">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center gap-3 soft-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-500 to-sky-400 text-white shadow-lg shadow-indigo-500/25">
              <BookOpenCheck size={22} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.36em] text-slate-400">
                by WebiGeeks
              </p>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Interview Prep
              </h1>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950"
                    : "text-slate-700 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-950"
                    : "text-slate-700 hover:-translate-y-0.5 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              <Bookmark size={16} />
              Saved
            </NavLink>

            {/* User menu or guest controls — always at end */}
            {isAuthenticated ? (
              <UserMenu user={user} logout={logout} />
            ) : (
              <GuestMenu />
            )}
          </nav>
        </div>

        {!hideSearch && isAuthenticated ? <SearchBar /> : null}
      </div>
    </header>
  );
}

export default Header;
