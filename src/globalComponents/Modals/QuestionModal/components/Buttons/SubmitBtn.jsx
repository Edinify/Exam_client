import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn"

import { createQuestionAction, updateQuestionAction } from "../../../../../redux/actions/examActions";

export default function SubmitBtn({  modalData, funcType }) {

  const dispatch = useDispatch();
  const { questionModalLoading } = useSelector((state) => state.questionModal);
  const createQuestion = () => {
    if (modalData?._id) {
      dispatch(updateQuestionAction(modalData?._id, modalData));
    } else {
     
      dispatch(createQuestionAction(modalData));
    }
  };


  console.log(modalData,"modal dataaa")

  return (
    <div className="create-update-modal-btn">
      <button
       
        onClick={createQuestion}
      >
        {questionModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
}
