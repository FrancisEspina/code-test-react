import React from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import Itemlist from "./components/Itemlist";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="launch">
          <div className="search">
            <SearchInput></SearchInput>
          </div>
          <div class="launch__wrapper">
            <Itemlist></Itemlist>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
