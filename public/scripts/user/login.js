import { apiUrl } from "../export/config.js";
import { setUserInfo } from "../export/cookies.js";
import { showMessage } from "../export/utils.js";

const loggingIn = async ({ email, password }) => {
    try {
        const response = await axios ({
            url: `${apiUrl}/login`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            }
        })
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await loggingIn({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    });
    if(data.error) {
        showMessage(data.error);
    }else {
        setUserInfo(data);
        location.href = '/dashboard';
    }
});