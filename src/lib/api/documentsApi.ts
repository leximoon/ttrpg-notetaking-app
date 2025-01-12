const API_BASE_URL = "http://localhost:5000";

export async function createDocument(title: string, worldId: string) {
    const response = await fetch(`${API_BASE_URL}/documents/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, worldId }),
    });

    if (!response.ok) {
        throw new Error("Creating document failed");
    }
    const json = await response.json();

    return json;
}

export async function loadAllDocuments(worldId: string) {
    const response = await fetch(`${API_BASE_URL}/documents/${worldId}`, {
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
    console.log("Documents retrieved: ", json);
    return json;
}

export async function getDocumentById(documentId: string) {
    const response = await fetch(`${API_BASE_URL}/documents/loadById`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ documentId }),
    });

    if (!response.ok) {
        throw new Error("Retrieving document failed");
    }
    const json = await response.json();

    return json;
}
