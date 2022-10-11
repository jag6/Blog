import { showMessage } from "../utils.js";
import { setUserInfo } from "../cookies.js";
import { loggingIn } from "../apis/loginApi.js";

const login = () => {
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
}

login();