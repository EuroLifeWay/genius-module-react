import { Component } from 'react';

class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "I'm from Ukraine" };
  }

  render() {
    return (
      <>
        <h1>{this.state.country}</h1>
      </>
    );
  }
}

export default MyClassComponent;
