import { useState } from "react";
import { useDispatch } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { CONSULTATION_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import moment from "moment";
import { deleteConsultationAction } from "../../../redux/actions/consultationsActions";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";
import DeleteItemModal from "../../../globalComponents/Modals/DeleteItemModal/DeleteItemModal";

const ConsultationCard = ({
  cellNumber,
  mode,
  setOpenMoreModal,
  data,
  consultation,
}) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    cancelReasonList,
    knowledgeList,
    constStatusList,
    whereComingList,
    personaList,
  } = useCustomHook();

  const listData = [
    { key: "Təlimçi", value: data?.teacher?.fullName },

    { key: "Mobil nömrə", value: data?.studentPhone },
    {
      key: "İxtisas",
      value: data?.courses?.map((course) => course.name).join(", "),
    },
    {
      key: "Əlaqə tarixi",
      value: data?.contactDate
        ? moment(data?.contactDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    {
      key: "Konsultasiya tarixi",
      value: data?.constDate
        ? moment(data?.constDate).locale("az").format("DD MMMM YYYY")
        : "",
    },
    { key: "Konsultasiya saatı", value: data?.constTime },
    {
      key: "Status",
      value:
        constStatusList.find((item) => item.key === data.status)?.name || "",
    },
  ];

  const whereComingName =
    whereComingList.find((item) => item?.key === data?.whereComing)?.name || "";

  const cancelReasonName =
    cancelReasonList.find((item) => item?.key === data?.cancelReason)?.name ||
    "";
  const knowledgeListName =
    knowledgeList.find((item) => item?.key === data?.knowledge)?.name || "";
  const personaName =
    personaList.find((item) => item?.key === data?.persona)?.name || "";

  const courses = data?.courses?.map((course) => course.name).join(", ");

  const updateItem = (modalType) => {
    console.log("5. updateItem");

    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.GET_CONSULTATION_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
        firstStep: true,
        secondStep: false,
      },
    });
  };
  const deleteItem = () => {
    dispatch(deleteConsultationAction(data._id));
  };
  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const openConfirmModal = () => {
    dispatch({
      type: CONSULTATION_MODAL_ACTION_TYPE.OPEN_CONSULTATION_CONFIRM_MODAL,
      payload: {
        data: data,
        openModal: false,
        confirmModal: true,
      },
    });
  };

  const doubleClick = () => {
    updateItem("");
  };

  // console.log(constStatusList, "consttttttttttt");
  return (
    <>
      {showDeleteModal && (
        <DeleteItemModal
          setShowDeleteModal={setShowDeleteModal}
          deleteItem={deleteItem}
        />
      )}
      {mode === "desktop" ? (
        <tr onDoubleClick={doubleClick}>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {cellNumber}. {data?.studentName}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{data?.fin}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{data?.studentPhone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "120px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{courses}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "120px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{knowledgeListName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {data?.contactDate
                  ? moment(data?.contactDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>

          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {data?.constDate
                  ? moment(data?.constDate).locale("az").format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{data?.constTime}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {data?.addInfo ? data.addInfo : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{whereComingName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {cancelReasonName ? cancelReasonName : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td
            style={
              data?.status === "sold"
                ? { backgroundColor: "#d4ffbf" }
                : data?.status === "cancelled"
                ? { backgroundColor: "#ffced1" }
                : { backgroundColor: "#d2c3fe" }
            }
          >
            <div className="td-con" style={{ width: "150px" }}>
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">
                {constStatusList.find((item) => item.key === data.status)
                  ?.name || ""}
              </div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openConfirmModal={openConfirmModal}
              openMoreModal={openMoreModal}
              profil={"consultation"}
              state={consultation}
              setShowDeleteModal={setShowDeleteModal}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.studentName}</h3>
            <ul>
              {listData?.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}:</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          {consultation.power === "only-show" ? (
            <div className="more-content">
              <span onClick={openMoreModal}>Ətraflı</span>
            </div>
          ) : (
            <div className="right">
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openConfirmModal={openConfirmModal}
                state={consultation}
                openMoreModal={openMoreModal}
                profil={"consultation"}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ConsultationCard;
