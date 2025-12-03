const BASE = "http://127.0.0.1:8000/api";

export async function searchMovies(query) {
  const res = await fetch(`${BASE}/search/?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function storeMovie(id) {
  const res = await fetch(`${BASE}/store/${id}/`, {
    method: "POST"
  });
  return res.json();
}

export async function getMovie(id) {
  const res = await fetch(`${BASE}/movie/${id}/`);
  return res.json();
}

export async function rankMovies(ids) {
  const res = await fetch(`${BASE}/rank/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids })
  });
  return res.json();
}

export async function getRandomMovies() {
  const res = await fetch(`${BASE}/random/`);
  return res.json();
}


export async function recommendMovies(ids) {
  const res = await fetch(`${BASE}/recommend/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids })
  });
  return res.json();
}
