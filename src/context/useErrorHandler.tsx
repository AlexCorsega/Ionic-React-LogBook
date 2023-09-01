import React, { Children, createContext, useContext, useState } from "react";

const ErrorContext = createContext<{
  hasError: boolean;
  errorMessage: string;
  isErrorShown: boolean;
  setErrorMessage: (message: string) => void;
  revertErrorShow: (value: boolean) => void;
} | null>(null);
export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMsg] = useState("");
  const [isErrorShown, setIsErrorShown] = useState(false);
  function setErrorMessage(message: string) {
    setHasError((s) => true);
    setErrorMsg((s) => message);
  }
  function revertErrorShow(value: boolean) {
    setHasError((s) => false);
    setIsErrorShown((s) => false);
  }

  return (
    <ErrorContext.Provider
      value={{
        hasError,
        errorMessage,
        isErrorShown,
        setErrorMessage,
        revertErrorShow,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrorHandler = () => {
  return useContext(ErrorContext);
};
