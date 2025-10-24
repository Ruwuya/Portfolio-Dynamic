import axios from "axios";

// Use localhost instead of .test
const BASE_URL = "http://localhost/portfolio-backend/api";

export async function getProjects() {
  try {
    const response = await axios.get(`${BASE_URL}/getProjects.php`);
    return response.data;
  } catch (error) {
    console.error("Axios Network Error:", error);
    return [];
  }
}
