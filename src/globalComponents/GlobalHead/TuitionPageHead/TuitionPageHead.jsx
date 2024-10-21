import React from "react";
import Search from "../Search/Search";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { GroupsDropdown } from "../GroupsDropdown/GroupsDropdown";
import { PaymentStatusDropdown } from "../PaymentStatusDropdown/PaymentStatusDropdown";
import ExcelExportBtn from "../../ExcelExportBtn/ExcelExportBtn";
import PaymentResult from "../PaymentResult/PaymentResult";

const TuitionPageHead = ({
  search,
  filter,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
}) => {
  return (
    <div className="tuition-fee-container">
      <div className="tuition-fee-payment-container">
        <PaymentResult />
      </div>
      <div className="tuition-fee-filter-header">
        <div className="tuition-fee-all-filter">
          {search && (
            <Search
              searchData={searchData}
              dataSearchValues={dataSearchValues}
              className="search-input-con desktop"
              DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
            />
          )}
          <CoursesDropdown deviceType="desktop" />
          <GroupsDropdown deviceType="desktop" />
          <PaymentStatusDropdown
            deviceType="desktop"
            statusType="tuition-fee"
          />
        </div>
        <div className="tuition-fee-other-container">
          <div className="lesson-table-btn-container tuition ">
            <button className="add-detail" onClick={() => filter()}>
              Tətbiq et
            </button>
          </div>
          <ExcelExportBtn pageName={"tuition-fee"} />
        </div>
      </div>
    </div>
  );
};

export default TuitionPageHead;
