import {
  IonButton,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import AxiosInstance from "../../Http/AxiosInstance";

interface Props {
  onChange: (employeeId: number) => void;
}
function EmployeesSelect({ onChange }: Props) {
  const [data, setData] = useState<any>();
  const [buttonText, setButtonText] = useState("All Employees");
  const [selectedEmployee, setSelectedEmployee] = useState<any>();
  const selectRef = useRef<HTMLIonSelectElement>(null);
  useEffect(() => {
    queryData();
  }, []);
  useIonViewWillEnter(() => {
    queryData();
  });
  async function queryData() {
    try {
      const response = await AxiosInstance().get("admin/employee/all");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  function onChangeEmployee(employeeId: any) {
    const employee = data.find((x: any) => x.id == employeeId);
    const fullname =
      employee == undefined
        ? "All Employees"
        : employee.firstname + " " + employee.lastname;
    setSelectedEmployee(employeeId);
    setButtonText((s) => fullname);
    onChange(employeeId);
  }
  return (
    <>
      <div className="spacing-x-2">
        <IonButton
          onClick={() => selectRef.current?.open()}
          color={selectedEmployee == "" ? "primary" : "light"}
        >
          {buttonText}
        </IonButton>
        <IonSelect
          label="Employees"
          hidden={true}
          ref={selectRef}
          className="d-none"
          onIonChange={(e) => onChangeEmployee(e.target.value)}
        >
          <IonSelectOption value={null}>All Employees</IonSelectOption>
          {data &&
            data.map((value: any) => {
              return (
                <IonSelectOption key={value.id} value={value.id}>
                  {value.firstname} {value.lastname}
                </IonSelectOption>
              );
            })}
        </IonSelect>
      </div>
    </>
  );
}
export default EmployeesSelect;
