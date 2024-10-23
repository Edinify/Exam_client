import React from "react";
import { Route } from "react-router";
import LessonTablePage from "../Pages/LessonTablePage/LessonTablePage";
import ExamPage from "../Pages/ExamPage/ExamPage";
import QuestionPage from "../Pages/QuestionPage/QuestionPage";
import ExamResults from "../Pages/ExamPage/components/ExamResults";

const StudentPanelRoute = () => {
  return (
    <>
      <Route path="/student-panel/" element={<LessonTablePage />} />
      <Route path="/exams/futureExams" element={<ExamPage />} />
      <Route path="/exams/examResults" element={<ExamPage />} />
      <Route path="/exams/examResults/:id" element={<ExamResults />} />
      <Route path="/exams/:id/questions" element={<QuestionPage />} />
    </>
  );
};

export default StudentPanelRoute;
