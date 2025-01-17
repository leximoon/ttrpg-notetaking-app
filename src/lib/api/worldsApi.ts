import { fetchInit } from "./apiConfig";

const API_BASE_URL = "http://localhost:5000";

export async function getSessionWorlds() {
    const response = await fetch(
        `${API_BASE_URL}/world/me`,
        await fetchInit("GET")
    );

    if (!response.ok) {
        throw new Error("Retrieving user failed");
    }
    const json = await response.json();

    return json;
}
