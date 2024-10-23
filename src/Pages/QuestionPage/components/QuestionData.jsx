import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

import QuestionCard from "./QuestionCard";
import ResultModal from "./ResultModal";

const QuestionData = () => {
  const { questions,currentExam } = useSelector((state) => state.questionsData);
  const { openConfirmModal } = useSelector((state) => state.studentsModal);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);


  const { user } = useSelector((state) => state.user);

  console.log(currentExam,"current")

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

  return (
    <>
      {openConfirmModal && <ConfirmModal type="student" />}
      {openResultModal && <ResultModal />}
      <div className="questions-container">
        <div className="question-header">
          <h4>{currentExam?.name}</h4>
          <span>60:00</span>
        </div>
        <ul>
          {questions?.map((question, i) => (
            <li key={question._id}>
              <QuestionCard
                data={question}
                key={question._id}
                cellNumber={i + 1}
              />
            </li>
          ))}
        </ul>
        {user.role !== "super-admin" && (
          <div className="question-acc-btn">
            <button onClick={() => setOpenResultModal(true)}>Təsdiqlə</button>
          </div>
        )}
      </div>

      <div className="details-list-tablet with-more">
        {questions?.map((question, i) => (
          <QuestionCard
            key={question._id}
            data={question}
            mode="tablet"
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionData;
