import React from "react";

const Bookmarks = ({ items, onSelect, onRemove }) => {
  if (!items.length) return null;

  return (
    <div className="bookmarks">
      <div className="bookmarks-title">Bookmarked Profiles</div>
      <div className="bookmark-grid">
        {items.map((item) => (
          <div key={item.login} className="bookmark-card">
            <button type="button" onClick={() => onSelect(item.login)}>
              <img src={item.avatar_url} alt={item.login} />
              <div>
                <strong>{item.name || item.login}</strong>
                <span className="muted">@{item.login}</span>
              </div>
            </button>
            <button
              type="button"
              className="remove"
              onClick={() => onRemove(item.login)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
