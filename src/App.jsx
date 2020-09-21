import React, { useState } from "react";
import "./App.scss";
import { GraphDisplay } from "./components/graphDisplay.jsx";
import HeaderInformation from "./components/header.jsx";
import { UserInput } from "./components/userInput.jsx";

export const App = () => {
  const [numOfBars, updateNumOfBars] = useState(0);
  const [animateNow, updateAnimateNow] = useState(false);
  const [algorithm, updateAlgorithm] = useState("default");

  //     if (previousState.animateNow === true) {
  //       this.setState({
  //         animateNow: false,
  //       });
  //     }

  const clickHandler = (e) => {
    if (typeof e === "number") {
      updateNumOfBars(e);
      updateAnimateNow(false);
    } else if (typeof e === "boolean") {
      updateAnimateNow(e);
    }
    // else if (typeof e === "string") {
    //   this.setState({
    //     algorithm: e
    //   });
    // }
  };

  return (
    <div className="app">
      <HeaderInformation />
      <UserInput clickHandler={clickHandler} />
      <div id="graph-container">
        <div className="bars-container">
          <GraphDisplay numOfBars={numOfBars} animateNow={animateNow} />
        </div>
      </div>
    </div>
  );
};

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       numOfBars: 0,
//       animateNow: false,
//       algorithm: "default",
//     };
//     // this.chosenNumOfBars = this.chosenNumOfBars.bind(this);
//     // this.animateNow = this.animateNow.bind(this);
//     this.clickHandler = this.clickHandler.bind(this);
//   }

//   componentDidUpdate(previousProps, previousState) {
//     if (previousState.animateNow === true) {
//       this.setState({
//         animateNow: false,
//       });
//     }
//   }

//   clickHandler(e) {
//     if (typeof e === "number") {
//       this.setState({
//         numOfBars: e,
//         animateNow: false,
//       });
//     } else if (typeof e === "boolean") {
//       this.setState({
//         animateNow: e,
//       });
//     }
//     // else if (typeof e === "string") {
//     //   this.setState({
//     //     algorithm: e
//     //   });
//     // }
//   }

//   render() {
//     return (
//       <div className="app">
//         <HeaderInformation />
//         <UserInput clickHandler={this.clickHandler} />
//         <div id="graph-container">
//           <div className="bars-container">
//             <GraphDisplay
//               numOfBars={this.state.numOfBars}
//               animateNow={this.state.animateNow}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
