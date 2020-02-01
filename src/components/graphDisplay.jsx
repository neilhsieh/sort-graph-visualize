import React from "react";
import PropTypes from "prop-types";
import SingleBar from "./singleBar.jsx";
import MoveBars from "./moveBars.jsx";
import "./graphDisplay.scss";

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
    this.moveBars = this.moveBars.bind(this);
    this.tempFunction = this.tempFunction.bind(this);
  }

  componentDidMount() {
    // this.calculateNumOfBars();
    // console.log("Mount ", this.state.numOfBars);
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

  // Function to output user specified number of bars
  calculateNumOfBars(selectedNumOfBars) {
    // const selectedNumOfBars = this.state.numOfBars;
    const barHeightDiff = Math.round(100 / selectedNumOfBars);
    let tempNumArray = [];
    for (let i = 100; i >= barHeightDiff; i -= barHeightDiff) {
      tempNumArray.push(i);
    }
    this.setState({ barNumArray: tempNumArray }, () => {
      this.tempFunction();
    });
  }

  updateBars() {
    const selectedNumOfBars = this.state.numOfBars;
    const graph = document.querySelector("#graph-container .bar-graph-display");
    if (graph && selectedNumOfBars !== 0) {
      // if (this.state.didSetState) {
      graph.style.gridTemplateColumns = `repeat(${selectedNumOfBars}, 1fr [bar-height-row])`;
      return this.state.barNumArray.map((bar, i) => {
        return <SingleBar barLength={bar} barNum={bar} key={i} />;
      });
    }
  }

  tempFunction() {
    const temp = this.state.barNumArray[0];
    let nextBarsArray = this.state.barNumArray;
    const bar1 = this.state.barNumArray[0];
    const bar2 = nextBarsArray[nextBarsArray.length - 1];
    nextBarsArray[0] = nextBarsArray[nextBarsArray.length - 1];
    nextBarsArray[nextBarsArray.length - 1] = temp;

    // this.moveBars(bar1, bar2);
  }

  // Function should take two input bar points to swap places
  moveBars(bar1, bar2) {
    const barContainerLeft = document.querySelector(".bar-graph-display")
      .offsetLeft;
    const bar1Elem = document.querySelector(`.bar-graph-display .bar-${bar1}`);
    const bar2Elem = document.querySelector(`.bar-graph-display .bar-${bar2}`);

    const oldBar1Left = bar1Elem.offsetLeft - barContainerLeft;
    const oldBar2Left = bar2Elem.offsetLeft - barContainerLeft;

    const newBar1Left = oldBar2Left - oldBar1Left;
    const newBar2Left = oldBar1Left - oldBar2Left;

    bar1Elem.classList.add(`bar-moving-${bar1}`);
    document.querySelector(
      `.bar-moving-${bar1}`
    ).style.left = `${newBar1Left}px`;

    bar2Elem.classList.add(`bar-moving-${bar2}`);
    document.querySelector(
      `.bar-moving-${bar2}`
    ).style.left = `${newBar2Left}px`;

    bar1Elem.addEventListener(
      "transitionend",
      () => {
        bar1Elem.style.left = `${newBar1Left}px`;
        bar2Elem.style.left = `${newBar2Left}px`;

        bar1Elem.classList.remove(`bar-moving-${bar1}`);
        bar2Elem.classList.remove(`bar-moving-${bar2}`);
      },
      false
    );
  }

  render() {
    return <div className="bar-graph-display">{this.updateBars()}</div>;
  }
}

GraphDisplay.propTypes = {
  numOfBars: PropTypes.number
};

export default GraphDisplay;
