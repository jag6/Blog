import { newArticle } from "../apis/newApi.js";
import { showMessage } from "../export/utils.js";

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