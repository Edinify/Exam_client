import React, { useState } from "react";
import LessonIcon from "../../../assets/images/exam/lesson-icon.png";
import moment from "moment";
import { EXAM_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteExamAction } from "../../../redux/actions/examActions";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import ExamMoreModal from "./ExamMoreModal";

const ExamCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const location = useLocation();

  const updateItem = () => {
    dispatch({
      type: EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL,
      payload: {
        data: data,
        openModal: true,
      },
    });
  };

  const onHandleClick = () => {
    if (!data.active) return;

    if (
      location.pathname === "/exams/pastExams" ||
      location.pathname === "/exams/futureExams"
    ) {
      navigate(`/exams/${data._id}/questions`);
    } else if (location.pathname === "/exams/examResults") {
      navigate(`/exams/examResults/${data._id}`);
    }
  };

  const deleteItem = () => {
    dispatch(deleteExamAction(data._id));
  };
  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      {showMoreModal && (
        <ExamMoreModal data={data} setShowMoreModal={setShowMoreModal} />
      )}
      <div className="exam-card" style={{ opacity: data.active ? 1 : 0.8 }}>
        <div className="exam-img">
          <img src={LessonIcon} alt="" />
        </div>
        <div className="exam-functions-container">
          <UpdateDeleteModal
            data={data}
            updateItem={updateItem}
            deleteItem={deleteItem}
            setShowDeleteModal={setShowDeleteModal}
            type="exam"
            profil="exam"
            setShowMoreModal={setShowMoreModal}
          />
        </div>
        <div className="exam-card-container" onClick={onHandleClick}>
          <h4>{data?.name}</h4>
          <h5>{moment(data?.date).format("DD.MM.YYYY")}</h5>
          <h5>{`${data?.startTime} - ${data?.endTime}`}</h5>
        </div>
      </div>
    </>
  );
};

export default ExamCard;
