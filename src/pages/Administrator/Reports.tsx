import React from "react";
import AdminHeader from "../../components/Layout/AdminHeader";
import { IonContent } from "@ionic/react";
import { useLoading } from "../../context/useLoading";
import Loading from "../../components/Loading";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "My First Dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};
function Reports() {
  const loading = useLoading();
  return (
    <AdminHeader>
      <IonContent>
        <Loading isLoading={loading?.isLoading}>
          <Bar
            data={data}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </Loading>
      </IonContent>
    </AdminHeader>
  );
}

export default Reports;
