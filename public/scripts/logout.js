const clearUser = () => {
    localStorage.removeItem('userInfo');
};

const logout = () => {
    document.getElementById('logout').addEventListener('click', () => {
        clearUser();
        location.href = '/login';
    });
};

logout();