import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../../../assets/icons/dashboardIcon.svg";
import { ReactComponent as MainPanelIcon } from "../../../../assets/icons/mainPanelIcon.svg";
import { ReactComponent as CoursesIcon } from "../../../../assets/icons/coursesIcon.svg";
import { ReactComponent as TeachersIcon } from "../../../../assets/icons/teachersIcon.svg";
import { ReactComponent as StudentsIcon } from "../../../../assets/icons/studentsIcon.svg";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as ExpensesIcon } from "../../../../assets/icons/expensenIcon.svg";
import { ReactComponent as SalesIcon } from "../../../../assets/icons/sidebar/sales.svg";
import { ReactComponent as AdminIcon } from "../../../../assets/icons/sidebar/users-01.svg";
import { ReactComponent as GroupIcon } from "../../../../assets/icons/sidebar/group-svgrepo-com.svg";
import { ReactComponent as CareerIcon } from "../../../../assets/icons/sidebar/work-case-filled-svgrepo-com (1).svg";
import { ReactComponent as EventsIcon } from "../../../../assets/icons/sidebar/events.svg";
import { ReactComponent as SyllabusIcon } from "../../../../assets/icons/sidebar/syllabus-svgrepo-com.svg";
import { ReactComponent as DiplomaIcon } from "../../../../assets/icons/sidebar/diploma.svg";
import { ReactComponent as RoomIcon } from "../../../../assets/icons/room-icon.svg";
import { ReactComponent as ExamIcon } from "../../../../assets/icons/sidebar/exam-icon.svg";
import { ReactComponent as SalaryIcon } from "../../../../assets/icons/salaryIcon.svg";
import { ReactComponent as ExpenseIcon } from "../../../../assets/icons/sidebar/expense.svg";

const SidebarSuperAdmin = ({ closeSidebar }) => {
  const location = useLocation();
  const groupsNav = ["/groups/current", "/groups/waiting", "/groups/ended"];

  const financeNav = ["/finance/incomes", "/finance/expenses"];

  const isFinanceRoute = (route) => {
    return financeNav.includes(route);
  };

  return (
    <ul className="sidebar-nav-list">
      {/* <li>
        <NavLink to="/dashboard" onClick={closeSidebar}>
          <DashboardIcon />
          İdarəetmə paneli
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/lesson" onClick={closeSidebar} className="admin">
          <TableIcon />
          Cədvəl
        </NavLink>
      </li>  */}
      <li>
        <NavLink to="/exams/futureExams" onClick={closeSidebar}>
          <ExamIcon />
          Imtahanlar
        </NavLink>
      </li>
      <li>
        <NavLink to="/students" onClick={closeSidebar}>
          <StudentsIcon />
          Tələbələr
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/teachers" onClick={closeSidebar}>
          <TeachersIcon />
          Təlimçilər
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses" onClick={closeSidebar}>
          <CoursesIcon />
          Fənlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/syllabus" onClick={closeSidebar}>
          <SyllabusIcon />
          Sillabus
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          className={groupsNav.includes(location.pathname) ? "active" : ""}
          to="/groups/waiting"
          onClick={closeSidebar}
        >
          <GroupIcon />
          Qruplar
        </NavLink>
      </li>
      <li>
        <NavLink to="/room" onClick={closeSidebar}>
          <RoomIcon />
          Otaqlar
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/tuition-fee" onClick={closeSidebar}>
          <ExpensesIcon />
          Təhsil haqqı
        </NavLink>
      </li>
      <li>
        <NavLink to="/salary" onClick={closeSidebar}>
          <SalaryIcon />
          Əmək haqqı
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink
          to="/finance"
          onClick={closeSidebar}
        >
          <ExpensesIcon />
          Maliyyə
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/expenses"
          onClick={closeSidebar}
        >
          <ExpenseIcon />
          Xərclər
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/career" onClick={closeSidebar}>
          <CareerIcon />
          Karyera
        </NavLink>
      </li>
      <li>
        <NavLink to="/consultation" onClick={closeSidebar}>
          <MainPanelIcon />
          Konsultasiya
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/sales" onClick={closeSidebar}>
          <SalesIcon />
          Satış
        </NavLink>
      </li>

      <li>
        <NavLink to="/event" onClick={closeSidebar}>
          <EventsIcon />
          Tədbirlər
        </NavLink>
      </li>
      <li>
        <NavLink to="/workers" onClick={closeSidebar} className="admin">
          <AdminIcon />
          Əməkdaşlar
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink to="/diploma" onClick={closeSidebar}>
          <DiplomaIcon />
          Diplom cədvəli
        </NavLink>
      </li> */}
    </ul>
  );
};

export default SidebarSuperAdmin;
