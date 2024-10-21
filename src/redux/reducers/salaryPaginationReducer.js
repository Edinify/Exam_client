import { SALARY_ACTION_TYPE } from "../actions-type";

const initialState = {
  salariesData: [],
  teacherSalaryData: [],
  totalPage: 1,
  loading: false,
  totalLength: 0,
  hasMore: true,
};

export const salaryPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALARY_ACTION_TYPE.GET_SALARY_PAGINATION:
      return {
        ...state,
        salariesData: [...state.salariesData, ...action.payload.salariesData],
        totalLength: action.payload.totalLength,
        hasMore: !(action.payload.salariesData.length < 20),
      };
    case SALARY_ACTION_TYPE.SALARY_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SALARY_ACTION_TYPE.GET_TEACHER_SALARY_PAGINATION:
      return {
        ...state,
        teacherSalaryData: action.payload.salary,
      };
    case SALARY_ACTION_TYPE.RESET_SALARY_PAGINATION:
      return {
        ...state,
        salariesData: [],
        hasMore: true,
      };
    case SALARY_ACTION_TYPE.ADD_SALARY:
      return {
        ...state,
        salariesData: state.salariesData.map((item) =>
          item.teacher._id.toString() === action.payload.teacher._id.toString()
            ? action.payload
            : item
        ),
      };

    default:
      return state;
  }
};
