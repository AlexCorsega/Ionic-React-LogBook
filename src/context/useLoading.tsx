import React, { Children, createContext, useContext, useState } from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext<{
  isPageLoading: boolean;
  isLoading: boolean;
  loaded: () => void;
  setLoading: () => void;
  pageLoaded: () => void;
  setPageLoading: () => void;
} | null>(null);
export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const loaded = () => {
    setIsLoading(false);
  };
  const setLoading = () => {
    setIsLoading(true);
  };
  const pageLoaded = () => {
    setIsPageLoading(false);
  };
  const setPageLoading = () => {
    setIsPageLoading(true);
  };
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        isPageLoading,
        loaded,
        pageLoaded,
        setPageLoading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
