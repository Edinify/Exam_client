import { EXAM_PAGE_ACTION_TYPE } from "../actions-type";

const initialState = {
  exams: [],
  loading: false,
  hasMore: true,
  totalLength: 0,
  examResult: {},
  studentExamResults: {},
};

export const examsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_PAGE_ACTION_TYPE.GET_EXAMS:
      return {
        ...state,
        exams: [...state.exams, ...action.payload.exams],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.exams.length < 20),
      };
    case EXAM_PAGE_ACTION_TYPE.RESET_EXAM:
      return {
        ...state,
        exams: [],
        totalLength: 0,
        hasMore: true,
      };
    case EXAM_PAGE_ACTION_TYPE.CREATE_EXAM:
      return {
        ...state,
        exams: [action.payload, ...state.exams],
        totalLength: state.totalLength + 1,
      };
    case EXAM_PAGE_ACTION_TYPE.DELETE_EXAM:
      return {
        ...state,
        exams: state.exams.filter((exam) => exam._id !== action.payload),
        totalLength: state.totalLength - 1,
      };
    case EXAM_PAGE_ACTION_TYPE.UPDATE_EXAM:
      return {
        ...state,
        exams: state.exams.map((exam) =>
          exam._id === action.payload._id ? action.payload : exam
        ),
      };
    case EXAM_PAGE_ACTION_TYPE.EXAM_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case EXAM_PAGE_ACTION_TYPE.GET_RESULTS:
      return {
        ...state,
        examResult: action.payload,
      };
    case EXAM_PAGE_ACTION_TYPE.GET_STUDENT_RESULTS:
      return {
        ...state,
        studentExamResults: action.payload,
      };

    default:
      return state;
  }
};
