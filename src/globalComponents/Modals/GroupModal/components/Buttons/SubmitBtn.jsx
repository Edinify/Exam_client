import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateGroupAction,
  createGroupAction,
} from "../../../../../redux/actions/groupsActions";
import { SEARCH_VALUES_ACTION_TYPES } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({ formik, modalData, funcType }) => {
  const dispatch = useDispatch();
  const { groupModalLoading: modalLoading } = useSelector(
    (state) => state.groupModal
  );

  const dataCreate = () => {
    const courseId = modalData?.course?._id;

    const roomId = modalData?.room?._id;

    const teachersId = modalData?.teachers?.map((item) => {
      return item._id;
    });

    const mentorsId = modalData?.mentors?.map((item) => {
      return item._id;
    });

    const studentsId = modalData?.students?.map((item) => {
      return item._id;
    });

    const resultData = {
      ...modalData,
      course: courseId,
      teachers: teachersId,
      students: studentsId,
      mentors: mentorsId,
      room: roomId,
    };

    dispatch({
      type: SEARCH_VALUES_ACTION_TYPES.GROUPS_SEARCH_VALUE,
      payload: "",
    });
    if (modalData?._id) {
      dispatch(updateGroupAction(modalData?._id, resultData));
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.GROUPS_SEARCH_VALUE,
        payload: "",
      });
      dispatch(
        createGroupAction({
          ...resultData,
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
