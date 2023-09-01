import React from "react";
import { useEffect, EffectCallback, DependencyList } from "react";

const useUpdateEffect = (
  effect: EffectCallback,
  deps?: DependencyList
): void => {
  const isInitialMount = React.useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // The effect won't run on the initial render
      isInitialMount.current = false;
    } else {
      // The effect will run on updates (excluding the initial render)
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
