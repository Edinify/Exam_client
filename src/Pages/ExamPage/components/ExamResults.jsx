import React from "react";
import { useSelector } from "react-redux";

const ExamResults = () => {
  const tableHead = ["Tələbə adı", "Sual sayı", "Düz cavab "];

  const { examResult } = useSelector((state) => state.examsData);

  const { user } = useSelector((state) => state.user);


 

  return (
    <>
    
        <div className="exam-results">
          <div className="exam-results-header">
            <h2>İmtahan nəticələri</h2>
            <h4>
              İştirak edən tələbə sayı{" "}
              <span>{examResult?.students?.length}</span>
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
              {examResult?.students?.map((student) => (
                <tr key={student._id}>
                  <td>{student?.fullName}</td>
                  <td>{student?.questionNumber || ""}</td>
                  <td>{student?.correctAnswer || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </>
  );
};

export default ExamResults;
