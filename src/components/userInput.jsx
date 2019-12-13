import React from "react";
import PropTypes from "prop-types";
import "./userInput.scss";

function UserInput(props) {
  return (
    <div id="user-input">
      <div className="button-bars">
        <button value="3" onClick={props.clickHandler}>
          3 Bars
        </button>
        <button value="10" onClick={props.clickHandler}>
          10 Bars
        </button>
        <button value="25" onClick={props.clickHandler}>
          25 Bars
        </button>
        <button value="50" onClick={props.clickHandler}>
          50 Bars
        </button>
        <button value="100" onClick={props.clickHandler}>
          100 Bars
        </button>
      </div>
    </div>
  );
}

UserInput.propTypes = {
  clickHandler: PropTypes.func
};

export default UserInput;
