import { showMessage } from "../export/utils.js";
import { setUserInfo } from "../export/cookies.js";
import { loggingIn } from "../apis/loginApi.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await loggingIn({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    });
    if (data.error) {
        showMessage(data.error);
    }else {
        setUserInfo(data);
        location.href ='/dashboard';
    }
});