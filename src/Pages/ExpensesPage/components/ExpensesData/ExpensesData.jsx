import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpensesCard from "./ExpensesCard";
import { getExpensesPaginationAction } from "../../../../redux/actions/expensesAction";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const ExpensesData = () => {
  const dispatch = useDispatch();
  const [scrollHeight, setScrollHeight] = useState(1);

  const {
    financeMonthsFilter,
    financeChooseDate,
    financeExpenseCategory,
    financeExpenseSorting,
  } = useSelector((state) => state.financeDateFilter);
  const {
    expensesData,
    totalPages,
    loading,
    lastPage: expensesPageNum,
    hasMore,
  } = useSelector((state) => state.expensesData);
  const dataHead = [
    { id: 1, label: "Kateqoriya" },
    { id: 2, label: "Təyinat" },
    { id: 3, label: "Məbləğ" },
    { id: 4, label: "Tarix" },
    { id: 6, label: "" },
  ];

  const getNextExpenses = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getExpensesPaginationAction(
          expensesData?.length || 0,
          "",
          "",
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory.key
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting.key : "oldest"
        )
      );
    } else {
      dispatch(
        getExpensesPaginationAction(
          expensesData?.length || 0,
          "",
          "",
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory.key
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting.key : "oldest"
        )
      );
    }
  };
  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    const detailsHeader = document.querySelector(".details-header");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight - mainHeader.offsetHeight - detailsHeader.offsetHeight
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <>
        <InfiniteScroll
          dataLength={expensesData.length}
          next={getNextExpenses}
          hasMore={hasMore}
          loader={<SmallLoading />}
          endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          height={scrollHeight}
          scrollThreshold={0.7}
          className="infinity-scroll"
        >
          <table className="details-table expenses-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {expensesData?.map((expense, i) => (
                <ExpensesCard
                  key={i}
                  data={expense}
                  mode="desktop"
                  cellNumber={i + 1}
                />
              ))}
            </tbody>
          </table>
        </InfiniteScroll>

        <div className="details-list-tablet incomes-page ">
          <InfiniteScroll
            dataLength={expensesData.length}
            next={getNextExpenses}
            hasMore={hasMore}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={400}
            scrollThreshold={1}
          >
            {expensesData?.map((expense, i) => (
              <ExpensesCard
                key={i}
                data={expense}
                mode="tablet"
                cellNumber={i + 1 + (expensesPageNum - 1) * 10}
              />
            ))}
          </InfiniteScroll>
        </div>
      </>
    </>
  );
};

export default ExpensesData;
