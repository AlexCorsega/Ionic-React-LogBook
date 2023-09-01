import React, { useEffect, useRef } from "react";

function useUnmount(callback: () => void) {
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    return () => {
      callback();
    };
  });
}

export default useUnmount;
