import { SALARY_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  salaryModalData: {},
  salaryOpenModal: false,
  salaryModalLoading: false,
  openConfirmModal: false,
};

export const salaryModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALARY_MODAL_ACTION_TYPE.GET_SALARY_MODAL:
      return {
        ...state,
        salaryModalData: action.payload.data,
        salaryOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.confirmModal,
      };
    case SALARY_MODAL_ACTION_TYPE.SALARY_OPEN_MODAL:
      return {
        ...state,
        salaryOpenModal: action.payload,
      };
    case SALARY_MODAL_ACTION_TYPE.SALARY_MODAL_LOADING:
      return {
        ...state,
        salaryModalLoading: action.payload,
      };
    case SALARY_MODAL_ACTION_TYPE.UPDATE_SALARY_PAYMENTS:
      return {
        ...state,
        salaryModalData: action.payload.data,
        salaryOpenModal: action.payload.openModal,
        openConfirmModal: action.payload.openConfirmModal,
      };
    case SALARY_MODAL_ACTION_TYPE.CLOSE_CONFIRM_MODAL:
      return {
        ...state,
        salaryModalData: {},
        salaryOpenModal: false,
        openConfirmModal: false,
        salaryModalLoading: false,
      };
    default:
      return state;
  }
};
