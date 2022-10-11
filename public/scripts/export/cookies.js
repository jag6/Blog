export const setUserInfo = (
    {
        _id = '',
        first_name = '',
        last_name = '',
        email = '',
        password = '',
        token = '',
        isAdmin = false 
    }) => 
    {
        localStorage.setItem('userInfo', JSON.stringify({
            _id,
            first_name,
            last_name,
            email,
            password,
            token,
            isAdmin
        })
    );
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : {
        first_name: '',
        last_name: '', 
        email: '', 
        password: ''
    };
};

export const clearUser = () => {
    localStorage.removeItem('userInfo');
};