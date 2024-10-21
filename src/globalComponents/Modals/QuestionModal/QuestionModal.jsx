import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { EXAM_QUESTION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import QuestionInput from "./components/QuestionInput";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import { useParams } from "react-router-dom";

const QuestionModal = () => {
  const dispatch = useDispatch();
  const { questionModalData: modalData } = useSelector(
    (state) => state.questionModal
  );
  const params = useParams();
  console.log(params, "params in modal");
  const { examModalData } = useSelector((state) => state.examModal);

  const closeModal = () => {
    dispatch({
      type: EXAM_QUESTION_MODAL_ACTION_TYPE.GET_QUESTION_MODAL,
      payload: {
        data: {},
        openModal: false,
      },
    });
  };

  const updateModalState = (keyName, value) => {
    const updatedModalData = {
      ...modalData,
      [keyName]: value,
    };

    dispatch({
      type: EXAM_QUESTION_MODAL_ACTION_TYPE.GET_QUESTION_MODAL,
      payload: {
        data: updatedModalData,
        openModal: true,
      },
    });
  };
  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "Sual yenilə" : "Sual yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>
        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form exam ">
            <QuestionInput
              modalData={{ ...modalData, exam: examModalData }}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        <SubmitBtn
          modalData={modalData}
          funcType={modalData?._id ? "update" : "create"}
        />
      </div>
    </div>
  );
};

export default QuestionModal;
