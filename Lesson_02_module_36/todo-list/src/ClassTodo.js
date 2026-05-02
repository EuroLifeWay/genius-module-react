import React, { Component } from 'react';

class ClassTodo extends Component {
  // inputRef = React.createRef();
  state = {
    todos: [],
    input: '',
    timer: 0,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
      }));
    }, 1000);

    const lsTodos = localStorage.getItem('todos');
    if (lsTodos) {
      this.setState({ todos: JSON.parse(lsTodos) });
    }
    console.log('componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      console.log('componentDidUpdate');
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  addTask = () => {
    if (!this.state.input.trim()) return;
    const newItem = {
      // id: crypto.randomUUID(),
      id: Date.now(),
      text: this.state.input,
    };
    this.setState({
      todos: [...this.state.todos, newItem],
      input: '',
    });
    // if (this.inputRef.current) {
    //   this.inputRef.current.focus();
    // }
    if (this.inputElement) {
      this.inputElement.focus();
    }
  };

  onChangeHandler = e => {
    this.setState({ input: e.target.value });
  };

  handleDelete = id => {
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  };

  handleDeleteAll = () => {
    this.setState({ todos: [] });
  };

  handleClearLs = () => {
    // localStorage.removeItem('todos');
    localStorage.clear();
    // localStorage.setItem('todos', JSON.stringify([]));
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
        <h2>Timer {this.state.timer}</h2>
        <div>
          <input
            // ref={this.inputRef}
            ref={el => (this.inputElement = el)}
            value={this.state.input}
            onChange={this.onChangeHandler}
            onKeyDown={e => e.key === 'Enter' && this.addTask()}
          ></input>
          <button onClick={this.addTask}>Add task</button>
        </div>
        <ul className="">
          {this.state.todos.map((todo, index) => (
            <li key={todo.id} className="todo-list-item">
              {index + 1}. {todo.text}{' '}
              <button onClick={() => this.handleDelete(todo.id)}>x</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={this.handleDeleteAll}>Delete all tasks</button>
        </div>
        <div>
          <button onClick={this.handleClearLs}>Clear local storage</button>
        </div>
      </>
    );
  }
}

export default ClassTodo;
