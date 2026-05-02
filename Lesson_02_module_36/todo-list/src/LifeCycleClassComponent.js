import { Component } from 'react';

class LifeCycleClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    console.log('LifeCycleClassComponent constructor');
    console.log('Count: ', this.state.count);

    this.onClickHandlerDecrease = this.onClickHandlerDecrease.bind(this);
    this.onClickHandlerIncrease = this.onClickHandlerIncrease.bind(this);
  }

  onClickHandlerDecrease(params) {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }));
  }

  onClickHandlerIncrease(params) {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  }

  componentDidMount() {
    console.log('LifeCycleClassComponent componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('LifeCycleClassComponent shouldComponentUpdate');
    if (this.props.name !== nextProps.name) return true;
    if (this.state.count !== nextState.count) return true;
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('LifeCycleClassComponent componentDidMount');
  }

  render() {
    console.log('LifeCycleClassComponent render');
    return (
      <div>
        LifeCycleClassComponent
        <p>{this.state.count}</p>
        <button onClick={this.onClickHandlerDecrease}>Count - 1</button>
        <button onClick={this.onClickHandlerIncrease}>Count + 1</button>
      </div>
    );
  }
}

export default LifeCycleClassComponent;
