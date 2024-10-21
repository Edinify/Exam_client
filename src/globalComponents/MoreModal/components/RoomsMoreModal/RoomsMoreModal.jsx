import React from "react";

const RoomsMoreModal = ({ data }) => {
  console.log(data, "Dataaa");

  const groupName =
    Array.isArray(data?.groups) && data?.groups.length > 0
      ? data?.groups
          .map((group) => {
            return group.group.name;
          })
          .join(",")
      : "";

  return (
    <>
      <div className="more-modal-work-inform">
        <div className="work-inform-con">
          <h3>
            Otaq adı: <span>{data?.name || ""}</span>
          </h3>
          <h3>
            Qrup adı: <span>{groupName}</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default RoomsMoreModal;
