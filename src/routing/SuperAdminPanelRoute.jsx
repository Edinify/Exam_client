import React from "react";
import { Route } from "react-router";
import TeachersPage from "../Pages/TeachersPage/TeachersPage";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import TuitionFeePage from "../Pages/TuitionFeePage/TuitionFee";
import ConsultationsPage from "../Pages/ConsultationsPage/ConsultationsPage";
import GroupsPage from "../Pages/GroupsPage/GroupsPage";
import WorkersPage from "../Pages/WorkersPage/WorkersPage";
import CareerPage from "../Pages/CareerPage/CareerPage";
import SyllabusPage from "../Pages/SyllabusPage/SyllabusPage";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";
import SalesPage from "../Pages/SalesPage/SalesPage"
import FinancePage from "../Pages/FinancePage/FinancePage"
import EventsPage from "../Pages/EventsPage/EventsPage";
import { Dashboard } from "../Pages/DashboardPage/DashboardPage";
import DiplomaPage from "../Pages/DiplomaPage/DiplomaPage";
import RoomsPage from "../Pages/RoomsPage/RoomsPage";
import ExamPage from "../Pages/ExamPage/ExamPage";
import QuestionPage from "../Pages/QuestionPage/QuestionPage";
import SalaryPage from "../Pages/SalaryPage/SalaryPage";
import ExpensesPage from "../Pages/ExpensesPage/ExpensesPage";
import ExamResults from "../Pages/ExamPage/components/ExamResults";

const SuperAdminPanelRoute = () => {
  return (
    <>
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/teachers/mentors" element={<TeachersPage />} />
      <Route path="/tuition-fee" element={<TuitionFeePage />} />
      <Route path="/consultation" element={<ConsultationsPage />} />
      <Route path="/groups/current" element={<GroupsPage />} />
      <Route path="/groups/waiting" element={<GroupsPage />} />
      <Route path="/groups/ended" element={<GroupsPage />} />
      <Route path="/workers" element={<WorkersPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/syllabus" element={<SyllabusPage />} />
      <Route path="/sales" element={<SalesPage />} />
      <Route path="/finance" element={<FinancePage />} />
      <Route path="/expenses" element={<ExpensesPage/>} />
      {/* <Route path="/finance/expenses" element={<FinancePage />} />
      <Route path="/finance/incomes" element={<FinancePage />} /> */}
      <Route path="/event" element={<EventsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/lesson" element={<LessonTablePage />} />
      <Route path="/diploma" element={<DiplomaPage />} />
      <Route path="/room" element={<RoomsPage />} />
      <Route path="/exams/futureExams" element={<ExamPage />} />
      <Route path="/exams/pastExams" element={<ExamPage />} />
      <Route path="/exams/examResults" element={<ExamPage />} />
      <Route path="/exams/:id/questions" element={<QuestionPage />} />
      <Route path="/exams/examResults/:id" element={<ExamResults/>} />
      <Route path="/salary" element={<SalaryPage />} />
    </>
  );
};

export default SuperAdminPanelRoute;
