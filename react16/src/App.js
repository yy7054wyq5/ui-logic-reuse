import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { CheckList, dataCreater } from "../../check-list/check-list.class.js";

function App() {
  import('../../check-list/check-list.class.js').then();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
