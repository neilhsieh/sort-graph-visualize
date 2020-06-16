import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import SingleBar from "./singleBar.jsx";
import moveBars from "./moveBars.js";
import "./graphDisplay.scss";
// import moveBars from "./moveBars.js";
import { NumberOfBars } from "../containers/userInput.container.js";
import { quickSort } from "../libs/algorithms/quickSort.js";

// function resolveAfter2Seconds() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("resolved");
//     }, 2000);
//   });
// }

export const GraphDisplay = () => {
  const [didSetState, updateDidSetState] = useState(false);
  const [barNumArray, udpateBarNumArray] = useState([]);
  const [barsArray, updateBarsArray] = useState([]);
  // const [numOfBars, updateNumOfBars] = useState(0);
  const [bar1ToMove, updateBar1ToMove] = useState(0);
  const [bar2ToMove, updateBar2ToMove] = useState(0);
  const [animateNow, updateAnimateNow] = useState(false);
  const [numsReady, updateNumsReady] = useState(false);

  const { numberOfBars, animate } = NumberOfBars.useContainer();

  /* Listeing to Number of Bars button click */
  useEffect(() => {
    setBars(numberOfBars);
  }, [numberOfBars]);

  useEffect(() => {
    setArrayOfBars();
    console.log("update");
  }, [barNumArray]);

  /* --- Listening to Animate Button Click --- */
  useEffect(() => {
    console.log("animate btn clicked");
    /* 
    1. Grab all bars and set array of document query selectors
    2. Move them
    */
    // setArrayOfBars();
    animateBars();
  }, [animate]);

  // const tempFunction = () => {
  //   document
  //     .querySelector(".bar-graph-display")
  //     .classList.remove("no-transition");

  //   let totalBars = this.state.barNumArray.length - 1;
  //   let counter = 0;
  //   let count = Math.floor(this.state.barNumArray.length / 2);
  //   const numOfMoves = count;
  //   const nextBarsArray = this.state.barNumArray;
  //   // console.log("next bars array", nextBarsArray);

  //   const checkNextMove = (barArray) => {
  //     const barArr = barArray;
  //     count -= 1;
  //     let bar1 = barArr[counter];
  //     let bar2 = barArr[totalBars];
  //     counter += 1;
  //     totalBars -= 1;
  //     // console.log(nextBarsArray, bar1, bar2);

  //     return { bar1, bar2 };
  //   };
  //   // if (this.props.animateNow) {
  //   const waitMoveBars = async (nextBarsArray) => {
  //     const barArray = nextBarsArray;
  //     let i = numOfMoves;
  //     console.log("START WAIT MOVE BAR");
  //     while (i > 0) {
  //       console.log("WHILE", barArray.length);

  //       const { bar1, bar2 } = checkNextMove(barArray);
  //       console.log("in wait", bar1, bar2);
  //       await moveBars(bar1, bar2);
  //       i -= 1;
  //     }
  //   };

  //   waitMoveBars(nextBarsArray);
  //   // }
  // };

  const animateBars = async () => {
    document
      .querySelector(".bar-graph-display")
      .classList.remove("no-transition");
    // const first = barsArray[0];
    // const second = barsArray[barsArray.length - 1];

    // moveBars(first, second);

    quickSort(barsArray, moveBars);
  };

  const setArrayOfBars = () => {
    const tempArray = [
      ...document.querySelectorAll(".single-bars-container > .single-bar"),
    ].map((bar) => {
      return bar;
    });
    updateBarsArray(tempArray);
  };

  const randomizeArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const setBars = (barNum) => {
    const barHeightDiff = Math.round(100 / barNum);

    let tempNumArray = [];
    for (let i = 0; i < barNum; i++) {
      tempNumArray.push(barHeightDiff * (i + 1));
    }
    randomizeArray(tempNumArray);
    udpateBarNumArray(tempNumArray);
  };

  return (
    <div className="bar-graph-display">
      {barNumArray === [] ? (
        <div className="graph-loading-text">Select bars</div>
      ) : (
        <div className="single-bars-container">
          {barNumArray.map((bar, i) => {
            return <SingleBar barLength={bar} barNum={bar} key={i} />;
          })}
        </div>
      )}
    </div>
  );
};

// class GraphDisplay extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       didSetState: false,
//       barNumArray: [],
//       numOfBars: 0,
//       bar1ToMove: 0,
//       bar2ToMove: 0,
//       animateNow: false,
//       numsReady: false,
//     };
//     // this.listOfRandomizeArray = this.listOfRandomizeArray.bind(this);
//     this.displayNum = this.displayNum.bind(this);
//     this.calculateNumOfBars = this.calculateNumOfBars.bind(this);
//     // this.moveBars = this.moveBars.bind(this);
//     this.tempFunction = this.tempFunction.bind(this);
//     this.resetGraph = this.resetGraph.bind(this);
//     this.shuffleArray = this.shuffleArray.bind(this);
//   }

