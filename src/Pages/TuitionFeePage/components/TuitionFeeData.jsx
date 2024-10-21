import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TuitionFeeCard from "./TuitionFeeCard";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const TuitionFeeData = ({ getNextTuitionFees }) => {
  const { tuitionFeeData, hasMore } = useSelector(
    (state) => state.tuitionFeePagination
  );
  // const { loading } = useSelector((state) => state.tuitionFeePagination);

  const { openConfirmModal } = useSelector((state) => state.tuitionFeeModal);

  const [openMoreModal, setOpenMoreModal] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);

  const tableHead = [
    "Tələbənin adı",
    "Mobil nörmə",
    "Fənn",
    "Qrup",
    // "Cari müqavilə",
    "Müqavilə başlama tarixi",
    "Ödənişə başlama tarixi",
    "Aylıq ödəniş",
    "Cari ödəniləcək məbləğ",
    "Status",
    "",
  ];

  useEffect(() => {
    if (openMoreModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openMoreModal]);

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
      {openMoreModal && (
        <MoreModal
          data={tuitionFeeData}
          setOpenMoreModal={setOpenMoreModal}
          type="tuitionFee"
        />
      )}

      {openConfirmModal && <ConfirmModal type="tuitionFee" />}

      <InfiniteScroll
        dataLength={tuitionFeeData.length}
        next={getNextTuitionFees}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        height={scrollHeight}
        scrollThreshold={0.7}
        className="infinity-scroll"
      >
        <div className="table-con">
          <table className="details-table tuition-table  ">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i}>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tuitionFeeData?.map((data, i) => (
                <TuitionFeeCard
                  key={i}
                  data={data}
                  mode="desktop"
                  setOpenMoreModal={setOpenMoreModal}
                  cellNumber={i + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>

      <div className="details-list-tablet">
      <InfiniteScroll
        dataLength={tuitionFeeData.length}
        next={getNextTuitionFees}
        hasMore={hasMore}
        loader={<SmallLoading />}
        endMessage={<p style={{ textAlign: "center", fontSize: "20px" }}></p>}
        scrollThreshold={0.7}
      >
        {tuitionFeeData?.map((data, i) => (
          <TuitionFeeCard
            key={i}
            data={data}
            mode="tablet"
            setOpenMoreModal={setOpenMoreModal}
            cellNumber={i + 1}
          />
        ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default TuitionFeeData;
