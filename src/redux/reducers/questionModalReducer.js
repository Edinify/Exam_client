import { EXAM_QUESTION_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  questionModalData: {},
  questionOpenModal: false,
  questionModalLoading:false
};

export const questionModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_QUESTION_MODAL_ACTION_TYPE.GET_QUESTION_MODAL:
      return {
        ...state,
        questionModalData: action.payload.data,
        questionOpenModal: action.payload.openModal,
      };
    case EXAM_QUESTION_MODAL_ACTION_TYPE.QUESTION_OPEN_MODAL:
      return {
        ...state,
        questionOpenModal: action.payload,
      };
      case EXAM_QUESTION_MODAL_ACTION_TYPE.QUESTION_MODAL_LOADING:
        return{
          ...state,
          questionModalLoading:action.payload
        }
    default:
      return state;
  }
};
