const API_BASE_URL = "http://localhost:5000";

export async function createDocument(title: string) {
    const response = await fetch(`${API_BASE_URL}/documents/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error("Creating document failed");
    }
    const json = await response.json();

    return json;
}

export async function loadDocuments() {
    const response = await fetch(`${API_BASE_URL}/documents/load`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Retrieving documents failed");
    }
    const json = await response.json();

    return json;
}
