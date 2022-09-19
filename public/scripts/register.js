const firstNameEl = document.getElementById("first_name");
const lastNameEl = document.getElementById("last_name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const confirmPasswordEl = document.getElementById("re-enter-password");

const checkFirstName = () => {
    let valid = false;
    const min = 3,
    max = 25;
    const name = firstNameEl.value.trim();
    if(!isRequired(name)) {
        showError(firstNameEl, 'Sorry, first name cannot be blank.');
    }else if (!isBetween(name.length, min, max)) {
        showError(firstNameEl, `Sorry, first name must be between ${min} and ${max} characters.`)
    }else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastName = () => {
    let valid = false;
    const min = 3,
    max = 25;
    const name = lastNameEl.value.trim();
    if(!isRequired(name)) {
        showError(lastNameEl, 'Sorry, last name cannot be blank.');
    }else if (!isBetween(name.length, min, max)) {
        showError(lastNameEl, `Sorry, last name must be between ${min} and ${max} characters.`)
    }else {
        showSuccess(lastNameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if(!isRequired(email)) {
        showError(emailEl, 'Sorry, email cannot be blank');
    }else if (!isEmailValid(email)) {
        showError(emailEl, 'Sorry, email is not valid')
    }else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    if(!isRequired(password)) {
        showError(passwordEl, 'Sorry, password cannot be blank');
    }else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Sorry, password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)');
    }else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();
    if(!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Sorry, please enter the password again');
    }else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Sorry, the password does not match. Please try again');
    }else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
    };
    
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;
    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');
    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
         if(timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

const checkEverything = () => {
    document.getElementById("register-form").addEventListener('input', debounce(function (e) {
        switch (e.target.id) {
            case 'first_name':
                checkFirstName();
                break;
            case 'last_name':
                checkLastName();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 're-enter-password':
                checkConfirmPassword();
                break;
        }
    })
)}

const apiUrl = location.href.startsWith('http://localhost') 
? 'http://localhost:5000'
: '';

const register = async ({ first_name, last_name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                first_name,
                last_name,
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

const redirectUser = () => {
    document.location.hash = '/';
};

const submitRegister = () => {
    document.getElementById("register-form").addEventListener('submit', async (e) => {
        e.preventDefault();
        let isFirstNameValid = checkFirstName(),
            isLastNameValid = checkLastName(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword();
    
        let isFormValid = 
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;
    
        if(isFormValid) {
            const data = await register({
                first_name: document.getElementById("first_name").value,
                last_name: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            });
            if(data.error) {
                showMessage(data.error);
            }else {
                setUserInfo(data);
                redirectUser();
            }
        }
    })
}

checkEverything(), submitRegister();