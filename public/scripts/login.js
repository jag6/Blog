const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5000'
: '';

const loggingIn = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/login`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                email,
                password
            }
        })
        if(response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch (err) {
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};

const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML =
    `
        <div>
            <div id="message-overlay-content">
                <p>${message}</p>
            </div>
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

const login = () => {
    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = await loggingIn({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        });
        if (data.error) {
            showMessage(data.error);
        }else {
            setUserInfo(data);
        }
    });
}

login();