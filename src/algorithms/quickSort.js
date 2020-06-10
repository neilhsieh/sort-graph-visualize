// const testRand = [ 60, 35, 84, 92, 23,  9, 57, 70, 55, 75,  8, 68, 9, 93, 90, 68, 75,  4, 17, 69]
// const testRand = [ 5,10,15,7,1,22,17]

// console.log("Sort", testRand)
let numSteps = 0;

const quickSort = (array) => {
  const partition = (lo, hi, arr) => {
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
        const tempHolder = arr[hiCheckInd + 1];
        arr[hiCheckInd + 1] = arr[pivotInd];
        arr[pivotInd] = tempHolder;
        newPiv = hiCheckInd + 1;
      } else {
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
        newRightPart = partition(0, rightArr.length - 1, rightArr);
        joinedArr = [...[arr[newPiv]], ...newRightPart];
      } else if (leftArr.length >= 1 && rightArr.length === 0) {
        newLeftPart = partition(0, leftArr.length - 1, leftArr);
        joinedArr = [...newLeftPart, ...[arr[newPiv]]];
      } else {
        newLeftPart = partition(0, leftArr.length - 1, leftArr);
        newRightPart = partition(0, rightArr.length - 1, rightArr);
        joinedArr = [...newLeftPart, ...[arr[newPiv]], ...newRightPart];
      }
      return joinedArr;
    } else {
      return arr;
    }
  };

  const sorted = partition(0, array.length - 1, array);
  console.log("final", numSteps, sorted);
  let defaultSortNum = 0;
  array.sort((a, b) => {
    defaultSortNum += 1;
    return a - b;
  });
  console.log(defaultSortNum);
};

// quickSort();

export { quickSort };
