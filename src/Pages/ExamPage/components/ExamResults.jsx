import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExamResultAction } from "../../../redux/actions/examActions";
import { useParams } from "react-router-dom";
import { RESULTS_ACTION_TYPE } from "../../../redux/actions-type";

const ExamResults = () => {
  const tableHead = ["Tələbə adı", "Sual sayı", "Düz cavab "];

  const { results,currentExam} = useSelector((state) => state.examResults);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getExamResultAction(id));
  }, []);


  console.log(currentExam,"current exam")

  return (
    <>
      <div className="exam-results">
        <div className="exam-results-header">
          <h2>İmtahan nəticələri</h2>
          <h4>
            İştirak edən tələbə sayı <span>{currentExam?.students?.length}</span>
          </h4>
        </div>
        <table className="exam-results-table">
          <thead>
            <tr>
              {tableHead.map((head, i) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results?.map((data,i) => (
              <tr key={i}>
                <td>{data?.studentName}</td>
                <td>{data?.questionsCount || ""}</td>
                <td>{data?.correctCount || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExamResults;
