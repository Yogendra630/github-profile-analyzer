import React from "react";
import { formatDate, formatNumber } from "../utils/format.js";

const ProfileCard = ({ user, isBookmarked, onToggleBookmark }) => {
  if (!user) return null;

  return (
    <div className="card profile-card">
      <div className="profile-header">
        <img src={user.avatar_url} alt={user.login} />
        <div>
          <h2>{user.name || user.login}</h2>
          <p className="muted">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="profile-meta">
            {user.location && <span>{user.location}</span>}
            <span>Joined {formatDate(user.created_at)}</span>
          </div>
        </div>
        <button className="bookmark" onClick={onToggleBookmark} type="button">
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
      <div className="stats">
        <div>
          <span className="label">Followers</span>
          <strong>{formatNumber(user.followers)}</strong>
        </div>
        <div>
          <span className="label">Following</span>
          <strong>{formatNumber(user.following)}</strong>
        </div>
        <div>
          <span className="label">Public Repos</span>
          <strong>{formatNumber(user.public_repos)}</strong>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
