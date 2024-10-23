import { EXAM_QUESTIONS_ACTION_TYPE } from "../actions-type";

const initialState = {
  questions: [],
  loading: false,
  currentExam:{}
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_QUESTIONS_ACTION_TYPE.GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
        currentExam:action.payload.currentExam
      };
    case EXAM_QUESTIONS_ACTION_TYPE.CREATE_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    case EXAM_QUESTIONS_ACTION_TYPE.UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question._id === action.payload._id ? action.payload : question
        ),
      };
    case EXAM_QUESTIONS_ACTION_TYPE.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== action.payload._id
        ),
      };
      case EXAM_QUESTIONS_ACTION_TYPE.QUESTION_LOADING:
        return{
          ...state,
          loading:action.payload
        }
    default:
      return state;
  }
};
