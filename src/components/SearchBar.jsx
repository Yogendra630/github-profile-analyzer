import React, { useState } from "react";
import HistoryList from "./HistoryList.jsx";

const SearchBar = ({ onSearch, history, isLoading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  const handleSelectHistory = (item) => {
    setValue(item);
    onSearch(item);
  };

  return (
    <div className="search-panel">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label="GitHub username"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Analyze"}
        </button>
      </form>
      <HistoryList items={history} onSelect={handleSelectHistory} />
    </div>
  );
};

export default SearchBar;
