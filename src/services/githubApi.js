const BASE_URL = "https://api.github.com";

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = response.status === 404
      ? "User not found. Check the username and try again."
      : "GitHub API error. Please try again later.";
    throw new Error(message);
  }
  return response.json();
};

export const fetchUser = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  return handleResponse(response);
};

export const fetchRepos = async ({ username, page = 1, perPage = 20 }) => {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`
  );
  return handleResponse(response);
};
