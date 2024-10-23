import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/icons/exam/close.svg";
import { useNavigate } from "react-router-dom";

const ResultModal = () => {
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate(`/exams/examResults`);
  };
  return (
    <div className="res-modal">
      <div className="res-modal-container">
        <CloseIcon onClick={handleNavigate} />
        <h4>Topladığınız bal:20</h4>
      </div>
    </div>
  );
};

export default ResultModal;
