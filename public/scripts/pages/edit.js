import { apiUrl } from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";
import { showMessage } from "../export/utils.js";

const editArticle = async (article) => {
    try {
        const { token } = getUserInfo();
        const response = await axios ({
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
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

document.getElementById('edit-form').addEventListener('submit', async () => {
    const data = await editArticle({
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        markdown: document.getElementById('markdown').value,
        author: document.getElementById('author').value
    });
    if(data.error) {
        showMessage(data.error);
    }else {
        showMessage('Article Update Successful');
        location.href = '/dashboard';
    }
});