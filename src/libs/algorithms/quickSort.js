const waitTime = 2000;

// Helper Function
const removePivotClass = () => {
  const pivot = document.querySelector(".single-bars-container .pivot");
  if (pivot) {
    pivot.classList.remove("pivot");
  }
};

const waitTimer = () => {
  // console.log("waiting...");
  // const start = new Date().getTime();
  // let counter = 0;
  // while (new Date().getTime() - start < waitTime) {
  //   counter += 1;
  // }
};
const clearActiveBars = () => {
  const active = [
    ...document.querySelectorAll(".single-bars-container .active-bar"),
  ];
  if (active) {
    active.forEach((bar) => {
      bar.classList.remove("active-bar");
    });
  }
};

const setActiveBars = (arr) => {
  if (arr) {
    arr.forEach((bar) => {
      bar.classList.add("active-bar");
    });
  }
};

const dumbPauseFunc = () => {
  let counter = 0;
  while (!window.testNextBool) {
    counter += 1;
    setTimeout(() => {
      return;
    }, 200);
  }
};
const quickSort = async (array, func) => {
  const arrOfDOMBars = [...array];
  const arrOfBarsVal = arrOfDOMBars.map((bar) => {
    return parseInt(bar.getAttribute("data-value"));
  });

  const partition = async (lo, hi, arr, domArr) => {
    // dumbPauseFunc();

    const pivotInd = hi;
    let loCheckInd = lo;
    let hiCheckInd = pivotInd - 1;

    removePivotClass();
    domArr[pivotInd].classList.add("pivot");

    clearActiveBars();
    setActiveBars(domArr);

    if (arr.length > 1) {
      while (hiCheckInd > loCheckInd) {
        if (arr[loCheckInd] < arr[pivotInd]) {
          if (arr[hiCheckInd] >= arr[pivotInd]) {
            hiCheckInd -= 1;
            loCheckInd += 1;
          } else if (arr[hiCheckInd] < arr[pivotInd]) {
            loCheckInd += 1;
          }
        } else {
          if (arr[hiCheckInd] >= arr[pivotInd]) {
            hiCheckInd -= 1;
          } else {
            await func(domArr[hiCheckInd], domArr[loCheckInd]);
            waitTimer();
            let tempHolder = arr[hiCheckInd];
            arr[hiCheckInd] = arr[loCheckInd];
            arr[loCheckInd] = tempHolder;

            let domTempHolder = domArr[hiCheckInd];
            domArr[hiCheckInd] = domArr[loCheckInd];
            domArr[loCheckInd] = domTempHolder;

            loCheckInd += 1;
            hiCheckInd -= 1;
          }
        }
      }
      let newPiv;

      if (arr[hiCheckInd] < arr[pivotInd]) {
        let moveIndex = hiCheckInd + 1;
        await func(domArr[moveIndex], domArr[pivotInd]);
        waitTimer();

        // console.log(
        //   "switch 2",
        //   arr[hiCheckInd + 1],
        //   arr[pivotInd],
        //   domArr[hiCheckInd + 1].getAttribute("data-value"),
        //   domArr[pivotInd].getAttribute("data-value")
        // );

        let tempHolder = arr[hiCheckInd + 1];
        arr[hiCheckInd + 1] = arr[pivotInd];
        arr[pivotInd] = tempHolder;

        let domTempHolder = domArr[hiCheckInd + 1];
        domArr[hiCheckInd + 1] = domArr[pivotInd];
        domArr[pivotInd] = domTempHolder;

        newPiv = hiCheckInd + 1;
      } else {
        await func(domArr[hiCheckInd], domArr[pivotInd]);
        waitTimer();

        // console.log(
        //   "switch 3",
        //   arr[hiCheckInd],
        //   arr[pivotInd],
        //   domArr[hiCheckInd].getAttribute("data-value"),
        //   domArr[pivotInd].getAttribute("data-value")
        // );

        let tempHolder = arr[hiCheckInd];
        arr[hiCheckInd] = arr[pivotInd];
        arr[pivotInd] = tempHolder;

        let domTempHolder = domArr[hiCheckInd];
        domArr[hiCheckInd] = domArr[pivotInd];
        domArr[pivotInd] = domTempHolder;

        newPiv = hiCheckInd;
      }

      const leftArr = arr.slice(0, newPiv);
      const leftDomArr = domArr.slice(0, newPiv);
      const rightArr = arr.slice(newPiv + 1, arr.length);
      const rightDomArr = domArr.slice(newPiv + 1, domArr.length);
      let newRightPart;
      let newLeftPart;
      let joinedArr;

      if (leftArr.length === 0 && rightArr.length >= 1) {
        // console.log("--- in first");

        newRightPart = await partition(
          0,
          rightArr.length - 1,
          rightArr,
          rightDomArr
        );
        joinedArr = [...[arr[newPiv]], ...newRightPart];
      } else if (leftArr.length >= 1 && rightArr.length === 0) {
        // console.log("--- in first else");

        newLeftPart = await partition(
          0,
          leftArr.length - 1,
          leftArr,
          leftDomArr
        );
        joinedArr = [...newLeftPart, ...[arr[newPiv]]];
      } else {
        // console.log("--- in second");

        newLeftPart = await partition(
          0,
          leftArr.length - 1,
          leftArr,
          leftDomArr
        );
        newRightPart = await partition(
          0,
          rightArr.length - 1,
          rightArr,
          rightDomArr
        );
        joinedArr = [...newLeftPart, ...[arr[newPiv]], ...newRightPart];
      }
      return joinedArr;
    } else {
      // console.log("--- retunred");
      return arr;
    }
  };
  const initBars = [...arrOfBarsVal];
  console.log(initBars, arrOfDOMBars);
  if (arrOfDOMBars.length > 0) {
    await partition(0, arrOfBarsVal.length - 1, arrOfBarsVal, arrOfDOMBars);
  }
};

export { quickSort };
