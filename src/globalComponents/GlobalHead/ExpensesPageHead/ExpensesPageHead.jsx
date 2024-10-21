import React from "react";
import "./expenses-head.css";
import { DatePick } from "../../DatePicker/DatePicker";
import { ReactComponent as PlusIcon } from "../../../assets/icons/Plus.svg";
import ExpensesDropdown from "../../../Pages/ExpensesPage/components/ExpensesDropdown/ExpensesDropdown";

const ExpensesPageHead = ({openModal,filter,showAddBtn}) => {
  return (
    <div className="lesson-page-header-container">
     
        <div className="lesson-page-add-btn" style={{justifyContent:"flex-end",display:"flex"}} >
        {showAddBtn && (
          <div className="lesson-page-add-btn">
            <button className="add-detail" onClick={openModal}>
              <PlusIcon />
              Əlavə et
            </button>
          </div>
        )}
      </div>
      <div className="lesson-table-page-header-container">
        <div className="lesson-page-filter-container">
          <div className="lesson-table-header-content">
            <div className="expenses-page-head">
              <ExpensesDropdown type="category" />
              {/* <ExpensesDropdown type="sorting" /> */}
            </div>
            <div className="lesson-table-datepick">
              <DatePick deviceType="desktop" />
            </div>
          </div>
          <div className="lesson-page-apply-btn">
            <div className="lesson-table-btn-container lesson-page ">
              <button
                className="add-detail"
                onClick={() => filter()}
              >
                Tətbiq et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPageHead;
