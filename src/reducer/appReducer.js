export const initialState = {
  savedQuestions: [],
  importantQuestions: [],
  completedTopics: [],
  topicActions: {},
  questionActions: {}, // { [questionId]: { correct, doubtful, starred } }
  theme: 'light',
  searchTerm: '',
  experienceFilter: 'all', // 'all' | 'fresher' | 'junior' | 'mid'
};

function toggleInList(list, value) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_SAVE_QUESTION':
      return { ...state, savedQuestions: toggleInList(state.savedQuestions, action.payload) };
    case 'TOGGLE_IMPORTANT_QUESTION':
      return { ...state, importantQuestions: toggleInList(state.importantQuestions, action.payload) };
    case 'TOGGLE_COMPLETE_TOPIC':
      return { ...state, completedTopics: toggleInList(state.completedTopics, action.payload) };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_EXPERIENCE_FILTER':
      return { ...state, experienceFilter: action.payload };

    // Optimistic update from server patch response
    case 'SET_TOPIC_ACTIONS':
      return { ...state, topicActions: action.payload };
    case 'SET_QUESTION_ACTIONS':
      return { ...state, questionActions: action.payload };

    case 'HYDRATE_PROGRESS':
      return {
        ...state,
        savedQuestions: action.payload.savedQuestions ?? [],
        importantQuestions: action.payload.importantQuestions ?? [],
        completedTopics: action.payload.completedTopics ?? [],
        topicActions: action.payload.topicActions ?? {},
        questionActions: action.payload.questionActions ?? {},
      };
    case 'RESET_PROGRESS':
      return {
        ...state,
        savedQuestions: [],
        importantQuestions: [],
        completedTopics: [],
        topicActions: {},
        questionActions: {},
      };
    default:
      return state;
  }
}
