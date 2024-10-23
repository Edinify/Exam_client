import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import {
  EXAM_QUESTION_MODAL_ACTION_TYPE,
  STUDENTS_MODAL_ACTION_TYPE,
} from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import moment from "moment";
import "moment/locale/az";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";
import { useState } from "react";
import {
  deleteQuestion,
  updateQuestionAction,
  // updateQuestionByStudentAction,
} from "../../../redux/actions/examActions";

const QuestionCard = ({
  data,
  mode,
  cellNumber,
  setOpenMoreModal,
  setOpenConfirmModal,
}) => {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const listData = [
    // { key: "İxtisas", value: courses },
    // {
    //   key: "Mobil nömrə",
    //   value: data?.phone ? data?.phone : "",
    // },
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: EXAM_QUESTION_MODAL_ACTION_TYPE.GET_QUESTION_MODAL,
      payload: {
        data: JSON.parse(JSON.stringify(data)),
        openModal: true,
      },
    });
  };

  const deleteItem = () => {
    dispatch(deleteQuestion(data._id));
  };

  console.log(data, "qusetionnnnnnn data");

  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      <div className="question-card">
        <div className="question-header">
          <h3>
            {cellNumber}. {data?.text}
          </h3>
          <div className="exam-functions-container">
            {user?.role != "student" && (
              <UpdateDeleteModal
                data={data}
                updateItem={updateItem}
                deleteItem={deleteItem}
                setShowDeleteModal={setShowDeleteModal}
              />
            )}
          </div>
        </div>
        <div className="question-options-container">
          <ul>
            {data?.options?.map((item, i) => (
              <li key={i} className="question-options-list">
                {(user?.role != "student" && (
                  <input type="checkbox" checked={item.isCorrect} />
                )) || (
                  <input
                    type="checkbox"
                    checked={item.isCorrectByStudent}
                    onChange={() => {
                      const newOptions = data.options.map((item, index) =>
                        i === index
                          ? { ...item, isCorrectByStudent: true }
                          : { ...item, isCorrectByStudent: false }
                      );
                      dispatch(
                        updateQuestionAction(data._id, { options: newOptions })
                      );
                    }}
                  />
                )}
                <h5>
                  {item.option} {item?.text}{" "}
                </h5>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
