import { IonButton, IonButtons } from "@ionic/react";
import React, { useState } from "react";
interface Props {
  currentPage: number;
  totalDataCount: number;
  dataCountPerPage: number;
  className: string;
  onPageClick: (pagenumber: number) => any;
}
function Pagination({
  currentPage,
  totalDataCount,
  dataCountPerPage,
  className,
  onPageClick,
}: Props) {
  const calculatePagination = totalDataCount / dataCountPerPage;

  function onPageClicked(number: number) {
    onPageClick(number);
  }
  function loopPagination() {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < calculatePagination; i++) {
      const length = i + 1;
      arr.push(
        <IonButton
          key={length}
          color="tertiary"
          fill={currentPage == length ? "solid" : "clear"}
          size="large"
          onClick={() => onPageClicked(length)}
        >
          {length}
        </IonButton>
      );
    }
    return arr;
  }
  return <IonButtons className={className}>{loopPagination()}</IonButtons>;
}
export default Pagination;
