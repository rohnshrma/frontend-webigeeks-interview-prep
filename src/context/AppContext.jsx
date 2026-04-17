import React from 'react';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { appReducer, initialState } from '../reducer/appReducer';
import { getTracks } from '../data/tracks';
import {
  getCurrentUser,
  getProgress,
  loginUser,
  registerUser,
  updateProgress,
  updateTopicAction,
  updateQuestionAction,
} from '../utils/api';

const AppContext = createContext(null);
const THEME_STORAGE_KEY = 'webigeeks-theme';
const TOKEN_STORAGE_KEY = 'webigeeks-token';

function loadInitialState() {
  if (typeof window === 'undefined') return initialState;
  try {
    return {
      ...initialState,
      theme: window.localStorage.getItem(THEME_STORAGE_KEY) ?? initialState.theme,
    };
  } catch {
    return initialState;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, loadInitialState);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_STORAGE_KEY) ?? '');
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  // State flag (not ref) so sync effect fires only AFTER hydrated state is committed
  const [progressHydrated, setProgressHydrated] = useState(false);
  const tracks = getTracks();

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
  }, [state.theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', state.theme === 'dark');
    document.body.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Bootstrap session on token change
  useEffect(() => {
    async function bootstrapSession() {
      setProgressHydrated(false);
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const userPayload = await getCurrentUser(token);
        const progressPayload = await getProgress(token);
        setUser(userPayload.user);
        dispatch({ type: 'HYDRATE_PROGRESS', payload: progressPayload.progress });
        setProgressHydrated(true);
      } catch (error) {
        window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken('');
        setUser(null);
        dispatch({ type: 'RESET_PROGRESS' });
        setAuthError(error.message);
      } finally {
        setAuthLoading(false);
      }
    }
    bootstrapSession();
  }, [token]);

  // Debounced progress sync — only after hydration is committed to state
  useEffect(() => {
    if (!token || !progressHydrated) return;

    const timeoutId = window.setTimeout(() => {
      updateProgress(token, {
        savedQuestions: state.savedQuestions,
        importantQuestions: state.importantQuestions,
        completedTopics: state.completedTopics,
        topicActions: state.topicActions,
        questionActions: state.questionActions,
      }).catch((error) => setAuthError(error.message));
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [
    token,
    progressHydrated,
    state.savedQuestions,
    state.importantQuestions,
    state.completedTopics,
    state.topicActions,
    state.questionActions,
  ]);

  async function handleAuth(authAction, credentials) {
    setAuthError('');
    setAuthLoading(true);
    try {
      const payload = await authAction(credentials);
      window.localStorage.setItem(TOKEN_STORAGE_KEY, payload.token);
      setToken(payload.token);
      setUser(payload.user);
      dispatch({ type: 'HYDRATE_PROGRESS', payload: payload.progress });
      setProgressHydrated(true);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  }

  async function login(credentials) {
    return handleAuth(loginUser, credentials);
  }

  async function register(credentials) {
    setAuthError('');
    setAuthLoading(true);
    try {
      const payload = await registerUser(credentials);
      setAuthLoading(false);
      return { success: true, pending: payload.pending ?? true };
    } catch (error) {
      setAuthError(error.message);
      setAuthLoading(false);
      return { success: false, message: error.message };
    }
  }

  async function toggleTopicAction(topicId, action) {
    if (!token) return;
    try {
      const result = await updateTopicAction(token, topicId, action);
      // Server returns { completedTopics } for the simplified 'completed' action
      if (result.completedTopics !== undefined) {
        dispatch({ type: 'HYDRATE_PROGRESS', payload: { ...state, completedTopics: result.completedTopics } });
      } else if (result.topicActions !== undefined) {
        dispatch({ type: 'SET_TOPIC_ACTIONS', payload: result.topicActions });
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  async function toggleQuestionAction(questionId, action) {
    if (!token) return;
    try {
      const result = await updateQuestionAction(token, questionId, action);
      dispatch({ type: 'SET_QUESTION_ACTIONS', payload: result.questionActions });
    } catch (error) {
      setAuthError(error.message);
    }
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken('');
    setUser(null);
    setAuthError('');
    setProgressHydrated(false);
    dispatch({ type: 'RESET_PROGRESS' });
  }

  const value = {
    tracks,
    state,
    dispatch,
    user,
    token,
    authLoading,
    authError,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    logout,
    toggleTopicAction,
    toggleQuestionAction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
