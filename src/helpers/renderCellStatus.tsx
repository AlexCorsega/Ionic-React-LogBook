import React from "react";

function renderCellStatus(status: boolean) {
  return (
    <div
      className={
        "rounded text-light px-1 " + `${status ? "bg-success" : "bg-danger"}`
      }
    >
      {status ? "Active" : "InActive"}
    </div>
  );
}

export default renderCellStatus;
