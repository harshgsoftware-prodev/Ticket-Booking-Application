export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const getCurrentUserId = () => {
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
    localStorage.removeItem("token");
    window.location.href = "/login";
};
