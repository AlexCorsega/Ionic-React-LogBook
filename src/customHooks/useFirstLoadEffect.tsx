import React from "react";
import { useEffect, EffectCallback, DependencyList } from "react";

const useFirstLoadEfect = (
  effect: EffectCallback,
  deps?: DependencyList
): void => {
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return effect();
    }
  }, deps);
};

export default useFirstLoadEfect;
