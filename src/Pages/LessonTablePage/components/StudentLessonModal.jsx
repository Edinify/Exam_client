import React, { useState } from "react";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import "./studentLesson.css";
import { useDispatch, useSelector } from "react-redux";
import { updateLessonTableAction } from "../../../redux/actions/lessonTableActions";
import { LESSON_TABLE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import LoadingBtn from "../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";

const StudentLessonModal = ({ targetLesson, setTargetLesson }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [point, setPoint] = useState("");
  const [togggleIcon, setToggleIcon] = useState("");
  const { user } = useSelector((state) => state.user);
  const { lessonTableModalLoading } = useSelector(
    (state) => state.lessonTableModal
  );
  const dispatch = useDispatch();

  const updateLessonStudents = () => {
    dispatch(
      updateLessonTableAction(targetLesson._id, {
        students: targetLesson.students,
      })
    );
  };

  const getBackgroundColor = (item) => {
    if (item.attendance === 1) {
      return "#D4FFBF";
    } else if (item.attendance === -1) {
      return "#FFCED1";
    } else {
      return "";
    }
  };

  const signBackgroundColor = (item) => {
    if (item.studentSignature === 1) {
      return "#D4FFBF";
    } else if (item.studentSignature === -1) {
      return "#FFCED1";
    } else {
      return "";
    }
  };

  const handleStatusChange = (newItem) => {
    let newStudentsList = targetLesson.students.map((item) =>
      item._id === newItem._id ? newItem : item
    );

    setToggleIcon("down")
    setTargetLesson((prev) => ({ ...prev, students: newStudentsList }));
  };
  return (
    <div className="create-update-modal-con">
      <div className="student-lesson-modal">
        <div className="create-update-modal-head">
          <p className="content-type">Tələbələr</p>
          <CloseBtn
            onClick={() =>
              dispatch({
                type: LESSON_TABLE_MODAL_ACTION_TYPE.STUDENT_MODAL,
                payload: false,
              })
            }
          />
        </div>
        <div className="students-list">
          {targetLesson?.students?.map((item) => (
            <div
              style={{ backgroundColor: getBackgroundColor(item) }}
              className={`student-list ${
                selectedStudentId === item.student._id ? "selected" : ""
              }`}
              key={item.student._id}
            >
              <div className="student-name">{item.student.fullName}</div>
              {item.attendance === 1 && (
                <input
                  type="number"
                  value={item?.point ?? ""}
                  onChange={(e) =>
                    handleStatusChange({
                      ...item,
                      point: e.target.value,
                    })
                  }
                  placeholder="Qiymət"
                />
              )}

              <div className="drop-icon">
                <div
                  className="dropdown-icon"
                  onClick={() =>
                    setToggleIcon(
                      togggleIcon === item.student._id ? "" : item.student._id
                    )
                  }
                >
                  <svg
                    className={togggleIcon === item.student._id ? "up" : "down"}
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9465 5.95337L7.79316 5.95337L4.05317 5.95337C3.41317 5.95337 3.09317 6.7267 3.5465 7.18004L6.99983 10.6334C7.55317 11.1867 8.45317 11.1867 9.0065 10.6334L10.3198 9.32003L12.4598 7.18003C12.9065 6.7267 12.5865 5.95337 11.9465 5.95337Z"
                      fill="#717171"
                    />
                  </svg>
                </div>
              </div>
              {togggleIcon === item.student._id && (
                <div
                  className={`status ${
                    togggleIcon === item.student._id ? "active" : ""
                  }`}
                >
                  <p
                    onClick={() => {
                      item.point
                        ? handleStatusChange({ ...item, attendance: 1 })
                        : handleStatusChange({ ...item, attendance: 1, point });
                    }}
                  >
                    i/e
                  </p>
                  <p
                    onClick={() =>
                      handleStatusChange({ ...item, attendance: -1, point: "" })
                    }
                  >
                    q/b
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {user?.role !== "student" && (
          <div className="create-update-modal-btn">
            <button
              disabled={lessonTableModalLoading}
              onClick={updateLessonStudents}
            >
              {lessonTableModalLoading ? <LoadingBtn /> : "Təstiqlə"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLessonModal;
