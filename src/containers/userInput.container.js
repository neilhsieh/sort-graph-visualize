import { createContainer } from "unstated-next";
import { useState } from "react";

export const NumberOfBars = createContainer(() => {
  const [numberOfBars, updateNumberOfBars] = useState();
  const [algo, updateAlgo] = useState();
  const [animate, updateAnimate] = useState(false);

  const [testNext, updateTestNext] = useState(false);

  // const changeWindow = () => {
  //   window.testNextBool = testNext;
  // }
  return {
    numberOfBars,
    algo,
    animate,
    testNext,
    updateNumberOfBars,
    updateAlgo,
    updateAnimate,
    updateTestNext,
  };
});
