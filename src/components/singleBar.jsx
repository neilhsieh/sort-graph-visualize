/* eslint-disable react/prop-types */

import React from "react";
import PropTypes from "prop-types";
import "./singleBar.scss";

const SingleBar = props => {
  const classNames = `single-bar bar-${props.barNum}`;
  const gridRowEndValue = props.barLength === 101 ? 1 : 101 - props.barLength;
  return (
    <div className={classNames} style={{ gridRowStart: gridRowEndValue }}></div>
  );
};

SingleBar.propsTypes = {
  barLength: PropTypes.number,
  barNum: PropTypes.number
};

export default SingleBar;
