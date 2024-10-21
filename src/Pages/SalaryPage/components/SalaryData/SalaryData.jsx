import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SalaryCard from "./SalaryCard";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../../globalComponents/Loading/components/SmallLoading/SmallLoading";
import ConfirmModal from "../../../../globalComponents/ConfirmModal/ConfirmModal";

const SalaryData = ({ getNextSalary }) => {
  const { salariesData, hasMore } = useSelector(
    (state) => state.salaryPagination
  );
  const [bonusEditModal, setBonusEditModal] = useState(false);
  const [bonusModal, setBonusModal] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);
  const { openConfirmModal } = useSelector((state) => state.salaryModal);

  const salaryTableHead = [
    { id: 1, head: "Müəllim adı" },
    { id: 2, head: "Cari əməkhaqqı" },
    { id: 4, head: "Qalıq" },
    { id: 5, head: "Ödənilmiş əməkhaqqı" },
    { id: 3, head: "Tələbə ödənişləri" },
    { id: 6, head: "" },
  ];
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
    <>
      {openConfirmModal && <ConfirmModal type="salary" />}

      <InfiniteScroll
        style={{ overflowX: "none" }}
        dataLength={salariesData.length}
        next={getNextSalary}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        scrollThreshold={0.7}
        height={scrollHeight}
        className="infinity-scroll"
      >
        <table className="details-table salary-table">
          <thead>
            <tr>
              {salaryTableHead?.map((salaryHead) => (
                <th key={salaryHead.id}>{salaryHead.head}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {salariesData?.map((salary, i) => (
              <SalaryCard
                key={i}
                salary={salary}
                mode="desktop"
                cellNumber={i + 1}
                bonusModal={bonusModal}
                setBonusEditModal={setBonusEditModal}
                setBonusModal={setBonusModal}
                bonusEditModal={bonusEditModal}
              />
            ))}
          </tbody>
        </table>
      </InfiniteScroll>

      <div className="details-list-tablet">
        {salariesData?.map((salary, index) => (
          <SalaryCard
            key={index}
            salary={salary}
            mode="tablet"
            cellNumber={index + 1}
            bonusModal={bonusModal}
            setBonusEditModal={setBonusEditModal}
            setBonusModal={setBonusModal}
            bonusEditModal={bonusEditModal}
          />
        ))}
      </div>
    </>
  );
};

export default SalaryData;
