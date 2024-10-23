import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as ExamIcon } from "../../../../assets/icons/sidebar/exam-icon.svg";

const SidebarStudent = ({ closeSidebar }) => {
  const location = useLocation();
  return (
    <ul className="sidebar-nav-list">
      {/* <li>
        <Link
          onClick={closeSidebar}
          to="/student-panel"
          className={location.pathname === "/student-panel" ? "active" : ""}
        >
          <TableIcon />
          Cədvəl
        </Link>
      </li> */}
      <li>
        <Link to="/exams/futureExams" onClick={closeSidebar}>
          <ExamIcon />
          Imtahanlar
        </Link>
      </li>
    </ul>
  );
};

export default SidebarStudent;
