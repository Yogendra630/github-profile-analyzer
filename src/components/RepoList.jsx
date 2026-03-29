import React from "react";
import RepoCard from "./RepoCard.jsx";

const RepoList = ({
  repos,
  languages,
  selectedLanguage,
  onLanguageChange,
  onLoadMore,
  hasMore,
  isLoading,
}) => {
  return (
    <div className="repos">
      <div className="repos-header">
        <h2>Repositories</h2>
        <select
          value={selectedLanguage}
          onChange={(event) => onLanguageChange(event.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className="repo-actions">
        {isLoading && <div className="spinner" />}
        {!isLoading && hasMore && (
          <button className="load-more" onClick={onLoadMore} type="button">
            Load More
          </button>
        )}
        {!isLoading && !repos.length && (
          <p className="muted">No repositories match this filter.</p>
        )}
      </div>
    </div>
  );
};

export default RepoList;
