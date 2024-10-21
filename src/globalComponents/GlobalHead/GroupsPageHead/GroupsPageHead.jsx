import React from "react";
import { CoursesDropdown } from "../CoursesDropdown/CoursesDropdown";
import { TeachersDropdown } from "../TeachersDropdown/TeachersDropdown";
import { ReactComponent as HalfCircleICon } from "../../../assets/icons/filter/half-circle-svgrepo-com.svg";
import { ReactComponent as PlusIcon } from "../../../assets/icons/Plus.svg";
import Search from "../Search/Search";

const GroupsPageHead = ({
  filter,
  count,
  openModal,
  search,
  searchData,
  dataSearchValues,
  DATA_SEARCH_VALUE,
}) => {
  return (
    <div className="groups-filter-header">
      <div className="teahcer-page-add-btn">
        <button className="add-detail" onClick={openModal}>
          <PlusIcon />
          Əlavə et
        </button>
      </div>
      <div className="groups-header-filter">
        <div className="groups-all-filter">
          {search && (
            <Search
              searchData={searchData}
              dataSearchValues={dataSearchValues}
              className="search-input-con desktop"
              DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
            />
          )}
          <CoursesDropdown deviceType="desktop" />
          <TeachersDropdown deviceType="desktop" />
        </div>
        <div className="group-other-container">
        <div className="lesson-table-btn-container groups ">
          <button className="add-detail" onClick={() => filter()}>
            Tətbiq et
          </button>
        </div>
        <div className="circle-icon">
          <p className="filter-count">{count}</p>
          <HalfCircleICon />
        </div>
      </div>
      </div>
  
    </div>
  );
};

export default GroupsPageHead;
