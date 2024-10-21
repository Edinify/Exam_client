import { TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

export default function InputField({ formik, data, inputName, addGroupData }) {
  const [shrink, setShrink] = useState(false);
  const [totalAmountValue, setTotalAmountValue] = useState("");

  const inputData = [
    {
      inputName: "contractStartDate",
      label: "Müqavilə başlama tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        data[inputName] && inputName === "contractStartDate"
          ? moment(data[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "contractEndDate",
      label: "Müqavilə bitmə tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        data[inputName] && inputName === "contractEndDate"
          ? moment(data[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "oneLessonAmount",
      label: "1 dərsin qiyməti",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: data[inputName] || "",
    },
    {
      inputName: "totalAmount",
      label: "Yekun məbləğ",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: totalAmountValue || "0",
    },
    {
      inputName: "discount",
      label: "Endirim %",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: data[inputName] || "",
    },
    {
      inputName: "paymentStartDate",
      label: "Ödənişə başlama tarixi",
      type: "date",
      marginTop: "24px",
      marginBottom: "0",
      inputValue:
        data[inputName] && inputName === "paymentStartDate"
          ? moment(data[inputName]).format("YYYY-MM-DD")
          : "",
    },
    {
      inputName: "contractId",
      label: "Müqavilə nömrəsi",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: data[inputName] || "",
    },
    {
      inputName: "paymentPart",
      label: "Ödəniş hissəsi",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: data[inputName] || "",
    },
  ];

  useEffect(() => {
    setTotalAmountValue(() => {
      const amount = data.amount || 0;
      const discount = data.discount || 0;
      const result = +(amount - (amount * discount) / 100).toFixed(2);
      return result;
    });
  }, [data.amount, data.discount]);

  useEffect(() => {
    addGroupData("totalAmount", totalAmountValue);
  }, [totalAmountValue]);

  return (
    <div>
      <TextField
        sx={{
          "& input": {
            fontSize: "12px",
            paddingRight: inputData.find((item) => item.inputName === inputName)
              ?.paddingRight,
          },
          marginTop:
            inputData.find((item) => item.inputName === inputName)?.marginTop ||
            "0",
        }}
        InputLabelProps={{
          shrink:
            inputData.find((item) => item.inputName === inputName)?.type ===
            "date"
              ? true
              : inputData.find((item) => item.inputName === inputName)
                  ?.inputValue
              ? true
              : shrink,
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              ?.marginBottom,
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
        disabled={inputName === "totalAmount"}
        onWheel={(e) => e.target.blur()}
        onChange={(e) => {
          addGroupData(inputName, e.target.value);
        }}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {formik.errors[inputName] && formik.touched[inputName] && (
        <small className="validation-err-message">
          {formik.errors[inputName]}
        </small>
      )}
    </div>
  );
}
