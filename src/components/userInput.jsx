import React from "react";
import PropTypes from "prop-types";
import "./userInput.scss";
import GraphDisplay from "./graphDisplay.jsx";

class UserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfBars: 0
    };
    this.clickHandler = this.clickHandler.bind(this);
    this.updateButton = this.updateButton.bind(this);
  }

  updateButton(e) {
    this.setState({
      numOfBars: parseInt(e.target.value)
    });
  }

  clickHandler() {
    return this.props.clickHandler(this.state.numOfBars);
  }
  render() {
    return (
      <div id="user-input">
        <div className="button-bars">
          <button value="3" onClick={this.updateButton}>
            3 Bars
          </button>
          <button value="10" onClick={this.updateButton}>
            10 Bars
          </button>
          <button value="25" onClick={this.updateButton}>
            25 Bars
          </button>
          <button value="50" onClick={this.updateButton}>
            50 Bars
          </button>
          <button value="100" onClick={this.updateButton}>
            100 Bars
          </button>
        </div>
        <div className="user-animate-button">
          <button onClick={this.clickHandler}>Animate</button>
        </div>
      </div>
    );
  }
}

// function UserInput(props) {
//   return (
//     <div id="user-input">
//       <div className="button-bars">
//         <button value="3" onClick={props.clickHandler}>
//           3 Bars
//         </button>
//         <button value="10" onClick={props.clickHandler}>
//           10 Bars
//         </button>
//         <button value="25" onClick={props.clickHandler}>
//           25 Bars
//         </button>
//         <button value="50" onClick={props.clickHandler}>
//           50 Bars
//         </button>
//         <button value="100" onClick={props.clickHandler}>
//           100 Bars
//         </button>
//       </div>
//       <div className="user-animate-button">
//         <button>Animate</button>
//       </div>
//     </div>
//   );
// }

UserInput.propTypes = {
  clickHandler: PropTypes.func
};

export default UserInput;
