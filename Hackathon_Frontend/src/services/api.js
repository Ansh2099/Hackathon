const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function fetchWithAuth(url, options = {}, token) {
    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
