import { clearUser } from "./cookies.js";

const logout = () => {
    document.getElementById('logout').addEventListener('click', () => {
        clearUser();
        location.href = '/login';
    });
};

logout();