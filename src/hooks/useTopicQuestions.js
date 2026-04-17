import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { API_BASE } from '../lib/api.js';

// Simple in-memory cache so we don't re-fetch on every render
const cache = new Map();

export function useTopicQuestions(trackId, topicId) {
  const { tracks, state } = useAppContext();
  const [questions, setQuestions] = useState([]);
  const [rawQuestions, setRawQuestions] = useState([]);
  const [topic, setTopic] = useState(null);
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch questions from the API (cached per topicId)
  const fetchQuestions = useCallback(async (id) => {
    if (cache.has(id)) {
      setRawQuestions(cache.get(id));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/questions/${id}`);
      if (!res.ok) throw new Error(`Failed to load questions for ${id}`);
      const data = await res.json();
      // Normalise _id → id for frontend consistency
      const normalised = (data.questions ?? []).map((q) => ({
        ...q,
        id: q.questionId ?? q._id,
      }));
      cache.set(id, normalised);
      setRawQuestions(normalised);
    } catch (err) {
      console.error('[useTopicQuestions] API error, falling back to static data:', err.message);
      setError(err.message);
      // Fallback: use questions embedded in the track definition (static import)
      const currentTrack = tracks.find((t) => t.id === trackId);
      const currentTopic = currentTrack?.topics.find((t) => t.id === id);
      setRawQuestions(currentTopic?.questions ?? []);
    } finally {
      setLoading(false);
    }
  }, [tracks, trackId]);

  // Resolve track/topic metadata
  useEffect(() => {
    const currentTrack = tracks.find((t) => t.id === trackId) ?? null;
    const currentTopic = currentTrack?.topics.find((t) => t.id === topicId) ?? null;
    setTrack(currentTrack);
    setTopic(currentTopic);

    if (currentTopic) {
      fetchQuestions(topicId);
    } else {
      setRawQuestions([]);
    }
  }, [tracks, trackId, topicId, fetchQuestions]);

  // Apply experience-level and search filters client-side
  useEffect(() => {
    let filtered = rawQuestions;

    if (state.experienceFilter && state.experienceFilter !== 'all') {
      filtered = filtered.filter((q) => q.experienceLevel === state.experienceFilter);
    }

    const normalizedSearch = state.searchTerm?.trim().toLowerCase() ?? '';
    if (normalizedSearch) {
      filtered = filtered.filter((q) => {
        const searchable = `${q.question} ${q.answer} ${q.code ?? ''}`.toLowerCase();
        return searchable.includes(normalizedSearch);
      });
    }

    setQuestions(filtered);
  }, [rawQuestions, state.searchTerm, state.experienceFilter]);

  return { track, topic, questions, rawQuestions, loading, error };
}
