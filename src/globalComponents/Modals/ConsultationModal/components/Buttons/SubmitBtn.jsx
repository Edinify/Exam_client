import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateConsultationAction,
  createConsultationAction,
} from "../../../../../redux/actions/consultationsActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  console.log(formik)
  const dispatch = useDispatch();
  const { consultationModalLoading: modalLoading } = useSelector(
    (state) => state.consultationModal
  );
  const dataCreate = () => {
    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(
        updateConsultationAction(modalData?._id, {
          ...modalData,
          course: modalData?.course?._id,
          teacher: modalData?.teacher?._id,
        })
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.WORKERS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createConsultationAction({
          ...modalData,
          course: modalData?.course?._id,
          teacher: modalData?.teacher?._id,
        })
      );
    }
  };

  return (
    <div>
      <div className="create-update-modal-btn">
        <button disabled={!formik.isValid || modalLoading} onClick={dataCreate}>
          {modalLoading ? (
            <LoadingBtn />
          ) : funcType === "update" ? (
            "Yenilə"
          ) : (
            "Yarat"
          )}
        </button>
      </div>
    </div>
  );
};

export default SubmitBtn;
