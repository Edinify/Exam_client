import React, { useCallback, useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { EXAM_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { Box } from "@mui/material";
import InputField from "./components/Inputs/InputField";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import { useFormik } from "formik";
import { ValidationSchema } from "../CourseModal/components/ValidationSchema";
import CourseInput from "./components/Inputs/CourseInput";
import TeacherInput from "./components/Inputs/TeacherInput";
import StudentsList from "./components/Inputs/StudentsList/StudentsList";

const ExamModal = () => {
  const dispatch = useDispatch();

  const { examModalData: modalData } = useSelector((state) => state.examModal);
  const inputNameArr = ["name", "date"];
  const inputNameTimeArr = ["startTime", "endTime"];

  const closeModal = () => {
    dispatch({
      type: EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL,
      payload: {
        data: {},
        openModal: false,
      },
    });
  };



  const updateModalState = (keyName, value) => {
    dispatch({
      type: EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL,
      payload: {
        data: { ...modalData, [keyName]: value },
        openModal: true,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: modalData?.name ? modalData?.name : "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  return (
    <div className="create-update-modal-con">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{modalData?._id ? "İmtahan yenilə" : "İmtahan yaradın"}</h2>
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
            {inputNameArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                modalData={modalData}
                updateModalState={updateModalState}
                setInputValue={setInputValue}
                formik={formik}
              />
            ))}
              <div className="input-couples">
              {inputNameTimeArr.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  modalData={modalData}
                  updateModalState={updateModalState}
                  setInputValue={setInputValue}
                  formik={formik}
                />
              ))}
            </div>
            {/* <CourseInput
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            />
            <TeacherInput
              modalData={modalData}
              updateModalState={updateModalState}
              formik={formik}
            /> */}
            <StudentsList
            modalData={modalData}
            updateModalState={updateModalState}
            formik={formik}
            />

          
          </div>
        </Box>

        <SubmitBtn
          formik={formik}
          modalData={modalData}
          funcType={modalData?._id ? "update" : "create"}
        />
      </div>
    </div>
  );
};

export default ExamModal;
