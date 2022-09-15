import axios from "axios";
import { apiUrl } from "/backend/apiUrl";
import { getUserInfo, setUserInfo } from "/backend/cookies";

export const login = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/login`,
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
        return { error: err.response.data.message || err.message };
    }
};

export const register = async ({ first_name, last_name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                first_name,
                last_name,
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
        return { error: err.response.data.message || err.message };
    }
};

export const submitRegister = () => {
    document.getElementById("register-form").addEventListener('submit', async (e) => {
        e.preventDefault();
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
            showLoading();
            const data = await register({
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            });
            hideLoading();
            if(data.error) {
                showMessage(data.error);
            }else {
                setUserInfo(data);
                redirectUser();
            }
        }
    })
}

export const update = async ({ first_name, last_name, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                first_name,
                last_name,
                password
            }
        })
    }catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};