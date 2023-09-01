import React from "react";
import { USERACCOUNTSTATUS } from "../constants/userAccountStatus";

function renderCellUserStatus(
  status: string,
  textSize?: string,
  classname?: string
) {
  return (
    <>
      {status == USERACCOUNTSTATUS.PENDING && (
        <div
          className={`rounded text-light px-1 bg-warning fs-${textSize} ${classname}`}
        >
          Pending
        </div>
      )}
      {status == USERACCOUNTSTATUS.ACCEPTED && (
        <div
          className={`rounded text-light px-1 bg-success fs-${textSize} ${classname}`}
        >
          {status}
        </div>
      )}
      {status == USERACCOUNTSTATUS.DENIED && (
        <div
          className={`rounded text-light px-1 bg-danger fs-${textSize} ${classname}`}
        >
          {status}
        </div>
      )}
    </>
  );
}

export default renderCellUserStatus;
