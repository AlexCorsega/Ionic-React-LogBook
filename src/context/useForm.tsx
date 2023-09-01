import React, { Children, createContext, useContext, useState } from "react";

const FormContext = createContext<{
  isSubmitClick: boolean;
  submit: () => void;
  revert: () => void;
} | null>(null);
export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  const submit = () => {
    setIsSubmitClick(true);
  };
  const revert = () => {
    setIsSubmitClick(false);
  };

  return (
    <FormContext.Provider value={{ isSubmitClick, submit, revert }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  return useContext(FormContext);
};
