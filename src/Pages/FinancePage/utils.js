import { useDispatch, useSelector } from "react-redux";
import { deleteIncomesAction, getIncomePaginationAction } from "../../redux/actions/incomeActions";
import { deleteExpensesAction, getExpensesPaginationAction } from "../../redux/actions/expensesAction";
import {
  getFinanceChartAction,
  getFinanceDataAction,
} from "../../redux/actions/financeAction";
import moment from "moment";
import {
  EXPENSES_MODAL_ACTION_TYPE,
  FINANCE_FILTER_ACTION_TYPE,
  INCOMES_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";

export const useFinanceCustomHook = () => {
  const dispatch = useDispatch();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeIncomeCategory,
    financeIncomeSorting,
    // expenseCategory,
    // expenseSorting,
  } = useSelector((state) => state.financeDateFilter);
  const { expenseCategory, expenseSorting } = useSelector(
    (state) => state.expensesFilter
  );
  const { expensesData, lastPage: expensesPageNum } = useSelector(
    (state) => state.expensesData
  );
  const {
    incomes,
    lastPage: incomesPageNum,
  } = useSelector((state) => state.incomes);
  const getAllDefaultData = () => {
    dispatch(getFinanceChartAction("", "", 3));
    dispatch(getFinanceDataAction("", "", 1));
    dispatch(getIncomePaginationAction(1, "", "", 1, "", "oldest"));
    dispatch(getExpensesPaginationAction(1, "", "", "", "oldest"));
  };
  const getAllDataByMonth = (monthCount) => {
    if (monthCount === 1) {
      dispatch(getFinanceChartAction("", "", 3));
    } else {
      dispatch(getFinanceChartAction("", "", monthCount));
    }

    dispatch(getFinanceDataAction("", "", monthCount));

    dispatch(
      getIncomePaginationAction(
        1,
        "",
        "",
        monthCount ? monthCount : 1, //month
        financeIncomeCategory
          ? financeIncomeCategory !== "all"
            ? financeIncomeCategory.key
            : ""
          : "",
        financeIncomeSorting ? financeIncomeSorting.key : "oldest"
      )
    );

    dispatch(
      getExpensesPaginationAction(
        1,
        "",
        "",
        // monthCount ? monthCount : 1, //month
        expenseCategory
          ? expenseCategory !== "all"
            ? expenseCategory.key
            : ""
          : "",
        expenseSorting ? expenseSorting.key : "oldest"
      )
    );
  };
  const getAllDataByDateRange = (startDate, endDate) => {
    const start = moment(startDate).format("YYYY-MM");
    const end = moment(endDate).format("YYYY-MM");

    dispatch(getFinanceChartAction(start, end, ""));
    dispatch(getFinanceDataAction(start, end, ""));

    dispatch(
      getIncomePaginationAction(
        1,
        startDate,
        endDate,
        "", //month
        financeIncomeCategory
          ? financeIncomeCategory !== "all"
            ? financeIncomeCategory.key
            : ""
          : "",
        financeIncomeSorting ? financeIncomeSorting.key : "oldest"
      )
    );

    dispatch(
      getExpensesPaginationAction(
        1,
        startDate,
        endDate,
        // "", //month
        expenseCategory
          ? expenseCategory !== "all"
            ? expenseCategory.key
            : ""
          : "",
        expenseSorting ? expenseSorting.key : "oldest"
      )
    );
  };
  const getFilteredIncomes = (sorting, category) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getIncomePaginationAction(
          1,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          category ? (category !== "all" ? category : "") : "",
          sorting ? sorting : "oldest"
        )
      );
    } else {
      dispatch(
        getIncomePaginationAction(
          1,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          category ? (category !== "all" ? category : "") : "",
          sorting ? sorting : "oldest"
        )
      );
    }
  };
  const getFilteredExpenses = (sorting, category) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getExpensesPaginationAction(
          1,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          // "", //month
          category ? (category !== "all" ? category : "") : "",
          sorting ? sorting : "oldest"
        )
      );
    } else {
      dispatch(
        getExpensesPaginationAction(
          1,
          "",
          "",
          // financeMonthsFilter ? financeMonthsFilter : 1, //month
          category ? (category !== "all" ? category : "") : "",
          sorting ? sorting : "oldest"
        )
      );
    }
  };

  const getFinanceDataAfterUpdate = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_ACTIVATE_GET,
      payload: false,
    });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_ACTIVATE_GET,
      payload: false,
    });
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      const start = moment(financeChooseDate.startDate).format("YYYY-MM");
      const end = moment(financeChooseDate.endDate).format("YYYY-MM");
      dispatch(getFinanceChartAction(start, end, ""));
      dispatch(getFinanceDataAction(start, end, ""));
    } else {
      if (financeMonthsFilter === 1) {
        dispatch(getFinanceChartAction("", "", 3));
      } else {
        dispatch(
          getFinanceChartAction(
            "",
            "",
            financeMonthsFilter ? financeMonthsFilter : 3
          )
        );
      }
      dispatch(
        getFinanceDataAction(
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1
        )
      );
    }
  };
  const getFinanceDataAfterCreate = (dataType) => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_ACTIVATE_GET,
      payload: false,
    });
    dispatch({
      type: INCOMES_MODAL_ACTION_TYPE.INCOMES_MODAL_ACTIVATE_GET,
      payload: false,
    });
    if (dataType === "expenses") {
      dispatch(getIncomePaginationAction(1, "", "", 1, "", "oldest"));
    } else if (dataType === "incomes") {
      dispatch(getExpensesPaginationAction(1, "", "",  "", "oldest"));
    }

    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.ClEAR_CATEGORY_SORT,
    });
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_MONTHS_FILTER,
      payload: { financeMonthsFilter: 1 },
    });
    dispatch({
      type: FINANCE_FILTER_ACTION_TYPE.GET_DATE_SELECTED_OPTION,
      payload: {
        key: 1,
        name: "Cari ay",
      },
    });
    dispatch(getFinanceChartAction("", "", 3));
    dispatch(getFinanceDataAction("", "", 1));
  };

  const deleteExpense = (_id) => {
    const pageNum = expensesPageNum > 1 ? (expensesData.length > 1 ? expensesPageNum : expensesPageNum - 1) : 1;

    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        deleteExpensesAction(
          _id,
          pageNum,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          expenseCategory
            ? expenseCategory !== "all"
              ? expenseCategory.key
              : ""
            : "",
          expenseSorting ? expenseSorting.key : "oldest"
        )
      );
    } else {
      dispatch(
        deleteExpensesAction(
          _id,
          pageNum,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          expenseCategory
            ? expenseCategory !== "all"
              ? expenseCategory.key
              : ""
            : "",
          expenseSorting ? expenseSorting.key : "oldest"
        )
      );
    }
  };

  const deleteIncome = (_id) => {
    const pageNum = incomesPageNum > 1 ? (incomes.length > 1 ? incomesPageNum : incomesPageNum - 1) : 1;

    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        deleteIncomesAction(
          _id,
          pageNum,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory.key
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting.key : "oldest"
        )
      );
    } else {
      dispatch(
        deleteIncomesAction(
          _id,
          pageNum,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory.key
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting.key : "oldest"
        )
      );
    }
  };

  return {
    getAllDefaultData,
    getAllDataByMonth,
    getAllDataByDateRange,
    getFilteredIncomes,
    getFilteredExpenses,
    getFinanceDataAfterCreate,
    getFinanceDataAfterUpdate,
    deleteExpense,
    deleteIncome
  };
};
