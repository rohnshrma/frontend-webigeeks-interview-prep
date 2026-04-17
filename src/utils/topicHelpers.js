export function getTopicProgress(state, track) {
  const total = track.topics.length;
  const completed = track.topics.filter((topic) => state.completedTopics.includes(topic.id)).length;

  return {
    total,
    completed,
    percentage: total ? Math.round((completed / total) * 100) : 0,
  };
}

export function flattenQuestions(tracks) {
  return tracks.flatMap((track) =>
    track.topics.flatMap((topic) =>
      topic.questions.map((question) => ({
        ...question,
        trackId: track.id,
        trackTitle: track.title,
        topicId: topic.id,
        topicTitle: topic.title,
      }))
    )
  );
}
