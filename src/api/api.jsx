export const API_BASE = "http://localhost:8008/api";

export async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "API Error");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

