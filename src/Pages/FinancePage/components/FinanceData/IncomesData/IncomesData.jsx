import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IncomesCard from "./IncomesCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";
import { getIncomePaginationAction } from "../../../../../redux/actions/incomeActions";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const IncomesData = () => {
  const dispatch = useDispatch();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeIncomeCategory,
    financeIncomeSorting,
  } = useSelector((state) => state.financeDateFilter);
  const {
    incomes,
    loading,
    lastPage: incomesPageNum,
    hasMore
  } = useSelector((state) => state.incomes);
  const dataHead = [
    { id: 1, label: "Kateqoriya" },
    { id: 2, label: "Təyinat" },
    { id: 3, label: "Məbləğ" },
    { id: 4, label: "Tarix" },
    { id: 6, label: "" },
  ];


  const getNextIncomes = () => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch(
        getIncomePaginationAction(
          incomes?.length || 0,
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
        getIncomePaginationAction(
          incomes?.length || 0,
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

  return (
    <>
     
        <>
        <InfiniteScroll 
           dataLength={incomes.length}
           next={getNextIncomes}
           hasMore={hasMore}
           loader={<SmallLoading />}
           endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
           height={400}
           scrollThreshold={1}
           className="infinity-scroll"
         >

      
          <table className="details-table incomes-table">
            <thead>
              <tr>
                {dataHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomes?.map((income, i) => (
                <IncomesCard
                  key={i}
                  data={income}
                  mode="desktop"
                  cellNumber={i + 1 + (incomesPageNum - 1) * 10}
                />
              ))}
            </tbody>
          </table>
          </InfiniteScroll>

          <div className="details-list-tablet incomes-page  ">
          <InfiniteScroll 
           dataLength={incomes.length}
           next={getNextIncomes}
           hasMore={hasMore}
           loader={<SmallLoading />}
           endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
          //  height={400}
           scrollThreshold={1}
         >
            {incomes?.map((income, i) => (
              <IncomesCard
                key={i}
                data={income}
                mode="tablet"
                cellNumber={i + 1 + (incomesPageNum - 1) * 10}
              />
            ))}
            </InfiniteScroll>
          </div>

          
        </>
    </>
  );
};

export default IncomesData;
