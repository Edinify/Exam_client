import React from "react";

const ExamResults = () => {
  const tableHead = [
    "Ad soyad",
    "Sual sayı",
    "Düz cavab sayı",
    "Səhv cavab sayı",
  ];

  const tableBodyData = [
    {
      id: 1,
      name: "Arto",
      questionNumber: "20",
      correctAnswer: "20",
      wrongAnswer: "20",
    },
    {
      id: 1,
      name: "Arto",
      questionNumber: "20",
      correctAnswer: "20",
      wrongAnswer: "20",
    },
    {
      id: 1,
      name: "Arto",
      questionNumber: "20",
      correctAnswer: "20",
      wrongAnswer: "20",
    },
    {
      id: 1,
      name: "Arto",
      questionNumber: "20",
      correctAnswer: "20",
      wrongAnswer: "20",
    },
  ];
  return (
    <div className="exam-results">
      <div className="exam-results-header">
        <h2>İmtahan nəticələri</h2>
        <h4>
          İştirak edən tələbə sayı <span>24</span>
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
            {tableBodyData.map(data=>(
                <tr key={data.id} >
                    <td>{data.name}</td>
                    <td>{data.questionNumber}</td>
                    <td>{data.correctAnswer}</td>
                    <td>{data.wrongAnswer}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResults;
