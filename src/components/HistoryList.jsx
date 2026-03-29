import React from "react";

const HistoryList = ({ items, onSelect }) => {
  if (!items.length) return null;
  return (
    <div className="history">
      <div className="history-title">Recent searches</div>
      <div className="history-chips">
        {items.map((item) => (
          <button
            key={item}
            className="chip"
            type="button"
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
