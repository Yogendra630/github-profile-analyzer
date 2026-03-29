import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import RepoList from "../components/RepoList.jsx";
import Charts from "../components/Charts.jsx";
import Bookmarks from "../components/Bookmarks.jsx";
import { fetchUser, fetchRepos } from "../services/githubApi.js";
import {
  getBookmarks,
  getHistory,
  setBookmarks,
  setHistory,
} from "../utils/storage.js";

const PER_PAGE = 20;

const Home = ({ theme, onToggleTheme }) => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [error, setError] = useState("");
  const [historyItems, setHistoryItems] = useState(getHistory());
  const [bookmarks, setBookmarkItems] = useState(getBookmarks());

  const updateHistory = (username) => {
    setHistoryItems((prev) => {
      const next = [username, ...prev.filter((item) => item !== username)].slice(0, 5);
      setHistory(next);
      return next;
    });
  };

  const handleSearch = async (username) => {
    setError("");
    setLoadingUser(true);
    setLoadingRepos(true);
    setSelectedLanguage("");
    setPage(1);
    setRepos([]);

    try {
      const userData = await fetchUser(username);
      setUser(userData);
      updateHistory(username);

      const repoData = await fetchRepos({ username, page: 1, perPage: PER_PAGE });
      setRepos(repoData);
      setPage(1);
      setHasMore(repoData.length === PER_PAGE);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setUser(null);
      setRepos([]);
      setHasMore(false);
    } finally {
      setLoadingUser(false);
      setLoadingRepos(false);
    }
  };

  const handleLoadMore = async () => {
    if (!user || loadingRepos) return;
    const nextPage = page + 1;
    setLoadingRepos(true);

    try {
      const repoData = await fetchRepos({
        username: user.login,
        page: nextPage,
        perPage: PER_PAGE,
      });
      setRepos((prev) => [...prev, ...repoData]);
      setPage(nextPage);
      setHasMore(repoData.length === PER_PAGE);
    } catch (err) {
      setError(err.message || "Unable to load more repositories.");
    } finally {
      setLoadingRepos(false);
    }
  };

  const toggleBookmark = () => {
    if (!user) return;
    setBookmarkItems((prev) => {
      const exists = prev.some((item) => item.login === user.login);
      const next = exists
        ? prev.filter((item) => item.login !== user.login)
        : [
            {
              login: user.login,
              avatar_url: user.avatar_url,
              name: user.name,
            },
            ...prev,
          ];
      setBookmarks(next);
      return next;
    });
  };

  const removeBookmark = (login) => {
    setBookmarkItems((prev) => {
      const next = prev.filter((item) => item.login !== login);
      setBookmarks(next);
      return next;
    });
  };

  const languages = useMemo(() => {
    const unique = new Set();
    repos.forEach((repo) => {
      if (repo.language) unique.add(repo.language);
    });
    return Array.from(unique).sort();
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (!selectedLanguage) return repos;
    return repos.filter((repo) => repo.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  const languageData = useMemo(() => {
    const counts = {};
    repos.forEach((repo) => {
      const lang = repo.language || "Other";
      counts[lang] = (counts[lang] || 0) + 1;
    });
    const labels = Object.keys(counts);
    const values = labels.map((label) => counts[label]);
    return { labels, values };
  }, [repos]);

  const starsData = useMemo(() => {
    const sorted = [...repos].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const top = sorted.slice(0, 8);
    return {
      labels: top.map((repo) => repo.name),
      values: top.map((repo) => repo.stargazers_count),
    };
  }, [repos]);

  const isBookmarked = user
    ? bookmarks.some((item) => item.login === user.login)
    : false;

  return (
    <div className="app">
      <header className="top-bar">
        <div>
          <h1>GitHub Profile Analyzer</h1>
          <p className="muted">Insights, trends, and repo analytics in one place.</p>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </header>

      <SearchBar
        onSearch={handleSearch}
        history={historyItems}
        isLoading={loadingUser}
      />

      {error && <div className="error">{error}</div>}

      <Bookmarks
        items={bookmarks}
        onSelect={handleSearch}
        onRemove={removeBookmark}
      />

      {loadingUser && !user && (
        <div className="loader">
          <div className="spinner" />
          <span>Fetching profile...</span>
        </div>
      )}

      {user && (
        <motion.div
          className="content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProfileCard
            user={user}
            isBookmarked={isBookmarked}
            onToggleBookmark={toggleBookmark}
          />

          {repos.length > 0 && (
            <Charts languageData={languageData} starsData={starsData} />
          )}

          <RepoList
            repos={filteredRepos}
            languages={languages}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoading={loadingRepos}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
