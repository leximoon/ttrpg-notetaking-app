import { NewWorldInput } from "@/app/panel/worlds/_components/newWorldForm";

const API_BASE_URL = "http://localhost:5000";

export async function getSessionWorlds() {
    const response = await fetch(`${API_BASE_URL}/world/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Retrieving user failed");
    }
    const json = await response.json();

    return json;
}
export async function createWorld({ ...world }: NewWorldInput) {
    const response = await fetch(`${API_BASE_URL}/world/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(world),
    });

    if (!response.ok) {
        throw new Error("Creating world failed");
    }
    const json = await response.json();

    return json;
}

export async function getWorldById(worldId: string) {
    const response = await fetch(`${API_BASE_URL}/world/${worldId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Retrieving world failed");
    }
    const json = await response.json();
    return json;
}
