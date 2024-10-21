import React, { useEffect, useState } from "react";
import SalaryMoreModal from "../../../../globalComponents/MoreModal/SalaryMoreModal/SalaryMoreModal";
import { useDispatch, useSelector } from "react-redux";
import { SALARY_MODAL_ACTION_TYPE } from "../../../../redux/actions-type";
import { TextField } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import { addSalaryAction } from "../../../../redux/actions/salaryActions";
import LoadingBtn from "../../../../globalComponents/Loading/components/LoadingBtn/LoadingBtn";

const SalaryCard = ({ salary, mode, cellNumber }) => {
  const [bonusEditModal, setBonusEditModal] = useState(false);
  const [salaryMoreModal, setSalaryMoreModal] = useState(false);
  const [openBonusModal, setOpenBonusModal] = useState(false);
  const [openSalaryModal, setOpenSalaryModal] = useState(false);
  const [paidData, setPaidData] = useState({
    teacher: salary.teacher,
    paid: salary?.paid || 0,
    date: salary.date,
  });
  const { salaryModalLoading } = useSelector((state) => state.salaryModal);

  const dispatch = useDispatch();

  const listData = [
    {
      key: "Əmək haqqı",
      value: salary?.salary
        ? `${salary?.salary?.value ? salary?.salary?.value : ""} ${
            salary?.salary?.hourly === true ? "(saatlıq)" : "(aylıq)"
          }`
        : "boş",
    },

    {
      key: "Toplam əmək haqqı",
      value: salary?.totalSalary,
    },
  ];

  const openConfirmModal = () => {
    dispatch({
      type: SALARY_MODAL_ACTION_TYPE.UPDATE_SALARY_PAYMENTS,
      payload: {
        data: salary,
        openModal: false,
        openConfirmModal: true,
      },
    });
  };

  const addSalary = () => {
    dispatch(addSalaryAction(paidData));
  };

  const addNewPaid = (value) => {
    console.log(value);
    const newPaid = value && Number(value) >= 0 && value;

    setPaidData((prev) => ({
      ...prev,
      paid: newPaid,
    }));
  };

  useEffect(() => {
    if (salaryMoreModal) {
      document.body.style.overflowY = "hidden";
    } else if (openBonusModal && window.innerWidth <= 1280) {
      document.body.style.overflowY = "hidden";
    } else if (bonusEditModal && window.innerWidth <= 1280) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [salaryMoreModal, openBonusModal, bonusEditModal]);

  const doubleClick = () => {
    // openConfirmModal();
  };

  useEffect(() => {
    setPaidData((prev) => ({ ...prev, paid: salary.paid }));
  }, [salary]);

  return (
    <>
      {mode === "desktop" ? (
        <>
          {openSalaryModal && (
            <SalaryMoreModal
              salary={salary}
              setOpenSalaryModal={setOpenSalaryModal}
            />
          )}

          <tr onDoubleClick={doubleClick}>
            <td>
              <div className="td-con">
                <div className="cell-number">{cellNumber}.</div>
                <div className="table-scroll-text">
                  {salary?.teacher.fullName}
                </div>
                <div className="right-fade"></div>
              </div>
            </td>
            <td>
              <div className="td-con">
                <div className="table-scroll-text no-wrap">
                  {salary?.totalSalary} AZN
                </div>
              </div>
            </td>
            <td>
              <div className="td-con">
                <div className="table-scroll-text no-wrap">
                  {salary?.rest} AZN
                </div>
              </div>
            </td>
            <td>
              <div className="td-con">
                <TextField
                  sx={{
                    "& input": {
                      fontSize: "16px",
                    },
                  }}
                  type="number"
                  value={paidData.paid}
                  onChange={(e) => addNewPaid(e.target.value)}
                />
              </div>
            </td>

            <td>
              <div className="td-con">
                <div
                  className="table-scroll-text no-wrap"
                  onClick={() => setOpenSalaryModal(true)}
                >
                  Ətraflı...
                </div>
              </div>
            </td>
            <td
              className="salary-check"
              style={{
                backgroundColor:
                  Number(salary?.rest) === 0 ? "rgb(212, 255, 191)" : "",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {(salary.teacher._id == salaryModalLoading && (
                  <LoadingBtn />
                )) || (
                  <FiPlus
                    style={{ height: "30px", width: "30px" }}
                    onClick={addSalary}
                  />
                )}
              </div>
              {/* <UpdateDeleteModal
                updateItem={updateItem}
                deleteItem={deleteItem}
                data={salary}
                openMoreModal={openMoreModal}
                openConfirmModal={openConfirmModal}
                profil={"salaries"}
              /> */}
            </td>
          </tr>
        </>
      ) : (
        <>
          {/* {salaryMoreModal && (
            <SalaryMoreModal
              setSalaryMoreModal={setSalaryMoreModal}
              setBonusEditModal={setBonusEditModal}
              salary={salary}
              setOpenBonusModal={setOpenBonusModal}
            />
          )} */}
          <div className="content-box">
            <div className="left">
              <h3>{salary?.teacherName}</h3>
              <ul>
                {listData.map((item, index) => (
                  <li key={index}>
                    <span className="type">{item.key}:</span>
                    <p>{item.value}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="right">
              <div
                onClick={() => setSalaryMoreModal(true)}
                className="salary-tablet-modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Icons/Line/Arrows/chevron-right">
                    <path
                      id="Icon"
                      d="M9 18L15 12L9 6"
                      stroke="#717171"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              </div>
            </div>
            {/* {openBonusModal && (
              <div className="salary-bonus-modal-tablet">
                <SalaryBonusModal
                  salary={salary}
                  setOpenBonusModal={setOpenBonusModal}
                  openBonusModal={openBonusModal}
                />
              </div>
            )} */}

            {/* {bonusEditModal && (
              <div className="salary-bonus-modal-tablet">
                <SalaryEditModal
                  salary={salary}
                  setBonusEditModal={setBonusEditModal}
                  bonusEditModal={bonusEditModal}
                />
              </div>
            )} */}
          </div>
        </>
      )}
    </>
  );
};

export default SalaryCard;
