export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};

export const getCurrentUserId = () => {
    return JSON.parse(atob(localStorage.getItem("token")!.split(".")[1])).id;
};
