const setUserInfo = (
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

const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5000'
: '';

const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML =
    `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-close-btn">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-close-btn').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
        if(callback) {
            callback();
        }
    });
};