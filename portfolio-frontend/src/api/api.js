import axios from "axios";

const API_BASE_URL = "https://rehi01.skp-dp.sde.dk/portfolio-backend/api";

export async function getProjects() {
  try {
    const response = await axios.get(`${API_BASE_URL}/getProjects.php`, {
      headers: { "Cache-Control": "no-cache" },
    });

    let data = response.data;

    // Some browsers (like Firefox Mobile) may return JSON as a string
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error("JSON parsing failed:", e);
        data = [];
      }
    }

    // Always return an array (so .map() never crashes)
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Axios Network Error:", error);
    return [];
  }
}