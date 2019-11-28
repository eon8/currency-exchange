import React from "react";
import Converter from "../converter/Converter";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-header">
        <h1 className="App-title">Exchange</h1>
      </div>
      <div className="App-body">
        <Converter />
      </div>
    </div>
  );
};

export default App;
