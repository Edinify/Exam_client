import React from 'react'
import {ReactComponent as CloseIcon} from "../../../assets/icons/exam/close.svg"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ResultModal = ({setOpenResultModal}) => {

    const navigate = useNavigate();

    const { examResult } = useSelector((state) => state.examsData);



    const handleNavigate=()=>{
        navigate(`/exams/examResults/${examResult._id}`)
    }
  return (
    <div className='res-modal'>
        <div className="res-modal-container">
            <CloseIcon onClick={handleNavigate} />
            <h4>Topladığınız bal:20</h4>
        </div>
    </div>
  )
}

export default ResultModal