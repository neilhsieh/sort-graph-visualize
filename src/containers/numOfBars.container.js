import { createContainer } from "unstated-next";
import { useState, useEffect } from "react";

export const NumberOfBars = createContainer(() => {
  const [numberOfBars, updateNumberOfBars] = useState();

  useEffect(() => {
    console.log(numberOfBars);
  }, [numberOfBars]);

  return { numberOfBars, updateNumberOfBars };
});
