import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { AiOutlinePlusCircle } from "react-icons/ai";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/az";
import { useDispatch, useSelector } from "react-redux";
import { updateTuitionFeeAction } from "../../../../redux/actions/tuitionFeeActions";
import { TUITION_FEE_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";
import Paids from "./components/Paids";
import { Card, Typography } from "antd";

const TuitionFeeConfirmModal = () => {
  const { tuitionFeeModalData, tuitionFeeModalLoading } = useSelector(
    (state) => state.tuitionFeeModal
  );
  const { lastPage } = useSelector((state) => state.tuitionFeePagination);
  const { tuitionFeeSearchValues } = useSelector((state) => state.searchValues);
  const dispatch = useDispatch();
  const [paidData, setPaidData] = useState({
    payment: "",
    paymentDate: "",
  });

  const updateTuitionPayments = () => {
    dispatch(
      updateTuitionFeeAction(
        tuitionFeeModalData,
        lastPage,
        tuitionFeeSearchValues
      )
    );
  };

  const togglePaymentStatus = (data) => {
    const newPayments = tuitionFeeModalData.payments.map((item) =>
      item._id == data._id ? data : item
    );

    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: { ...tuitionFeeModalData, payments: newPayments },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });
  };

  const addPayment = () => {
    const checkPaids = Array.isArray(tuitionFeeModalData.paids);
    dispatch({
      type: TUITION_FEE_MODAL_ACTION_TYPE.UPDATE_TUITION_FEE_PAYMENTS,
      payload: {
        data: {
          ...tuitionFeeModalData,
          paids: checkPaids
            ? [...tuitionFeeModalData.paids, paidData]
            : [paidData],
        },
        openModal: false,
        openConfirmModal: "openConfirmModal",
      },
    });

    setPaidData({
      payment: "",
      paymentDate: "",
    });
  };

  const confirmInformationData = [
    {
      id: 1,
      title: "Tələbə:",
      value: tuitionFeeModalData.fullName,
    },
    {
      id: 2,
      title: "Qrup:",
      value:
        tuitionFeeModalData.group.name +
        " - " +
        tuitionFeeModalData.group.course.name,
    },
    {
      id: 3,
      title: "Cari ödəniş:",
      value: tuitionFeeModalData.currentPayment + " AZN",
      style: {
        backgroundColor:
          tuitionFeeModalData.currentPayment <= 0 ? "#d4ffbf" : "#ffced1",
      },
    },
  ];

  console.log(tuitionFeeModalData, "ssssssssssssssssssssss");
  return (
    <div style={{ marginTop: "30px" }}>
      {confirmInformationData?.map((data) => (
        <div
          className="confirm-information-container"
          key={data.id}
          style={data?.style || {}}
        >
          <h2>{data.title}</h2>
          <h2>{data.value}</h2>
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>Müqavilələr:</h2>

      <Box sx={{ width: "100%", marginBottom: "40px", fontWeight: 500 }}>
        {tuitionFeeModalData?.contracts?.map((item, i) => (
          <Card
            key={i}
            sx={
              {
                // borderBottom: "0.1px solid ",
              }
            }
            className="paids-container"
          >
            <Typography component="p">
              Müqavilə nömrəsi: <span>{i + 1}</span>{" "}
            </Typography>
            <Typography component="p">
              Aylıq ödəniş: <span>{item.monthlyPayment}</span>{" "}
            </Typography>
            <Typography component="p">
              Ödənişə başlama tarixi:
              <span>
                {item?.paymentStartDate
                  ? moment(item.paymentStartDate).format("DD.MM.YYYY")
                  : ""}
              </span>
            </Typography>
            <Typography component="p">
              Müqavilə başlama tarixi:
              <span>
                {item?.contractStartDate
                  ? moment(item.contractStartDate).format("DD.MM.YYYY")
                  : ""}
              </span>
            </Typography>
            <Typography component="p">
              Müqavilə bitmə tarixi:
              <span>
                {item?.contractEndDate
                  ? moment(item.contractEndDate).format("DD.MM.YYYY")
                  : "davam edir"}
              </span>
            </Typography>
          </Card>
        ))}
      </Box>

      <div style={{ marginTop: "40px" }} className="tution-fee-confirm-modal">
        <h2 style={{ marginBottom: "40px" }}>Ödənişlər:</h2>
        <Paids tuitionFeeModalData={tuitionFeeModalData} />
        <div>
          <Box>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr",
                columnGap: "10px",
              }}
            >
              <TextField
                sx={{
                  "& input": {
                    fontSize: "12px",
                  },
                  marginTop: "0",
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontSize: "12px",
                    color: "#3F3F3F",
                    marginBottom: "10px",
                  },
                }}
                fullWidth
                id={"payment"}
                name={"payment"}
                type="number"
                label="ödəniş"
                value={paidData.payment}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  setPaidData({ ...paidData, payment: e.target.value });
                }}
                // onFocus={() => setShrink(true)}
              />
              <TextField
                sx={{
                  "& input": {
                    fontSize: "12px",
                  },
                  marginTop: "0",
                }}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    fontSize: "12px",
                    color: "#3F3F3F",
                    marginBottom: "10px",
                  },
                }}
                fullWidth
                id={"paymentDate"}
                name={"paymentDate"}
                type="date"
                label="tarix"
                value={paidData.paymentDate}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => {
                  setPaidData({ ...paidData, paymentDate: e.target.value });
                }}
                // onFocus={() => setShrink(true)}
              />
              <div className="right">
                <button
                  disabled={!paidData.payment || !paidData.paymentDate}
                  onClick={addPayment}
                  className="add-class"
                >
                  <AiOutlinePlusCircle />
                </button>
              </div>
            </div>
          </Box>
        </div>
        <div className="confirm-btns">
          <span></span>
          <button
            disabled={paidData.payment || paidData.paymentDate}
            className={`confirm ${
              paidData.payment || paidData.paymentDate || tuitionFeeModalLoading
                ? "disabled"
                : ""
            } `}
            onClick={updateTuitionPayments}
          >
            {tuitionFeeModalLoading ? <LoadingBtn /> : "Təstiqlə"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionFeeConfirmModal;
