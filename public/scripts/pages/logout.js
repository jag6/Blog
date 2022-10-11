import { clearUser } from "../export/cookies.js";

document.getElementById('logout').addEventListener('click', () => {
    clearUser();
    location.href = '/login';
});