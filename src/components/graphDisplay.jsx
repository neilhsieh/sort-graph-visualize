import React from "react";
import PropTypes from "prop-types";
import SingleBar from "./singleBar.jsx";
import MoveBars from "./moveBars.jsx";
import "./graphDisplay.scss";

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barNumArray: [],
      numOfBars: 0,
      bar1ToMove: 0,
      bar2ToMove: 0
    };
    // this.listOfRandomizeArray = this.listOfRandomizeArray.bind(this);
    this.displayNum = this.displayNum.bind(this);
    this.calculateNumOfBars = this.calculateNumOfBars.bind(this);
    // this.moveBars = this.moveBars.bind(this);
  }

  componentDidMount() {
    // this.calculateNumOfBars();
    // console.log("Mount ", this.state.numOfBars);
  }

  componentDidUpdate(prevProps) {
    if (this.props.numOfBars !== prevProps.numOfBars) {
      this.setState({
        numOfBars: this.props.numOfBars
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
    for (let i = barHeightDiff; i <= 100; i += barHeightDiff) {
      tempNumArray.push(i);
    }
    this.setState({ barNumArray: tempNumArray });
  }

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

  // moveBars() {
  //   return <MoveBars bar1={} bar2={} />;
  // }

  render() {
    return (
      <div className="bar-graph-display">
        {this.updateBars()}
        {/* {this.moveBars()} */}
      </div>
    );
  }
}

GraphDisplay.propTypes = {
  numOfBars: PropTypes.number
};

export default GraphDisplay;
