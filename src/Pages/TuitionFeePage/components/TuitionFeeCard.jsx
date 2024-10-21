import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteStudentAction } from "../../../redux/actions/studentsActions";
import moment from "moment";
import { useCustomHook } from "../../../globalComponents/GlobalFunctions/globalFunctions";

const TuitionFeeCard = ({ mode, setOpenMoreModal, data, cellNumber }) => {
  const dispatch = useDispatch();
  const { discountReasonList, studentStatus } = useCustomHook();
  const { tuitionFeeData, lastPage } = useSelector(
    (state) => state.tuitionFeePagination
  );
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);

  const listData = [
    {key:"Mobil nömrə",value:data?.phone},
    {key:"Fənn",value:data?.group?.course?.name},
    {
      key: "Qrup",
      value: `${data?.group?.name} - ${data?.group?.course?.name}`,
    },
    {
      key: "Müqavilə başlama tarixi",
      value: data?.currentContract?.contractStartDate
        ? moment(data?.currentContract?.contractStartDate)
            .locale("az")
            .format("DD MMMM YYYY")
        : "",
    },
    {
      key: "Ödəniş başlama tarixi",
      value:data?.currentContract?.paymentStartDate
          ? moment(data?.currentContract?.paymentStartDate)
              .locale("az")
              .format("DD MMMM YYYY")
          : ""
    },
    {key: "Aylıq ödəniş",value:data?.currentContract?.monthlyPayment},
    {key: "Cari ödəniləcək məbləğ",value:`${data?.currentPayment} AZN`},
  
  ];

  const updateItem = (modalType) => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.GET_TUITION_FEE_MODAL,
      payload: {
        data: data,
        openModal: modalType !== "more" ? true : false,
      },
    });
  };

  const deleteItem = () => {
    const pageNumber =
      lastPage > 1 ? (tuitionFeeData.length > 1 ? lastPage : lastPage - 1) : 1;
    const _id = data._id;
    const searchQuery = tuitionFeeSearchValues;
    const status = "all";
    dispatch(deleteStudentAction({ _id, pageNumber, searchQuery, status }));
  };

  const openConfirmModal = () => {
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: data,
        openModal: false,
        openConfirmModal: true,
      },
    });
  };

  const openMoreModal = () => {
    updateItem("more");
    setOpenMoreModal(true);
  };

  const doubleClick = () => {
    openConfirmModal();
  };
  return (
    <>
      {mode === "desktop" ? (
        <tr onDoubleClick={doubleClick}>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="cell-number">{cellNumber}.</div>
              <div className="table-scroll-text no-wrap">{data?.fullName}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con" style={{ width: "200px" }}>
              <div className="table-scroll-text no-wrap">{data?.phone}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.group?.course?.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.group?.name}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.currentContract?.contractStartDate
                  ? moment(data?.currentContract?.contractStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.currentContract?.paymentStartDate
                  ? moment(data?.currentContract?.paymentStartDate)
                      .locale("az")
                      .format("DD MMMM YYYY")
                  : ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {data?.currentContract?.monthlyPayment}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td
            style={
              data.currentPayment <= 0
                ? { backgroundColor: "#d4ffbf" }
                : { backgroundColor: "#ffced1" }
            }
          >
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                <p>{data.currentPayment} AZN</p>
              </div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text no-wrap">
                {studentStatus.find((item) => item.key === data?.status)
                  ?.value || ""}
              </div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
              openMoreModal={openMoreModal}
              openConfirmModal={openConfirmModal}
              profil={"tuitionFee"}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <h3>{data?.fullName}</h3>
            <ul>
              {listData?.map((item, index) => (
                <li key={index}>
                  <span className="type">{item.key}</span>
                  <p>{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="right">
            <td>
              <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={data}
                openMoreModal={openMoreModal}
                openConfirmModal={openConfirmModal}
                profil={"tuitionFee"}
              />
            </td>
          </div>
        </div>
      )}
    </>
  );
};

export default TuitionFeeCard;
