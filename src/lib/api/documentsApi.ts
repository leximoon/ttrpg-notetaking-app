const API_BASE_URL = "http://localhost:5000";

export async function createDocument(
    title: string,
    worldId: string,
    parentDocumentId?: string
) {
    const response = await fetch(`${API_BASE_URL}/documents/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, worldId, parentDocumentId }),
    });

    if (!response.ok) {
        throw new Error("Creating document failed");
    }
    const json = await response.json();

    return json;
}

export async function updateDocument(
    documentId: string,
    field: string,
    content: any
) {
    const response = await fetch(`${API_BASE_URL}/documents/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ documentId, field, content }),
    });

    if (!response.ok) {
        throw new Error("Editing document failed");
    }
    const json = await response.json();

    return json;
}

export async function deleteDocument(documentId: string) {
    const response = await fetch(`${API_BASE_URL}/documents/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ documentId }),
    });

    if (!response.ok) {
        throw new Error("Deleting document failed");
    }
    const json = await response.json();

    return json;
}

export async function loadAllDocuments(
    worldId: string,
    parentDocumentId?: string
) {
    let urlParams: string = worldId;
    // Optional argument of parentDocumentId gets only Documents with that documentId as there parentDocumentId
    if (parentDocumentId) {
        urlParams += "?parentDocumentId=" + parentDocumentId;
    }

    const response = await fetch(`${API_BASE_URL}/documents/${urlParams}`, {
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
