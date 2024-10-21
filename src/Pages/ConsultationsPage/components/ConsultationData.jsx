import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConsultationCard from "./ConsultationCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MoreModal from "../../../globalComponents/MoreModal/MoreModal";
import ConfirmModal from "../../../globalComponents/ConfirmModal/ConfirmModal";
import InfiniteScroll from "react-infinite-scroll-component";
import SmallLoading from "../../../globalComponents/Loading/components/SmallLoading/SmallLoading";

const ConsultationData = ({ getNextConsultation, userData }) => {
  const { hasMore, consultationData } = useSelector(
    (state) => state.consultationPagination
  );
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { openConfirmModal } = useSelector((state) => state.consultationModal);
  const [scrollHeight, setScrollHeight] = useState(1);

  // console.log(consultationData)
  const tableHead = [
    "Tələbə",
    "Fin",
    "Mobil nömrə",
    "İxtisas",
    "Sahə biliyi",
    "Əlaqə tarixi",
    "Konsultasiya tarixi",
    "Konsultasiya saatı",
    "Əlavə məlumat",
    "Bizi haradan eşitdiniz",
    "Ləğv səbəbi",
    "Status",
    "",
  ];

  // console.log(consultationData, "consultation data");

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
    // const globalHeads = document.querySelector(".global-head-tabs");

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
      <>
        {openMoreModal && (
          <MoreModal
            userData={userData}
            setOpenMoreModal={setOpenMoreModal}
            type="consultation"
          />
        )}

        {openConfirmModal && <ConfirmModal type="consultation" />}

        <div className="table-con">
          <InfiniteScroll
            style={{ overflowX: "none" }}
            dataLength={consultationData.length}
            next={getNextConsultation}
            hasMore={hasMore}
            loader={<SmallLoading />}
            className="infinity-scroll"
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={scrollHeight}
            scrollThreshold={0.7}
          >
            <table className="details-table consultation-page ">
              <thead>
                <tr>
                  {tableHead.map((head, i) => (
                    <th key={i}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {consultationData?.map((consultation, i) => {
                  const currContactDate = new Date(consultation.contactDate);
                  const beforeContactDate =
                    i > 0 && new Date(consultationData[i - 1].contactDate);

                  return (
                    <React.Fragment key={consultation._id}>
                      {i > 0 &&
                        currContactDate.getDate() !==
                          beforeContactDate.getDate() && (
                          <tr>
                            <td
                              colSpan={tableHead.length}
                              style={{ height: "25px", padding: 0, zIndex: -1 }}
                            >
                              <div
                                style={{
                                  height: "100%",
                                  background: "var(--tertiary-200)",
                                }}
                              ></div>
                            </td>
                          </tr>
                        )}
                      <ConsultationCard
                        data={consultation}
                        mode="desktop"
                        consultation={userData}
                        setOpenMoreModal={setOpenMoreModal}
                        cellNumber={i + 1}
                      />
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>

        <div className="details-list-tablet with-more">
        <InfiniteScroll
            style={{ overflowX: "none" }}
            dataLength={consultationData.length}
            next={getNextConsultation}
            hasMore={hasMore}
            loader={<SmallLoading />}
            endMessage={
              <p style={{ textAlign: "center", fontSize: "20px" }}></p>
            }
            height={scrollHeight}
            scrollThreshold={0.7}
          >
            {consultationData?.map((student, i) => (
              <ConsultationCard
                key={i}
                data={student}
                mode="tablet"
                setOpenMoreModal={setOpenMoreModal}
                cellNumber={i + 1}
                consultation={userData}
              />
            ))}
            </InfiniteScroll>
          </div>
      </>
    </>
  );
};

export default ConsultationData;
