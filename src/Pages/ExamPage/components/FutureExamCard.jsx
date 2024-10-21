import React from "react";
import FutureLessonIcon from "../../../assets/images/exam/future-lesson-icon.png"
import moment from "moment";
import { useDispatch } from "react-redux";
import { EXAM_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteExamAction } from "../../../redux/actions/examActions";


const FutureExamCard = ({ data }) => {
  const dispatch = useDispatch()

  const updateExamCard=()=>{
    dispatch({type:EXAM_MODAL_ACTION_TYPE.GET_EXAM_MODAL,payload:{
      data:data,
      openModal:true
    }})
  }

  const deleteExamCard=(id)=>{
    dispatch(deleteExamAction(id))
  }
  return (
    <div className=" future-exam-card">
        <div className="exam-img">
            <img src={FutureLessonIcon} alt="" />
        </div>
      <div className="exam-card-container">
        <h4>{data.name}</h4>
        <h5>{moment(data.date).format("YYYY.MM.DD")}</h5>
        <h5>{`${data?.startTime} - ${data?.endTime}`}</h5>
        {/* <button onClick={updateExamCard} >Edit</button>
        <button onClick={()=>deleteExamCard(data._id)} >Delete</button> */}
      </div>
    </div>
  );
};

export default FutureExamCard;
