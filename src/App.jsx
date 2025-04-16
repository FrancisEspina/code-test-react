import React, { useEffect, useState } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import Itemlist from "./components/Itemlist";
import axios from "axios";
function App() {
  let [data, setData] = useState([]);
  let [isLoading, setLoading] = useState(true);

  return (
    <div className="App">
      <div className="container">
        <div className="launch">
          <div className="search">
            <SearchInput></SearchInput>
          </div>
          <div class="launch__wrapper">
            <Itemlist />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
