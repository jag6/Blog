import { showMessage } from "../export/utils.js";
import { setUserInfo } from "../export/cookies.js";
import { register } from "../apis/registerApi.js";

document.getElementById("register-form").addEventListener('submit', async () => {
    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = 
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if(isFormValid) {
        const data = await register({
            first_name: document.getElementById("first_name").value,
            last_name: document.getElementById("last_name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            setUserInfo(data);
            location.href = '/';
        }
    }
});