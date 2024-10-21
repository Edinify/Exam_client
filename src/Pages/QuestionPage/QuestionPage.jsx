import { useDispatch, useSelector } from "react-redux";
import { getQuestionAction } from "../../redux/actions/examActions";
import QuestionData from "./components/QuestionData";
import { useEffect } from "react";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useParams } from "react-router-dom";
import { EXAM_QUESTION_MODAL_ACTION_TYPE } from "../../redux/actions-type";

const QuestionPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const openModal = () => {
    dispatch({
      type: EXAM_QUESTION_MODAL_ACTION_TYPE.GET_QUESTION_MODAL,
      payload: { data: { exam: id }, openModal: true },
    });
  };

  useEffect(() => {
    dispatch(getQuestionAction(id));
  }, [dispatch]);

  return (
    <div className="details-page students-page">
      <GlobalHead
        searchData={""}
        openModal={openModal}
        filter={""}
        DATA_SEARCH_VALUE={""}
        dataSearchValues={""}
        statusType="question"
        profile="question"
      />

      <QuestionData />
    </div>
  );
};

export default QuestionPage;
