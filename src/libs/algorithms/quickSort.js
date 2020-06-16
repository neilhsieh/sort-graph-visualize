// const testRand = [ 60, 35, 84, 92, 23,  9, 57, 70, 55, 75,  8, 68, 9, 93, 90, 68, 75,  4, 17, 69]
// const testRand = [ 5,10,15,7,1,22,17]

// console.log("Sort", testRand)
let numSteps = 0;

const quickSort = async (array, func) => {
  const arrOfDOMBars = [...array];
  const arrOfBarsVal = arrOfDOMBars.map((bar) => {
    return parseInt(bar.getAttribute("data-value"));
  });

  console.log(arrOfBarsVal);

  const partition = async (lo, hi, arr) => {
    const pivotInd = hi;
    let loCheckInd = lo;
    let hiCheckInd = pivotInd - 1;
    numSteps += 1;

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
            // console.log(arr[hiCheckInd]);
            console.log("switch");
            // await func(arr[hiCheckInd], arr[loCheckInd]);

            const tempHolder = arr[hiCheckInd];
            arr[hiCheckInd] = arr[loCheckInd];
            arr[loCheckInd] = tempHolder;

            loCheckInd += 1;
            hiCheckInd -= 1;
          }
        }
      }
      let newPiv;

      if (arr[hiCheckInd] < arr[pivotInd]) {
        console.log("switch 2");

        // await func(arr[hiCheckInd + 1], arr[pivotInd]);

        const tempHolder = arr[hiCheckInd + 1];
        arr[hiCheckInd + 1] = arr[pivotInd];
        arr[pivotInd] = tempHolder;
        newPiv = hiCheckInd + 1;
      } else {
        console.log("switch 3");

        // await func(arr[hiCheckInd], arr[pivotInd]);

        const tempHolder = arr[hiCheckInd];
        arr[hiCheckInd] = arr[pivotInd];
        arr[pivotInd] = tempHolder;
        newPiv = hiCheckInd;
      }

      const leftArr = arr.slice(0, newPiv);
      const rightArr = arr.slice(newPiv + 1, arr.length);
      let newRightPart;
      let newLeftPart;
      let joinedArr;

      if (leftArr.length === 0 && rightArr.length >= 1) {
        newRightPart = await partition(0, rightArr.length - 1, rightArr);
        joinedArr = [...[arr[newPiv]], ...newRightPart];
      } else if (leftArr.length >= 1 && rightArr.length === 0) {
        newLeftPart = await partition(0, leftArr.length - 1, leftArr);
        joinedArr = [...newLeftPart, ...[arr[newPiv]]];
      } else {
        newLeftPart = await partition(0, leftArr.length - 1, leftArr);
        newRightPart = await partition(0, rightArr.length - 1, rightArr);
        joinedArr = [...newLeftPart, ...[arr[newPiv]], ...newRightPart];
      }
      return joinedArr;
    } else {
      return arr;
    }
  };
  const initBars = [...arrOfBarsVal];
  console.log(initBars);
  const final = await partition(0, arrOfBarsVal.length - 1, arrOfBarsVal);
  console.log(final);
};

export { quickSort };
