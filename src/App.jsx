import React, { useEffect, useState } from "react";
import "./App.css";
import SearchInput from "./components/SearchInput";
import Itemlist from "./components/Itemlist";
import axios from "axios";
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (text) => {
    console.log("From SearchInput:", text);
    setSearchTerm(text);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="launch">
          <div className="search">
            <SearchInput onSearch={handleSearch} />
          </div>
          <div class="launch__wrapper">
            <Itemlist searched={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
