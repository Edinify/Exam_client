import { EXAM_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  examModalData: {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
  },
  examOpenModal: false,
  examModalLoading: false,
};

export const examModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL:
      return {
        ...state,
        examModalData: action.payload.data,
        examOpenModal: action.payload.openModal,
      };
    case EXAM_MODAL_ACTION_TYPE.EXAM_OPEN_MODAL:
      return {
        ...state,
        examOpenModal: action.payload,
      };
      case EXAM_MODAL_ACTION_TYPE.EXAM_MODAL_LOADING:
        return{
          ...state,
          examModalLoading:action.payload
        }
    default:
      return state;
  }
};
