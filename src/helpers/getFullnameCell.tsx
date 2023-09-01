import React from "react";

function getFullnameCell(firstname: string, lastname: string) {
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

export default getFullnameCell;
