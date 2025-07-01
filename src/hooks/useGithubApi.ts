const GITHUB_API = import.meta.env.VITE_GITHUB_API;

export async function searchUsers(query: string) {
  const res = await fetch(`${GITHUB_API}/search/users?q=${query}&per_page=5`);
  return res.json();
}

export async function getUserRepos(username: string) {
  const res = await fetch(`${GITHUB_API}/users/${username}/repos`);
  return res.json();
}
