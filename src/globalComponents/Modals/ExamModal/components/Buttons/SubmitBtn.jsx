import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import {
  createExamAction,
  updateExamAction,
} from "../../../../../redux/actions/examActions";

export default function SubmitBtn({ formik, modalData, funcType }) {
  const dispatch = useDispatch();
  const { examModalLoading } = useSelector((state) => state.examModal);
  const createExam = () => {
    if (modalData?._id) {
      dispatch(updateExamAction(modalData?._id, modalData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.EXAM_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createExamAction(modalData));
    }
  };

  return (
    <div className="create-update-modal-btn">
      <button
        disabled={!(formik.isValid && modalData?.name && !examModalLoading)}
        onClick={createExam}
      >
        {examModalLoading ? (
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
