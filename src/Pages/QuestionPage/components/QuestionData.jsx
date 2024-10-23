import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";

import QuestionCard from "./QuestionCard";
import ResultModal from "./ResultModal";

const QuestionData = () => {
  const { questions } = useSelector((state) => state.questionsData);
  const { openConfirmModal } = useSelector((state) => state.studentsModal);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  console.log(questions, "questionss");

  const { user } = useSelector((state) => state.user);

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
