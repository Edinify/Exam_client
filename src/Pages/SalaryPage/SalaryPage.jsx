import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_VALUES_ACTION_TYPES } from "../../redux/actions-type";
import { clearLessonsFilter } from "../../redux/actions/clearLessonsFilterAction";
import { getSalaryPaginationAction } from "../../redux/actions/salaryActions";
import SalaryData from "./components/SalaryData/SalaryData";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { SALARY_ACTION_TYPE } from "../../redux/actions-type/index";

const SalaryPage = () => {
  const dispatch = useDispatch();
  const { changeMainPageType } = useCustomHook();
  const { startDate } = useSelector((state) => state.datepicker);
  const { endDate } = useSelector((state) => state.datepicker);
  const { salariesSearchValues } = useSelector((state) => state.searchValues);
  const [filter, setFilter] = useState(false);
  const { salariesData, totalLength, loading } = useSelector(
    (state) => state.salaryPagination
  );

  const getNextSalary = () => {
    if (loading) return;
    if (salariesSearchValues) {
      dispatch(
        getSalaryPaginationAction(
          salariesData?.length || 0,
          "",
          startDate ? startDate : "",
          endDate ? endDate : "",
          "",
          salariesSearchValues
        )
      );
    } else {
      dispatch(
        getSalaryPaginationAction(
          salariesData?.length || 0,
          "",
          startDate ? startDate : "",
          endDate ? endDate : "",
          "",
          ""
        )
      );
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    dispatch(clearLessonsFilter());
    dispatch({ type: SALARY_ACTION_TYPE.RESET_SALARY_PAGINATION });
    dispatch(getSalaryPaginationAction(0, "", "", "", 1, salariesSearchValues));
  };

  const clearAll = () => {
    dispatch(clearLessonsFilter());
    dispatch(getSalaryPaginationAction(0, "", "", "", 1, ""));
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.SALARIES_SEARCH_VALUE,
      payload: "",
    });
  };
  const applySalaryFilter = () => {
    if (salariesSearchValues) {
      dispatch(
        getSalaryPaginationAction(
          0,
          "",
          startDate,
          endDate,
          1,
          salariesSearchValues
        )
      );
    } else {
      dispatch(getSalaryPaginationAction("", startDate, endDate, 1, ""));
    }

    setFilter(false);
  };

  useEffect(() => {
    changeMainPageType("teacher");
    dispatch(clearLessonsFilter());
    dispatch(getSalaryPaginationAction(0, "", "", "", 1, ""));
  }, [dispatch]);

  useEffect(() => {
    if (filter) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [filter]);

  const salaryFilter = () => {
    dispatch({ type: SALARY_ACTION_TYPE.RESET_SALARY_PAGINATION });
    dispatch(
      getSalaryPaginationAction(
        0,
        "",
        startDate,
        endDate,
        1,
        salariesSearchValues
      )
    );
  };

  useEffect(() => {
    if (salariesSearchValues) {
      dispatch(
        getSalaryPaginationAction(
          0,
          "",
          startDate ? startDate : "",
          endDate ? endDate : "",
          "",
          salariesSearchValues
        )
      );
    }
    return () => {
      dispatch({ type: SALARY_ACTION_TYPE.RESET_SALARY_PAGINATION });
    };
  }, []);

  return (
    <>
      <div className="details-page salary-page">
        <GlobalHead
          searchData={searchData}
          filter={salaryFilter}
          DATA_SEARCH_VALUE={"SALARIES_SEARCH_VALUE"}
          dataSearchValues={salariesSearchValues}
          statusType="salary"
          profile={"salary"}
          clearAll={clearAll}
          applyFilter={applySalaryFilter}
          count={totalLength}
        />

        <SalaryData getNextSalary={getNextSalary} />
      </div>
    </>
  );
};

export default SalaryPage;
