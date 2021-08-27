import React, { Component } from "react";

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.addCounter = this.addCounter.bind(this);
  }

  render() {
    return (
      <div>
        <span>counter {this.state.counter}</span>
        <button onClick={this.addCounter}>增加</button>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("counter upate");
  }

  addCounter() {
    this.setState({
      counter: this.state.counter,
    });
  }
}
