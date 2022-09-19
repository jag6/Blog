import { apiUrl } from "./config.js";
import { getUserInfo } from "./cookies.js"; 

const editArticle = async (article) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/blog/edit/${article._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: article
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return { error: err.response.data.message || err.message };
    }
};

editArticle();