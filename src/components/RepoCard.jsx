import React from "react";
import { formatNumber } from "../utils/format.js";

const RepoCard = ({ repo }) => {
  return (
    <div className="card repo-card">
      <div className="repo-title">
        <h3>{repo.name}</h3>
        <span className="muted">{repo.language || "Unknown"}</span>
      </div>
      <p className="muted">{repo.description || "No description provided."}</p>
      <div className="repo-stats">
        <span>⭐ {formatNumber(repo.stargazers_count)}</span>
        <span>🍴 {formatNumber(repo.forks_count)}</span>
      </div>
    </div>
  );
};

export default RepoCard;
