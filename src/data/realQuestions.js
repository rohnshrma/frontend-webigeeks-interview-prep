/**
 * WebiGeeks Interview Prep — Master Question Bank
 * ---------------------------------------------------
 * 10-15 questions per experience level (fresher/junior/mid) per topic.
 * Sources: GeeksForGeeks, Toptal, MDN, auth0, jwt.io, MongoDB docs, Pandas docs.
 *
 * Structure per question:
 *  id             — unique string (topic-level-number)
 *  experienceLevel — 'fresher' | 'junior' | 'mid'
 *  type           — 'conceptual' | 'practical' | 'output' (MCQ)
 *  question       — question text
 *  answer         — detailed answer text
 *  code?          — optional code snippet
 *  explanation?   — extra context (output questions)
 *  choices?       — MCQ options for output questions: [ { label, correct } ]
 *  output?        — expected output text (output questions)
 */

import compiledQA from './compiledQuestions.json';

/** Map topic ID → array of questions */
export const TOPIC_QUESTIONS = compiledQA;

/** Get questions for a topic, optionally filtered by experience level */
export function getQuestionsForTopic(topicId, experienceFilter = 'all') {
  const questions = TOPIC_QUESTIONS[topicId] ?? [];
  if (experienceFilter === 'all') return questions;
  return questions.filter(q => q.experienceLevel === experienceFilter);
}

/** Count questions by experience level for a topic */
export function getQuestionCounts(topicId) {
  const questions = TOPIC_QUESTIONS[topicId] ?? [];
  return {
    all:     questions.length,
    fresher: questions.filter(q => q.experienceLevel === 'fresher').length,
    junior:  questions.filter(q => q.experienceLevel === 'junior').length,
    mid:     questions.filter(q => q.experienceLevel === 'mid').length,
  };
}

// All questions flat (legacy compatibility)
export const ALL_QUESTIONS = Object.values(TOPIC_QUESTIONS).flat();
