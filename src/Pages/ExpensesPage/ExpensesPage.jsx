import React, { useEffect } from "react";
import ExpensesData from "./components/ExpensesData/ExpensesData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import {
  EXPENSES_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
} from "../../redux/actions-type";
import { useDispatch, useSelector } from "react-redux";
import { getExpensesPaginationAction } from "../../redux/actions/expensesAction";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.datepicker);
  const { expenseCategory, expenseSorting } = useSelector(
    (state) => state.expensesFilter
  );

  const openModal = () => {
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.GET_EXPENSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const filterExpenses = () => {
    dispatch({ type: EXPENSES_ACTION_TYPE.RESET_EXPENSES });
    dispatch(
      getExpensesPaginationAction(
        0,
        startDate,
        endDate,
        expenseCategory ? expenseCategory?.key : "all",
        expenseSorting ? expenseSorting?.key : "oldest"
      )
    );
  };

  useEffect(() => {
    dispatch(getExpensesPaginationAction(0, "", "", "all", "oldest"));

    return () => {
      dispatch({
        type: EXPENSES_ACTION_TYPE.RESET_EXPENSES,
      });
    };
  }, []);
  return (
    <div className="details-page ">
      <GlobalHead
        openModal={openModal}
        profile="expenses"
        statusType={"expenses"}
        filter={filterExpenses}
      />

      <ExpensesData />
    </div>
  );
};

export default ExpensesPage;
