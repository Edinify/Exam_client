import { EXPENSES_FILTER_ACTION_TYPE } from "../actions-type";

const initialState = {
  expenseCategory: "",
  expenseSorting: "",
};

export const expensesFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSES_FILTER_ACTION_TYPE.GET_EXPENSES_CATEGORY:
      return {
        ...state,
        expenseCategory: action.payload.expenseCategory,
      };
    case EXPENSES_FILTER_ACTION_TYPE.GET_EXPENSES_SORTING:
      return {
        ...state,
        expenseSorting: action.payload.expenseSorting,
      };
    case EXPENSES_FILTER_ACTION_TYPE.CLEAR_CATEGORY:
      return {
        ...state,
        expenseSorting: "",
        expenseCategory: "",
      };
    default:
      return state;
  }
};
