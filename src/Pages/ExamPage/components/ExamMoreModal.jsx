import moment from "moment";
import React from "react";

const ExamMoreModal = ({ data, setShowMoreModal }) => {
  const studentsList = data?.students?.map((student) => student.fullName);

  const dataList = [
    { title: "Fənn", value: data?.name },
    { title: "Tarix", value: moment(data?.date).format("YYYY.MM.DD") },
    { title: "Başlama saatı", value: data?.startTIme },
    { title: "Bitmə saatı", value: data?.endTime },
    { title: "İxtisas", value: data?.course?.name },
    { title: "Müəllim", value: data?.teacher?.fullName },
    { title: "Tələbələr", value: studentsList },
  ];

  return (
    <div className="exam-more-modal">
      <div className="exam-more-modal-container">
        <div className="exam-more-modal-header">
          <h2>İmtahan məlumatları</h2>
          <div className="close-more-modal">
            <span onClick={() => setShowMoreModal(false)}>X</span>
          </div>
        </div>
        <div className="exam-more-details">
          {dataList.map((item, index) => (
            <h3 key={index}>
              {item.title}: <span>{item.value}</span>
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamMoreModal;
