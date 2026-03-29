const THEME_KEY = "gpa-theme";
const HISTORY_KEY = "gpa-history";
const BOOKMARKS_KEY = "gpa-bookmarks";

export const getStoredTheme = () => {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  return stored || "dark";
};

export const setStoredTheme = (theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
};

export const getHistory = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setHistory = (history) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getBookmarks = () => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(BOOKMARKS_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const setBookmarks = (bookmarks) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};
