import { RESULTS_ACTION_TYPE } from "../actions-type";

const initialState = {
  results: [],
  currentExam: {},
};

export const examResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESULTS_ACTION_TYPE.GET_RESULTS:
      return {
        ...state,
        results: action.payload.results,
        currentExam:action.payload.currentExam  || {}
      };
    case RESULTS_ACTION_TYPE.GET_STUDENT_RESULTS:
      return {
        ...state,
        results: action.payload,
      };
    case RESULTS_ACTION_TYPE.CURRENT_EXAM:
      return {
        ...state,
        currentExam: action.payload,
      };
    default:
      return state;
  }
};
