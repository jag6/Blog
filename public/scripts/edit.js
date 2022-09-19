const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5000'
: '';

const getUserInfo = () => {
    return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {
        first_name: '',
        last_name: '', 
        email: '', 
        password: ''
    };
};

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
