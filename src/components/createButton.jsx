import React from "react";
import PropTypes from "prop-types";

function createButton(props) {
  return (
    <button
      value={props.barValue ? props.barValue : null}
      data-type={props.barDataType ? props.barDataType : null}
      onClick={props.updateButton}
    >
      {props.barText}
    </button>
  );
}

createButton.propTypes = {
  // barValue: PropTypes.number,
  barDataType: PropTypes.string,
  updateButton: PropTypes.func,
  barText: PropTypes.string,
};

export default createButton;
