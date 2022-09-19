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

const update = async ({ first_name, last_name, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const response = ({
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

update();