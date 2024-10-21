import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as ArrowIcon } from "../../../../assets/icons/finance/arrow-down.svg";
import {
  EXPENSES_FILTER_ACTION_TYPE,
  FINANCE_FILTER_ACTION_TYPE,
} from "../../../../redux/actions-type";
import { useFinanceCustomHook } from "../../../FinancePage/utils";

const ExpensesDropdown = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { getFilteredExpenses } = useFinanceCustomHook();
  // const {
  //   financeExpenseCategory,
  //   financeExpenseSorting,
  // } = useSelector((state) => state.financeDateFilter);
  const { expenseCategory, expenseSorting } = useSelector(
    (state) => state.expensesFilter
  );

  // console.log(expenseSorting,"expense categoryyy")

  const [openDropdown, setOpenDropdown] = useState(false);
  const sortingData = [
    { key: "lowestAmount", name: "Aşağı məbləğdən" },
    { key: "highestAmount", name: "Yuxarı məbləğdən" },
    { key: "latest", name: "Yenidən köhnəyə" },
    { key: "oldest", name: "Köhnədən yeniyə" },
  ];
  const categoryData = [
    { key: "all", name: "Bütün kateqoriyalar" },
    { key: "food", name: "Qida" },
    { key: "cleaningSupplies", name: "Təmizlik ləvazimatları " },
    { key: "repair", name: "Təmir" },
    { key: "lease", name: "İcarə" },
    { key: "equipment", name: "Avadanlıq" },
    { key: "other", name: "Digər" },
  ];
  const getSorting = (sortType) => {
    console.log(sortType, "sort typeeee");
    if (location.pathname === "/expenses") {
      dispatch({
        type: EXPENSES_FILTER_ACTION_TYPE.GET_EXPENSES_SORTING,
        payload: { expenseSorting: sortType },
      });

      // getFilteredExpenses(sortType?.key, expenseCategory?.key);
    }
    setOpenDropdown(false);
  };
  const getCategory = (categoryType) => {
    console.log(categoryType, "Category typeee");

    if (location.pathname === "/expenses") {
      dispatch({
        type: EXPENSES_FILTER_ACTION_TYPE.GET_EXPENSES_CATEGORY,
        payload: { expenseCategory: categoryType },
      });

      // getFilteredExpenses(expenseSorting?.key, categoryType?.key);
    }
    setOpenDropdown(false);
  };

  // useEffect(() => {
  //   dispatch({
  //     type: EXPENSES_FILTER_ACTION_TYPE.CLEAR_CATEGORY,
  //   });
  // }, []);
  return (
    <div
      className={`global-category-dropdown finance-dropdown ${
        openDropdown ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head"
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {/* {type === "category" && location.pathname === "/incomes" && (
          <h2>
            {financeIncomeCategory
              ? financeIncomeCategory.name
              : "Bütün kateqoriyalar"}
          </h2>
        )} */}
        {/* {type === "sorting" && location.pathname === "/incomes" && (
          <h2>
            {" "}
            {financeIncomeSorting
              ? financeIncomeSorting.name
              : "Köhnədən yeniyə"}
          </h2>
        )} */}

        {type === "category" && location.pathname === "/expenses" && (
          <h2>
            {expenseCategory ? expenseCategory.name : "Bütün kateqoriyalar"}
          </h2>
        )}
        {type === "sorting" && location.pathname === "/expenses" && (
          <h2>{expenseSorting ? expenseSorting.name : "Köhnədən yeniyə"}</h2>
        )}

        <div className="arrow-icon">
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        {type === "category" && (
          <ul>
            {categoryData.map((item, index) => (
              <li key={index} onClick={() => getCategory(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}

        {type === "sorting" && (
          <ul>
            {sortingData.map((item, index) => (
              <li key={index} onClick={() => getSorting(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpensesDropdown;
