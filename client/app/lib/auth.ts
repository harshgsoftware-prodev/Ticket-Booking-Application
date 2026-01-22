const isBrowser = typeof window !== "undefined";

export const saveToken = (token: string) => {
    if (!isBrowser) return;
    localStorage.setItem("token", token);
};

export const getToken = () => {
    if (!isBrowser) return;
    return localStorage.getItem("token");
};

export const isLoggedIn = () => {
    if (!isBrowser) return;
    return !!localStorage.getItem("token");
};

export const getCurrentUserId = () => {
    if (!isBrowser) return;

    const token = getToken();
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.id;
    } catch (err) {
        return null;
    }
};

export const logout = () => {
    if (!isBrowser) return;
    localStorage.removeItem("token");
    window.location.href = "/login";
};
