import React from "react";

class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  increment = () => {
    this.setState({
      value: this.state.value + 1,
    });
  };

  decrement = () => {
    this.setState({
      value: this.state.value - 1,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.value}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default ClassCounter;
