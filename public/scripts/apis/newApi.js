import { apiUrl } from "../export/config.js";


export const newArticle = async ({ title, category, description, markdown, author }) => {
    try {
        const response = await axios ({
            url: `${apiUrl}/api/blog/new`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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