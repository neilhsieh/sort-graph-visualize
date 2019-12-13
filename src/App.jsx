import React from "react";
import "./App.scss";
import GraphDisplay from "./components/graphDisplay.jsx";
import HeaderInformation from "./components/header.jsx";
import UserInput from "./components/userInput.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfBars: 0
    };
    this.chosenNumOfBars = this.chosenNumOfBars.bind(this);
  }

  chosenNumOfBars(e) {
    // console.log(e.target.value);
    // console.log(e.target.value, typeof e.target.value);
    this.setState({ numOfBars: parseInt(e.target.value) });
  }

  render() {
    return (
      <div className="app">
        <HeaderInformation />
        <UserInput clickHandler={this.chosenNumOfBars} />
        <div id="graph-container">
          <div className="bars-container">
            <GraphDisplay numOfBars={this.state.numOfBars} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
