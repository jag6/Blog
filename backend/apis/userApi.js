import axios from "axios";
import { apiUrl } from "/backend/apiUrl";
import { getUserInfo } from "/backend/cookies";

export const signin = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
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