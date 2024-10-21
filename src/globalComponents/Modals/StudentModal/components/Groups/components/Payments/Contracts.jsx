import Contract from "./Contract";
import { ReactComponent as MinusIcon } from "../../../../../../../assets/icons/minus-cirlce.svg";

const Contracts = ({
  formik,
  setInputValue,
  data,
  addContract,
  removeContract,
  index,
}) => {
  return (
    <div style={{ padding: "20px 0" }}>
      <div className="top">
        {index + 1}.Müqavilə
        <div className="minus-icon-con">
          <MinusIcon
            className="minus-icon"
            onClick={() => removeContract(index)}
          />
        </div>
      </div>
      <div className="input-couples">
        <Contract
          inputName={"contractStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addContract={addContract}
          index={index}
        />
        <Contract
          inputName={"contractEndDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addContract={addContract}
          index={index}
        />
        <Contract
          inputName={"paymentStartDate"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addContract={addContract}
          index={index}
        />
        {/* <Contract
          inputName={"contractId"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addContract={addContract}
          index={index}
        /> */}
        <Contract
          inputName={"monthlyPayment"}
          formik={formik}
          setInputValue={setInputValue}
          data={data}
          addContract={addContract}
          index={index}
        />
      </div>
      <hr />
    </div>
  );
};

export default Contracts;
