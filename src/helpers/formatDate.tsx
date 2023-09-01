import React from "react";

function formatDate(timestamp: string | undefined) {
  if (timestamp == undefined) return timestamp;
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Manila",
  };
  const formattedDate = date.toLocaleString("en-PH", options);

  const formattedParts = formattedDate.split(", ");
  const [datePart, timePart] = formattedParts;
  const [month, day, year] = datePart.split("/");
  const [time, ampm] = timePart.split(" ");

  const formattedOutput = `${year}-${month}-${day} ${time} ${ampm}`;
  return formattedOutput;
}
export function getCurrentDate() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}T00:00:00`;

  return formattedDateTime;
}
export function getNextDayDate() {
  const now = new Date();
  now.setDate(now.getDate() + 1); // Add one day to the current date

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  const formattedDateTime = `${year}-${month}-${day}T00:00:00`;

  return formattedDateTime;
}

export default formatDate;
