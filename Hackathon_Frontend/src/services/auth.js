import { fetchWithAuth } from "./api";

export async function loginUser(email, password) {
    return fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function registerUser(data) {
    return fetchWithAuth("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
    });
}
