import React, { useEffect, useState } from "react";
import ExamCard from "./ExamCard";
import { useLocation, useNavigate } from "react-router-dom";
// import FutureExamCard from "./FutureExamCard";
// import ExamResults from "./ExamResults";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const ExamsData = ({ getNextExam }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { exams, hasMore } = useSelector((state) => state.examsData);
  const [scrollHeight, setScrollHeight] = useState(1);

  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    const detailsHeader = document.querySelector(".details-header");

    const handleResize = () => {
      setScrollHeight(
        window.innerHeight -
          mainHeader.offsetHeight -
          detailsHeader.offsetHeight
      );
    };

    setScrollHeight(
      window.innerHeight - mainHeader.offsetHeight - detailsHeader.offsetHeight
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <div className="exam-data-container">
      <InfiniteScroll
        style={{ overflowX: "none" }}
        dataLength={exams.length}
        next={getNextExam}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        scrollThreshold={0.7}
        height={scrollHeight}
      >
        <div className="exam-data">
          {exams.map((exam) => (
            <ExamCard key={exam._id} data={exam} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ExamsData;
