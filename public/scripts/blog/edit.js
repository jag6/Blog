import { apiUrl, getUrl } from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";
import { showMessage } from "../export/utils.js";

//post edited article
const editArticle = async (article) => {
    try {
        const { token } = getUserInfo();
        const response = await axios ({
            url: getUrl,
            method: 'POST',
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
        author: document.getElementById('author').value,
        image: document.getElementById('image').value,
        image_description: document.getElementById('image_description').value
    });
    if(data.error) {
        showMessage(data.error);
    }else {
        location.href = '/dashboard';
    }
});

//upload image
const uploadImage = async (formData) => {
    try{
        const { token } = getUserInfo();
        const response = await axios ({
            url: `${apiUrl}/api/blog/imageUpload`,
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`     
            },
            data: formData
        });
        if(response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return { error: err.response.data.message || err.message };
    }
};

document.getElementById('image_file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const data = await uploadImage(formData);
    if(data.error) {
        showMessage(data.error);
    }else {
        document.getElementById('image').value = data.image;
    }
});