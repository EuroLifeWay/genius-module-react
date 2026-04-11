import { useState } from "react";
import MyFunctionComponent from "./components/MyFunctionComponent";
import MyClassComponent from "./components/MyClassComponent";
import FuncCode from "./components/FuncCode";
import ClassCode from "./components/ClassCode";
import "./App.css";

function App() {
  const [componentIsFunction, setComponentIsFunction] = useState(true);

  function handleClick() {
    componentIsFunction
      ? setComponentIsFunction(false)
      : setComponentIsFunction(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {componentIsFunction ? (
          <pre className="code-item">
            <code>
              <FuncCode />
            </code>
          </pre>
        ) : (
          <pre className="code-item">
            <code>
              <ClassCode />
            </code>
          </pre>
        )}
        {componentIsFunction ? <MyFunctionComponent /> : <MyClassComponent />}
        <button onClick={handleClick}>
          {!componentIsFunction
            ? "Show Function Component"
            : "Show Class Component"}
        </button>
      </header>
    </div>
  );
}

export default App;
