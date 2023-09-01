import { useState, useEffect } from "react";

export default function useGetDate(format: string) {
  const formattedDate = "";

  const getCurrentDate = () => {
    const currentDate = new Date();

    const minutes = currentDate.getMinutes();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const year = currentDate.getFullYear().toString();
    const time = `${currentDate.getHours()}:${
      minutes.toString().length == 1 ? "0" + minutes : minutes
    }`;
    const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

    let finalFormat: string = format
      .replace("mm", month)
      .replace("dd", day)
      .replace("yyyy", year);
    return finalFormat + " " + time + " " + ampm;
  };
  return getCurrentDate();
}
