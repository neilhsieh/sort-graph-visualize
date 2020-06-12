import React, { useState } from "react";
import PropTypes from "prop-types";
import "./userInput.scss";
import CreateButton from "./createButton.jsx";
import { useContainer } from "unstated-next";
import { NumberOfBars } from "../containers/userInput.container";

export const UserInput = ({ clickHandler }) => {
  // const [numOfBars, updateNumOfBars] = useState(0);
  // const [sortType, updateSortType] = useState(undefined);
  // const [animateNow, updateAnimateNow] = useState(false);
  const [barsNumToggle, updateBarsNumToggle] = useState(false);
  const [algoToggle, updateAlgoToggle] = useState(false);

  const {
    updateNumberOfBars,
    updateAlgo,
    updateAnimate,
  } = NumberOfBars.useContainer();

  const updateButton = (e) => {
    const dataType = e.target.getAttribute("data-type");

    if (dataType === "number") {
      barsNumDrop();
      updateNumberOfBars(parseInt(e.target.value));
    } else if (dataType === "algo") {
      algoDropdownToggle();
      updateAlgo(e.target.value);
    } else if (dataType === "boolean") {
      updateAnimate(true);
    }
  };

  const barsNumDrop = () => {
    updateBarsNumToggle((barsNumToggle) => !barsNumToggle);
  };
  const algoDropdownToggle = () => {
    updateAlgoToggle((algoToggle) => !algoToggle);
  };

  return (
    <div id="user-input">
      <div className="bars-select">
        <button onClick={barsNumDrop} className="num-selector-btn">
          Number of Bars
        </button>
        <ul
          className={`selector-dropdown bars ${barsNumToggle ? "opened" : ""}`}
        >
          <li>
            <CreateButton
              barText={"3 Bars"}
              barValue={3}
              barDataType="number"
              updateButton={updateButton}
            />
          </li>
          <li>
            <CreateButton
              barText={"10 Bars"}
              barValue={10}
              barDataType="number"
              updateButton={updateButton}
            />
          </li>
          <li>
            <CreateButton
              barText={"25 Bars"}
              barValue={25}
              barDataType="number"
              updateButton={updateButton}
            />
          </li>
          <li>
            <CreateButton
              barText={"50 Bars"}
              barValue={50}
              barDataType="number"
              updateButton={updateButton}
            />
          </li>
          <li>
            <CreateButton
              barText={"100 Bars"}
              barValue={100}
              barDataType="number"
              updateButton={updateButton}
            />
          </li>
        </ul>
      </div>
      <div className="algorithm-select">
        <button className="algo-select-btn" onClick={algoDropdownToggle}>
          Choose algorithm
        </button>
        <ul className={`selector-dropdown algo ${algoToggle ? "opened" : ""}`}>
          <li>
            <CreateButton
              barText={"Quick Sort"}
              barDataType="algo"
              barValue={"quick"}
              updateButton={updateButton}
            />
          </li>
        </ul>
      </div>
      <div className="user-animate-button">
        <CreateButton
          barText={"Animate"}
          barValue={"animate"}
          barDataType={"boolean"}
          updateButton={updateButton}
        />
      </div>
    </div>
  );
};

UserInput.propTypes = {
  clickHandler: PropTypes.func,
};

// class UserInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       numOfBars: 0,
//       sortType: undefined,
//       animateNow: false,
//       barsNumToggle: false,
//       algoToggle: false,
//     };
//     this.clickHandler = this.clickHandler.bind(this);
//     this.updateButton = this.updateButton.bind(this);
//     this.barsNumDrop = this.barsNumDrop.bind(this);
//     this.algoDropdownToggle = this.algoDropdownToggle.bind(this);
//   }
//
//   updateButton(e) {
//     const dataType = e.target.getAttribute("data-type");
//     console.log("update button");

//     if (dataType === "number") {
//       this.barsNumDrop();
//       return this.props.clickHandler(parseInt(e.target.value));
//     } else if (dataType === "algo") {
//       this.algoDropdownToggle();
//       return this.props.clickHandler(e.target.value);
//     } else if (dataType === "boolean") {
//       return this.props.clickHandler(true);
//     }
//   }

//   clickHandler() {
//     this.setState({ animateNow: true });
//     return this.props.clickHandler(this.state.animateNow);
//   }

//   barsNumDrop() {
//     const currToggleState = this.state.barsNumToggle;
//     this.setState({ barsNumToggle: !currToggleState });
//   }
//   algoDropdownToggle() {
//     const currToggleState = this.state.algoToggle;
//     this.setState({ algoToggle: !currToggleState });
//   }
//   render() {
//     return (
//       <div id="user-input">
//         <div className="bars-select">
//           <button onClick={this.barsNumDrop} className="num-selector-btn">
//             Number of Bars
//           </button>
//           <ul
//             className={`selector-dropdown bars ${
//               this.state.barsNumToggle ? "opened" : ""
//             }`}
//           >
//             <li>
//               <CreateButton
//                 barText={"3 Bars"}
//                 barValue={3}
//                 barDataType="number"
//                 updateButton={this.updateButton}
//               />
//             </li>
//             <li>
//               <CreateButton
//                 barText={"10 Bars"}
//                 barValue={10}
//                 barDataType="number"
//                 updateButton={this.updateButton}
//               />
//             </li>
//             <li>
//               <CreateButton
//                 barText={"25 Bars"}
//                 barValue={25}
//                 barDataType="number"
//                 updateButton={this.updateButton}
//               />
//             </li>
//             <li>
//               <CreateButton
//                 barText={"50 Bars"}
//                 barValue={50}
//                 barDataType="number"
//                 updateButton={this.updateButton}
//               />
//             </li>
//             <li>
//               <CreateButton
//                 barText={"100 Bars"}
//                 barValue={100}
//                 barDataType="number"
//                 updateButton={this.updateButton}
//               />
//             </li>
//           </ul>
//         </div>
//         <div className="algorithm-select">
//           <button className="algo-select-btn" onClick={this.algoDropdownToggle}>
//             Choose algorithm
//           </button>
//           <ul
//             className={`selector-dropdown algo ${
//               this.state.algoToggle ? "opened" : ""
//             }`}
//           >
//             <li>
//               <CreateButton
//                 barText={"Quick Sort"}
//                 barDataType="algo"
//                 barValue={"quick"}
//                 updateButton={this.updateButton}
//               />
//             </li>
//           </ul>
//         </div>
//         <div className="user-animate-button">
//           <CreateButton
//             barText={"Animate"}
//             barValue={"animate"}
//             barDataType={"boolean"}
//             updateButton={this.updateButton}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// UserInput.propTypes = {
//   clickHandler: PropTypes.func,
// };

// export default UserInput;
