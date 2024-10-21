import React from "react";
import { DatePick } from "../../DatePicker/DatePicker";
import Search from "../Search/Search";

const SalaryPageHead = ({
  clearAll,
  filter,
  search,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
}) => {
  return (
    <div className="salary-header-filter-container">
      <div className="salary-header-filter">
        <div className="salary-all-filter">
          {search && (
            <Search
              searchData={searchData}
              dataSearchValues={dataSearchValues}
              className="search-input-con desktop"
              DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
            />
          )}
          <DatePick />
        </div>
        <div className="salary-other-container">
            <button className="clear-btn" onClick={clearAll}>
              Hamısını sil
            </button>
            <button className="add-detail" onClick={() => filter()}>
              Tətbiq et
            </button>
        </div>
      </div>
    </div>
  );
};

export default SalaryPageHead;
