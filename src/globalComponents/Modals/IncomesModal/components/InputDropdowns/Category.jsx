import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useCustomHook } from "../../../../GlobalFunctions/globalFunctions";
import DropdownIcon from "../../../components/DropdownIcon/DropdownIcon";

const Category = ({  modalData, updateModalState}) => {
    const {selectedIncomeCategoryList} = useCustomHook()
  const inputValue = selectedIncomeCategoryList.find((item) => item.key === modalData.category)?.name || "";

  const [openDropdown, setOpenDropdown] = useState(false);
  const addData = (item) => {
    updateModalState("category", item)
    setOpenDropdown(false)
  };

  return (
    <>
      <div className="class-input">
        <div className="dropdown-input">
          <div className="input-box">
            <TextField
              sx={{
                "& input": {
                  fontSize: "12px",
                  marginRight: "32px",
                },
                marginTop: "24px",
                // marginBottom: "24px",
              }}
              InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
              }}
              fullWidth
              label=" Kateqoriya?"
              autoComplete="off"
              disabled
              value={inputValue}
            />
           <DropdownIcon
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            />
          </div>

          <ul
            className={`dropdown-body where-coming ${
              openDropdown ? "active" : ""
            }`}
          >
            {selectedIncomeCategoryList.map((item) => (
              <li key={item.key} onClick={() => addData(item.key)}>
                <h4>{item.name}</h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
     
    </>
  );
};

export default Category;
