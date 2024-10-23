import { TextField } from "@mui/material";
import moment from "moment";
import { useState } from "react";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import az from "date-fns/locale/az";

export default function InputField({
  formik,
  modalData,
  inputName,
  updateModalState,
  setInputValue,
}) {
  const [shrink, setShrink] = useState(false);
  registerLocale("az", az);

  const renderDatePicker = (dateName, label) => (
    <div className="render-datepicker">
      <label>{label}</label>
      <DatePicker
        selected={modalData[dateName] ? new Date(modalData[dateName]) : null}
        onChange={(date) => updateModalState(dateName, date)}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        locale="az"
        disabled={modalData?._id ? true : false}
      />
    </div>
  );

  const inputData = [
    {
      inputName: "name",
      label: "İmtahan adı",
      type: "text",
      marginTop: "0",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      required: true,
    },

    {
      inputName: "date",
      label: "Tarix seçin",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        modalData[inputName] && inputName === "date"
          ? moment(modalData[inputName]).format("YYYY-MM-DD")
          : "",
      className: "birthday-input",
      disabled: true,
    },
    {
      inputName: "startTime",
      label: "Başlama saatı",
      type: "time",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      className: "exam-time-input",
      disabled: true,
    },
    {
      inputName: "endTime",
      label: "Bitmə saatı",
      type: "time",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: modalData[inputName] || "",
      className: "exam-time-input",
      disabled: true,
    },
  ];

  return (
    <div
      className={
        inputData.find((item) => item.inputName === inputName).className
      }
    >
      {inputName === "date" ? (
        renderDatePicker(inputName, "Tarix seçin")
      ) : (
        <TextField
          sx={{
            "& input": {
              fontSize: "12px",
              paddingRight: inputData.find(
                (item) => item.inputName === inputName
              )?.paddingRight,
            },
            marginTop:
              inputData.find((item) => item.inputName === inputName)
                ?.marginTop || "0",

            "& .MuiInputLabel-root.Mui-required:after": {
              content: '" *"',
              color: "red",
              fontSize: "12px",
            },
          }}
          InputLabelProps={{
            shrink:
              inputData.find((item) => item.inputName === inputName)?.type ===
                "date" ||
              inputData.find((item) => item.inputName === inputName)?.type ===
                "time"
                ? true
                : inputData.find((item) => item.inputName === inputName)
                    ?.inputValue
                ? true
                : shrink,
            style: {
              fontSize: "12px",
              color: "#3F3F3F",
              marginBottom: inputData.find(
                (item) => item.inputName === inputName
              )?.marginBottom,
            },
          }}
          fullWidth
          id={inputName}
          name={inputName}
          type={inputData.find((item) => item.inputName === inputName)?.type}
          label={inputData.find((item) => item.inputName === inputName)?.label}
          value={
            inputData.find((item) => item.inputName === inputName)?.inputValue
          }
          required={
            inputData.find((item) => item.inputName === inputName)?.required
          }
          onWheel={(e) => e.target.blur()}
          onChange={(e) => {
            updateModalState(inputName, e.target.value);
            setInputValue(inputName, e.target.value);
          }}
          disabled={
            inputData.find((item) => item.inputName === inputName).disabled &&
            modalData?._id
          }
        />
      )}

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
