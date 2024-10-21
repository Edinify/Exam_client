import React, { useEffect } from "react";
import { ReactComponent as MinusIcon } from "../../../../../assets/icons/minus-cirlce.svg";
import PaymentType from "../Groups/components/PaymentType";
import InputField from "./components/Inputs/InputField";
import DiscountReason from "./components/DiscountReason/DiscountReason";
import Status from "./components/Status/Status";
import { useDispatch } from "react-redux";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import Contracts from "./components/Payments/Contracts";
import { FaPlus } from "react-icons/fa";

const GroupInput = ({
  data,
  index,
  deleteItem,
  modalData,
  updateModalState,
  formik,
  setInputValue,
}) => {
  const groupData = modalData.groups;
  const foundIndex = groupData.findIndex(
    (item) => item.group._id === data.group._id
  );

  // const addPaymentType = (item) => {
  //   groupData[foundIndex] = {
  //     ...groupData[foundIndex],
  //     payment: item,
  //   };
  //   updateModalState("groups", groupData);
  // };

  const addContract = (key, value, index) => {
    console.log(key, value, index, 'in addContract');
    groupData[foundIndex].contracts[index] = {
      ...groupData[foundIndex].contracts[index],
      [key]: value,
    };

    updateModalState("groups", groupData);
  };

  const addNewContract = () => {
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      contracts: [
        ...(Array.isArray(data.contracts) ? data.contracts : []),
        {
          contractStartDate: "",
          contractEndDate: "",
          contractId: "",
          paymentStartDate: "",
          monthlyPayment: "",
        },
      ],
    };
    updateModalState("groups", groupData);
  };

  const removeContract = (index) => {
    const contracts = groupData[foundIndex].contracts.filter(
      (item, itemIndex) => itemIndex !== index
    );

    groupData[foundIndex] = {
      ...groupData[foundIndex],
      contracts,
    };
    updateModalState("groups", groupData);
  };

  const addGroupData = (key, value) => {
    groupData[foundIndex] = {
      ...groupData[foundIndex],
      [key]: value,
    };

    updateModalState("groups", groupData);
  };

  useEffect(() => {
    if (!data?.contracts || data?.contracts.length === 0) {
      addNewContract();
    }
  }, []);

  return (
    <li className="group-li">
      <div className="top">
        {index + 1}. {data?.group?.name}, {data?.group?.course?.name}
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => deleteItem(data.group._id)}
          />
        </div>
      </div>
      <Status
        formik={formik}
        setInputValue={setInputValue}
        data={data}
        addGroupData={addGroupData}
      />

      {/* <div className="input-couples">
        <InputField
          inputName={"contractStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"contractEndDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"paymentStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"contractId"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
        <InputField
          inputName={"oneLessonAmount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        />
      </div> */}
      {/* <PaymentType
        data={data}
        addPaymentType={addPaymentType}
        formik={formik}
      /> */}
      <div className="input-couples">
        {/* <DiscountReason
          data={data}
          addGroupData={addGroupData}
          formik={formik}
        />
        <InputField
          inputName={"discount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        /> */}
        {/* <InputField
          inputName={"amount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        /> */}
        {/* <InputField
          inputName={"paymentPart"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        /> */}
        {/* <InputField
          inputName={"totalAmount"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addGroupData={addGroupData}
        /> */}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
          borderBottom: "1px solid black",
        }}
      >
        <p> Müqavilələr, {data.group.name}</p>
        <FaPlus style={{ cursor: "pointer" }} onClick={addNewContract} />
      </div>
      {data?.contracts?.map((item, index) => (
        <Contracts
          key={index}
          index={index}
          setInputValue={setInputValue}
          data={item}
          addContract={addContract}
          formik={formik}
          removeContract={removeContract}
        />
      ))}
    </li>
  );
};

export default GroupInput;
