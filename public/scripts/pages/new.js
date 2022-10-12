import { apiUrl } from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";
import { showMessage } from "../export/utils.js";

const newArticle = async ({ title, category, description, markdown, author }) => {
    try {
        const { token } = getUserInfo();
        const response = await axios ({
            url: `${apiUrl}/api/blog/new`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: {
                title,
                category,
                description,
                markdown,
                author
            }
        });
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return { error: err.response.data.message || err.message };
    }
};

document.getElementById('new-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = await newArticle({
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        markdown: document.getElementById('markdown').value,
        author: document.getElementById('author').value
    });
    if(data.error) {
        showMessage(data.error);
    }else {
        showMessage('New Article Saved');
        location.href = '/dashboard';
    }
});