//   componentDidMount() {
//     // this.resetGraph();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // console.log("props update", this.props.numOfBars, this.state.barNumArray);
//     console.log("-- COMPONENT UPDATED --");

//     if (this.props.numOfBars !== prevProps.numOfBars) {
//       console.log("bars btn clicked");
//       setTimeout(() => {
//         this.setState({
//           numOfBars: this.props.numOfBars,
//           numBtnClicked: true,
//         });
//       }, 0);

//       this.calculateNumOfBars(this.props.numOfBars);
//       // }
//     }
//     if (prevState.animateNow !== this.props.animateNow) {
//       console.log("animate btn clicked");

//       this.setState({
//         animateNow: this.props.animateNow,
//       });
//     }
//     if (this.state.numsReady && this.state.animateNow) {
//       console.log("calling temp function: ", this.state.barNumArray);

//       this.tempFunction();
//     }
//   }
//   // Display nums
//   displayNum(num, keys) {
//     return <div key={keys}>{num}</div>;
//   }

//   // Calculates each bar height
//   calculateNumOfBars(selectedNumOfBars) {
//     // const selectedNumOfBars = this.state.numOfBars;
//     const barHeightDiff = Math.round(100 / selectedNumOfBars);
//     let tempNumArray = [];
//     for (let i = 100; i >= barHeightDiff; i -= barHeightDiff) {
//       tempNumArray.push(i);
//     }
//     this.setState({ barNumArray: tempNumArray }, () => {
//       this.resetGraph();
//       // Set timeout ensures all left has been reset
//       // preferably we an add show bars and animate so lengthen this process
//       this.setState({
//         numsReady: true,
//       });
//     });
//   }

//   resetGraph() {
//     document.querySelector(".bar-graph-display").classList.add("no-transition");
//     const allBars = [...document.querySelectorAll(".single-bar")];
//     allBars.forEach((bar) => {
//       bar.style.left = "0";
//       bar.classList.remove("bar-moving");
//     });
//   }

//   shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//   }

//   // Update the number of bars it needs everytime the state updates, which is when animate is clicked
//   updateBars() {
//     console.log(this.state.numOfBars, this.props.numOfBars);

//     if (!this.state.numBtnClicked) return;

//     const selectedNumOfBars = this.state.numOfBars;
//     const graph = document.querySelector("#graph-container .bar-graph-display");
//     if (graph && selectedNumOfBars !== 0) {
//       graph.style.gridTemplateColumns = `repeat(${selectedNumOfBars}, 1fr [bar-height-row])`;
//       const barsList = this.state.barNumArray.map((bar, i) => {
//         return <SingleBar barLength={bar} barNum={bar} key={i} />;
//       });
//       this.shuffleArray(barsList);
//       this.setState({ numBtnClicked: false });
//       return barsList;
//     }
//   }

//   tempFunction() {
//     document
//       .querySelector(".bar-graph-display")
//       .classList.remove("no-transition");

//     let totalBars = this.state.barNumArray.length - 1;
//     let counter = 0;
//     let count = Math.floor(this.state.barNumArray.length / 2);
//     const numOfMoves = count;
//     const nextBarsArray = this.state.barNumArray;
//     // console.log("next bars array", nextBarsArray);

//     const checkNextMove = (barArray) => {
//       const barArr = barArray;
//       count -= 1;
//       let bar1 = barArr[counter];
//       let bar2 = barArr[totalBars];
//       counter += 1;
//       totalBars -= 1;
//       // console.log(nextBarsArray, bar1, bar2);

//       return { bar1, bar2 };
//     };
//     // if (this.props.animateNow) {
//     const waitMoveBars = async (nextBarsArray) => {
//       const barArray = nextBarsArray;
//       let i = numOfMoves;
//       console.log("START WAIT MOVE BAR");
//       while (i > 0) {
//         console.log("WHILE", barArray.length);

//         const { bar1, bar2 } = checkNextMove(barArray);
//         console.log("in wait", bar1, bar2);
//         await moveBars(bar1, bar2);
//         i -= 1;
//       }
//     };

//     waitMoveBars(nextBarsArray);
//     // }
//   }

//   // Function should take two input bar points to swap places

//   render() {
//     return (
//       <div className="bar-graph-display">
//         {this.state.numOfBars === 0 ? (
//           <div className="graph-loading-text">Select bars</div>
//         ) : (
//           this.updateBars()
//         )}
//       </div>
//     );
//   }
// }

// GraphDisplay.propTypes = {
//   numOfBars: PropTypes.number,
//   animateNow: PropTypes.bool,
// };

// export default GraphDisplay;
