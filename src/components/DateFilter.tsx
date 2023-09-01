import React, { useState } from "react";
import formatDate from "../helpers/formatDate";
import DateTimeButton from "./Buttons/DateTimeButton";
import { useIonViewWillEnter } from "@ionic/react";

interface Props {
  onFromDateSelected: (date: string) => void;
  onToDateSelected: (date: string) => void;
}
function DateFilter({ onFromDateSelected, onToDateSelected }: Props) {
  const [fromText, setFromText] = useState<string | undefined>("From Date");
  const [toText, setToText] = useState<string | undefined>("Select Date");
  useIonViewWillEnter(() => {
    setFromText("From Date");
    setToText("Select Date");
  });

  function onFromDateSelection(selectedDate: string) {
    onFromDateSelected(selectedDate);
    setFromText(selectedDate == "" ? "From Date" : formatDate(selectedDate));
  }
  function onToDateSelection(selectedDate: string) {
    onToDateSelected(selectedDate);
    setToText(selectedDate == "" ? "From Date" : formatDate(selectedDate));
  }
  return (
    <div className="flex justify-end align-center gap-2 mb-2">
      <DateTimeButton
        buttonText={fromText}
        onDateSelected={onFromDateSelection}
      />
      <p className="rounded bg-dark text-light p-1">To</p>
      <DateTimeButton buttonText={toText} onDateSelected={onToDateSelection} />
    </div>
  );
}

export default DateFilter;
