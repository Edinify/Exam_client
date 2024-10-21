import React, { useEffect, useState } from "react";
import "./globalHead.css";
import { ReactComponent as PlusIcon } from "../../assets/icons/Plus.svg";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Search from "./Search/Search";
import { CoursesDropdown } from "./CoursesDropdown/CoursesDropdown";
import LessonTableHead from "./LessonTableHead/LessonTableHead";
import TeacherPageHead from "./TeacherPageHead/TeacherPageHead";
import StudentPageHead from "./StudentPageHead/StudentPageHead";
import CareerPageHead from "./CareerPageHead/CareerPageHead";
import GroupsPageHead from "./GroupsPageHead/GroupsPageHead";
import TuitionPageHead from "./TuitionPageHead/TuitionPageHead";
import ExcelExportBtn from "../ExcelExportBtn/ExcelExportBtn";
import DiplomaTableHead from "./DiplomaTableHead/DiplomaTableHead";
import ConsultationPageHead from "./ConsultationPageHead/ConsultationPageHead";
import SalaryPageHead from "./SalaryPageHead/SalaryPageHead";
import ExpensesPageHead from "./ExpensesPageHead/ExpensesPageHead";

const GlobalHead = ({
  searchData,
  openModal,
  DATA_SEARCH_VALUE,
  dataSearchValues,
  statusType,
  filter,
  search = true,
  addBtn = true,
  profile,
  count,
  clearAll,
  applyFilter,
}) => {
  const { user } = useSelector((state) => state.user);
  const [showAddBtn, setShowAddBtn] = useState(false);
  const location = useLocation();
  const { openSidebar } = useSelector((state) => state.openSidebar);

  useEffect(() => {
    if (user.role === "super-admin") {
      setShowAddBtn(true);
    } else if (user.role === "worker") {
      const checkPower =
        user?.profiles?.find((item) => item.profile === profile)?.power ===
        "all";
      setShowAddBtn(checkPower);
    }
  }, []);

  return (
    <div className={`details-header ${openSidebar ? "open" : ""} `}>
      <div className="container">
        <div className="details-header-container">
          <div
            className={`details-header-content ${
              location.pathname === "/"
                ? "lesson-page"
                : location.pathname === "/teachers" ||
                  location.pathname === "/teachers/mentors"
                ? "teacher"
                : ""
            }`}
          >
            <div className="details-header-content-left">
              {location.pathname === "/teachers" ||
              location.pathname === "/teachers/mentors" ||
              location.pathname === "/tuition-fee" ||
              location.pathname === "/tuitionFee" ||
              location.pathname === "/students" ||
              location.pathname === "/salary" ||
              statusType === "groups" ||
              location.pathname === "/consultation" ||
              location.pathname === "/expenses"
                ? null
                : search && (
                    <>
                      <Search
                        searchData={searchData}
                        dataSearchValues={dataSearchValues}
                        className="search-input-con desktop"
                        DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                      />
                      {statusType === "course" && (
                        <ExcelExportBtn pageName={"course"} />
                      )}
                      {statusType === "rooms" && (
                        <ExcelExportBtn pageName={"room"} />
                      )}
                    </>
                  )}

              {statusType === "teacher" && (
                <TeacherPageHead
                  searchData={searchData}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                  dataSearchValues={dataSearchValues}
                  filter={filter}
                  openModal={openModal}
                  search={search}
                  count={count}
                />
              )}

              {statusType === "expenses" && (
                <ExpensesPageHead
                  openModal={openModal}
                  showAddBtn={showAddBtn}
                  filter={filter}
                />
              )}

              {statusType === "syllabus" && (
                <div className="syllabus-all-filter-container">
                  <CoursesDropdown deviceType="desktop" />
                  <ExcelExportBtn pageName={"syllabus"} />
                </div>
              )}
              {statusType === "student" && (
                <StudentPageHead
                  searchData={searchData}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                  dataSearchValues={dataSearchValues}
                  filter={filter}
                  openModal={openModal}
                  search={search}
                  count={count}
                />
              )}
              {statusType === "consultation" && (
                <ConsultationPageHead
                  searchData={searchData}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                  dataSearchValues={dataSearchValues}
                  filter={filter}
                  openModal={openModal}
                  search={search}
                  count={count}
                />
              )}
              {statusType === "career" && <CareerPageHead filter={filter} />}
              {statusType === "groups" && (
                <GroupsPageHead
                  filter={filter}
                  count={count}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                  dataSearchValues={dataSearchValues}
                  openModal={openModal}
                  search={search}
                  searchData={searchData}
                />
              )}

              {statusType === "tutionFee" && (
                <TuitionPageHead
                  search={search}
                  filter={filter}
                  searchData={searchData}
                  dataSearchValues={dataSearchValues}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                />
              )}
              {statusType === "lesson-table" && (
                <LessonTableHead
                  showAddBtn={showAddBtn}
                  openModal={openModal}
                  filter={filter}
                />
              )}
              {statusType === "salary" && (
                <SalaryPageHead
                  clearAll={clearAll}
                  filter={filter}
                  applyFilter={applyFilter}
                  search={search}
                  searchData={searchData}
                  DATA_SEARCH_VALUE={DATA_SEARCH_VALUE}
                  dataSearchValues={dataSearchValues}
                />
              )}
              {statusType === "diploma" && <DiplomaTableHead filter={filter} />}
            </div>
            {addBtn && showAddBtn && (
              <div className="lesson-table-add-btn">
                {statusType === "lesson-table" && null}
                {statusType === "teacher" && null}
                {/* {statusType === "student" && null} */}
                {statusType === "consultation" && null}
                {statusType !== "lesson-table" &&
                  statusType !== "teacher" &&
                  statusType !== "consultation" &&
                  statusType !== "groups" &&
                  statusType !== "expenses" &&
                  statusType !== "salary" &&
                  statusType !== "student" && (
                    <button className="add-detail" onClick={openModal}>
                      <PlusIcon />
                      Əlavə et
                    </button>
                  )}
              </div>
            )}
          </div>

          {/* {statusType === "syllabus" && <CoursesDropdown deviceType="mobile" />} */}
          {/* {statusType === "lesson-table" && (
            <GroupsDropdown deviceType="mobile" page="lesson-table" />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default GlobalHead;
