import React from "react";

class GraphDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumberArray: []
    };
    this.listOfRandomizeArray = this.listOfRandomizeArray.bind(this);
    this.displayNum = this.displayNum.bind(this);
  }

  // Display nums
  displayNum(num, keys) {
    return <div key={keys}>{num}</div>;
  }

  // Generate randomized array
  listOfRandomizeArray() {
    let randomArray = [];
    for (let i = 0; i < 50; i++) {
      randomArray.push(+(Math.random() * 100).toFixed(2));
    }
    return randomArray.map((num, i) => {
      return this.displayNum(num, i);
    });
  }

  render() {
    return (
      <div>
        <div>Graph Displaying</div>
        {this.listOfRandomizeArray()}
      </div>
    );
  }
}

export default GraphDisplay;
