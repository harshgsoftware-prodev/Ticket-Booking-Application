export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
};
