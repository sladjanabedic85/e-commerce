const BASE_URL = "https://api.advanziaeducation.com";
const API_KEY = "d7534cbd9ee8a1d277508f05318830010270e1c3699cacf82f8ec53f79b486a2";
 
export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...options.headers
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
 
  if (!response.ok) {
    throw new Error("Request failed");
  }
 
  return response.json();
}