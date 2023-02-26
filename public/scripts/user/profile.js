import { apiUrl} from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";

const updateProfile = async ({ first_name, last_name, email, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = await axios ({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                first_name,
                last_name,
                email,
                password
            }
        });
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = await updateProfile({
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
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