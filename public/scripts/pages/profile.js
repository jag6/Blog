import { apiUrl} from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";

const update = async ({ first_name, last_name, email, password }) => {
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