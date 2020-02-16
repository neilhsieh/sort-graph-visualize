import React from "react";
import PropTypes from "prop-types";
import SingleBar from "./singleBar.jsx";
import MoveBars from "./moveBars.jsx";
import "./graphDisplay.scss";
import moveBars from "./moveBars.js";

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      didSetState: false,
      barNumArray: [],
      numOfBars: 0,
      bar1ToMove: 0,
      bar2ToMove: 0
    };
    // this.listOfRandomizeArray = this.listOfRandomizeArray.bind(this);
    this.displayNum = this.displayNum.bind(this);
    this.calculateNumOfBars = this.calculateNumOfBars.bind(this);
    // this.moveBars = this.moveBars.bind(this);
    this.tempFunction = this.tempFunction.bind(this);
    this.resetAllLeft = this.resetAllLeft.bind(this);
  }

  componentDidMount() {
    // this.calculateNumOfBars();
    // console.log("Mount ", this.state.numOfBars);
    this.resetAllLeft();
  }

  componentDidUpdate(prevProps) {
    if (this.props.numOfBars !== prevProps.numOfBars) {
      this.setState({
        numOfBars: this.props.numOfBars,
        didSetState: true
      });
      this.calculateNumOfBars(this.props.numOfBars);
    }
  }
  // Display nums
  displayNum(num, keys) {
    return <div key={keys}>{num}</div>;
  }

  // Calculates each bar height
  calculateNumOfBars(selectedNumOfBars) {
    // const selectedNumOfBars = this.state.numOfBars;
    const barHeightDiff = Math.round(100 / selectedNumOfBars);
    let tempNumArray = [];
    for (let i = 100; i >= barHeightDiff; i -= barHeightDiff) {
      tempNumArray.push(i);
    }
    this.setState({ barNumArray: tempNumArray }, () => {
      this.resetAllLeft();
      // Set timeout ensures all left has been reset
      // preferably we an add show bars and animate so lengthen this process
      setTimeout(() => {
        this.tempFunction();
      }, 100);
    });
  }

  resetAllLeft() {
    document.querySelector(".bar-graph-display").classList.add("no-transition");
    const allBars = [...document.querySelectorAll(".single-bar")];
    allBars.forEach(bar => {
      bar.style.left = "0";
    });
  }

  // Update the number of bars it needs everytime the state updates, which is when animate is clicked
  updateBars() {
    const selectedNumOfBars = this.state.numOfBars;
    const graph = document.querySelector("#graph-container .bar-graph-display");
    if (graph && selectedNumOfBars !== 0) {
      graph.style.gridTemplateColumns = `repeat(${selectedNumOfBars}, 1fr [bar-height-row])`;
      return this.state.barNumArray.map((bar, i) => {
        return <SingleBar barLength={bar} barNum={bar} key={i} />;
      });
    }
  }

  tempFunction() {
    document
      .querySelector(".bar-graph-display")
      .classList.remove("no-transition");

    let totalBars = this.state.barNumArray.length - 1;
    let counter = 0;
    let count = Math.floor(this.state.barNumArray.length / 2);
    const numOfMoves = count;
    let nextBarsArray = this.state.barNumArray;
    // let bar1 = this.state.barNumArray[0];
    // let bar2 = nextBarsArray[nextBarsArray.length - 1];
    // nextBarsArray[0] = nextBarsArray[nextBarsArray.length - 1];
    // nextBarsArray[nextBarsArray.length - 1] = temp;
    const checkNextMove = () => {
      count -= 1;
      // let bar1 = this.state.barNumArray[0];
      // let bar2 = nextBarsArray[nextBarsArray.length - 1];
      let bar1 = this.state.barNumArray[counter];
      let bar2 = nextBarsArray[totalBars];
      console.log(bar1, bar2);
      counter += 1;
      totalBars -= 1;
      return { bar1, bar2 };
    };
    const waitMoveBars = async () => {
      let i = numOfMoves;

      while (i > 0) {
        const { bar1, bar2 } = checkNextMove();
        const isDone = await moveBars(bar1, bar2);
        i -= 1;
      }
      // const { bar1, bar2 } = checkNextMove();
      // const isDone = await moveBars(bar1, bar2);
    };

    waitMoveBars();
  }

  // Function should take two input bar points to swap places

  render() {
    return <div className="bar-graph-display">{this.updateBars()}</div>;
  }
}

GraphDisplay.propTypes = {
  numOfBars: PropTypes.number
};

export default GraphDisplay;
