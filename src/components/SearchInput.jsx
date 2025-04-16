import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 👈 pass typed value up
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search launches..."
      />
    </div>
  );
};

export default SearchInput;
