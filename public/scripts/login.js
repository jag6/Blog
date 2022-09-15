import { hideLoading, showMessage, redirectUser } from '/src/config';

const login = () => {
    document.getElementById("signin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await signin({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });
        hideLoading();
        if (data.error) {
            showMessage(data.error);
        }else {
            setUserInfo(data);
            redirectUser();
        }
    });
}

login();