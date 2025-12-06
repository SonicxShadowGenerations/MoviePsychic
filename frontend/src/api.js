const BASE = "http://127.0.0.1:8000/api";

// GET /random/
export async function fetchRandom() {
  const res = await fetch(`${BASE}/random/`);
  return res.json();
}

// GET /search/?q=
export async function searchMovies(query) {
  const res = await fetch(`${BASE}/search/?q=${encodeURIComponent(query)}`);
  return res.json();
}

// POST /recommend/
export async function fetchRecommendations(ids) {
  const res = await fetch(`${BASE}/recommend/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids })
  });
  return res.json();
}
export async function rankMovies(query) {
  const res = await fetch(`${BASE}/rank/?q=${encodeURIComponent(query)}`);
  return res.json();
}
