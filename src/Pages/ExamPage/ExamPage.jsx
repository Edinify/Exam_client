import React, { useEffect } from "react";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useDispatch, useSelector } from "react-redux";
import ExamsData from "./components/ExamsData";
import HeadTabs from "../../globalComponents/HeadTabs/HeadTabs";
import {
  EXAM_MODAL_ACTION_TYPE,
  EXAM_PAGE_ACTION_TYPE,
} from "../../redux/actions-type";
import {
  getExamAction,
  getStudentExamResultAction,
} from "../../redux/actions/examActions";
import { useLocation } from "react-router-dom";

const ExamPage = () => {
  const { examSearchValue } = useSelector((state) => state.searchValues);
  const dispatch = useDispatch();
  const { exams, loading, totalLength } = useSelector(
    (state) => state.examsData
  );
  const { user } = useSelector((state) => state.user);

  const location = useLocation();

  const openModal = () => {
    dispatch({
      type: EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL,
      payload: {
        data: {},
        openModal: true,
      },
    });
  };

  const lessonData = [
    { id: 1, name: "Informatika", result: "20 bal" },
    { id: 2, name: "Informatika", result: "20 bal" },
    { id: 3, name: "Informatika", result: "20 bal" },
    { id: 4, name: "Informatika", result: "20 bal" },
  ];

  useEffect(() => {
    dispatch(getStudentExamResultAction());
  }, []);

  const searchData = (e) => {
    e.preventDefault();
    dispatch({
      type: EXAM_PAGE_ACTION_TYPE.GET_EXAMS,
    });
    if (location.pathname === "/exams/futureExams") {
      dispatch(getExamAction(0, examSearchValue, "notHeld"));
    } else if (location.pathname === "/exams/pastExams") {
      dispatch(getExamAction(0, examSearchValue, "held"));
    }
  };

  const getNextExam = () => {
    if (loading) return;
    if (examSearchValue) {
      if (location.pathname === "/exams/futureExams") {
        dispatch(getExamAction(exams?.length || 0, examSearchValue, "notHeld"));
      } else if (location.pathname === "/exams/pastExams") {
        dispatch(getExamAction(exams?.length || 0, examSearchValue, "held"));
      }
    } else if (
      location.pathname === "/exams/pastExams" &&
      examSearchValue === ""
    ) {
      dispatch(getExamAction(exams?.length || 0, "", "held"));
    } else if (
      location.pathname === "/exams/futureExams" &&
      examSearchValue === ""
    ) {
      dispatch(getExamAction(exams?.length || 0, "", "notHeld"));
    }
  };

  useEffect(() => {
    if (
      location.pathname === "/exams/pastExams" ||
      location.pathname === "/exams/examResults"
    ) {
      dispatch(getExamAction(0, examSearchValue || "", "held"));
    } else if (location.pathname === "/exams/futureExams") {
      dispatch(getExamAction(0, examSearchValue || "", "notHeld"));
    }
    return () => {
      dispatch({ type: EXAM_PAGE_ACTION_TYPE.RESET_EXAM });
    };
  }, [location.pathname]);

  return (
    <div className="details-page ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"EXAM_SEARCH_VALUE"}
        dataSearchValues={examSearchValue}
        profile="exam"
        statusType={"exam"}
        count={totalLength}
      />
      <HeadTabs
        firstRoute={"/exams/futureExams"}
        secondRoute={"/exams/pastExams"}
        thirdRoute={"/exams/examResults"}
        firstPathname={" Gələcək imtahanlar"}
        secondPathname={"Keçmiş İmtahanlar"}
        thirdPathname={"İmtahan nəticələri"}
      />
      {user.role === "super-admin" ||
      location.pathname !== "/exams/examResults" ? (
        <ExamsData getNextExam={getNextExam} />
      ) : (
        <div className="exam-results">
          <div className="exam-results-header">
            <h2>İmtahan nəticələri</h2>
          </div>
          <div>
            {lessonData?.map((lesson) => (
              <div key={lesson.id} className="exam-res-container">
                <div className="lesson-name">
                  <h4>{lesson.name}</h4>
                </div>
                <h5>{lesson.result}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
