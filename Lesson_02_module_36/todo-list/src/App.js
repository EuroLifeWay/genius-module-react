// import { useState, useEffect, useRef } from 'react';
import Todo from './components/Todo';
// import TodoNew from './components/TodoNew';
// import RenderComponents from './RenderComponents';
// import LifeCycleClassComponent from './LifeCycleClassComponent';
// import ClassTodo from './ClassTodo';

import './App.css';
// import { useState } from 'react';

function App() {
  // const [isShowTimer, setIsShowTimer] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Todo />
        {/* <TodoNew /> */}
        {/* <ClassTodo /> */}
        {/* <RenderComponents /> */}
        {/* {isShowTimer ? <LifeCycleClassComponent /> : <ClassTodo />} */}
        {/* <button onClick={() => setIsShowTimer(prev => !prev)}>
          Show Timer
        </button> */}
      </header>
    </div>
  );
}

export default App;
