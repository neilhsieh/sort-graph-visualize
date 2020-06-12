import { createContainer } from "unstated-next";
import { useState } from "react";

export const NumberOfBars = createContainer(() => {
  const [numberOfBars, updateNumberOfBars] = useState();
  const [algo, updateAlgo] = useState();
  const [animate, updateAnimate] = useState(false);

  return {
    numberOfBars,
    algo,
    animate,
    updateNumberOfBars,
    updateAlgo,
    updateAnimate,
  };
});
