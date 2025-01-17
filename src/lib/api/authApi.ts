import { fetchInit } from "./apiConfig";

//TODO: Move url
const API_BASE_URL = "http://localhost:5000";

//TODO: create better api

export async function loginUser(email: string, password: string) {
    const response = await fetch(
        `${API_BASE_URL}/user/login`,
        await fetchInit("POST", { email, password })
    );

    //TODO: handle error
    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response;
}

export async function registerUser(
    email: string,
    password: string,
    name: string
) {
    const response = await fetch(
        `${API_BASE_URL}/user/register`,
        await fetchInit("POST", { email, password, name })
    );

    if (!response.ok) {
        throw new Error("Register failed");
    }

    return response.json();
}
export async function me() {
    const response = await fetch(
        `${API_BASE_URL}/user/me`,
        await fetchInit("GET")
    );

    if (!response.ok) {
        throw new Error("Retrieving user failed");
    }
    const json = await response.json();

    return json;
}
