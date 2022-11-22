import { getUrl } from "../export/config.js";
import { getUserInfo } from "../export/cookies.js";
import { showMessage } from "../export/utils.js";

//display login or create an account if not already logged in
const commentLogin = document.getElementById('comment-login');
const userInfo = getUserInfo();
commentLogin.innerHTML = `
    ${
        userInfo.first_name && userInfo.last_name
        ? ''
        : ` <p>
                <a href="/login">Login</a>
                    or
                <a href="/register">Create an Account</a> to comment
            </p>`
    }
`;

//display comment form if logged in
const leaveComment = document.getElementById('leave-comment');
leaveComment.innerHTML = `
    ${
        userInfo.first_name && userInfo.last_name
        ? ` <form class="comment-form" id="comment-form">
                <div class="form-field">
                    <label for="comment">Your Comment</label>
                    <textarea name="comment" class="comment" id="comment" rows="5" required></textarea>
                    <small></small>
                </div>
                <div class="form-btns">
                    <div>
                        <button type="submit">SAVE</button>
                    </div>
                    <div>
                        <a href="${getUrl}">Cancel</a>
                    </div>
                </div>
            </form>`
        : ''
    }
`;

const createComment = async (comment) => {
    try {
        const { token } = getUserInfo();
        const response = await axios({
            url: `${getUrl}/comment`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            data: comment
        });
        if(response.statusText !== 'Created') {
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err) {
        return { error: err.response.data.message || err.message };
    }
};

//comment validation
const commentContent = document.getElementById('comment');

const checkCommentContent = () => {
    let valid = false;
    const min = 3,
    max = 10000000000;
    const comment = commentContent.value.trim();
    if(!isRequired(comment)) {
        showError(comment, 'Sorry, comment cannot be empty');
    }else if (!isBetween(comment.length, min, max)) {
        showError(commentContent, `Sorry, comment must be at least ${min} characters long`);
    }else {
        showSuccess(commentContent);
        valid = true;
    }
    return valid;
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const showError = (textarea, message) => {
    // get the form-field element
    const formField = textarea.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');
    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
    
const showSuccess = (textarea) => {
    // get the form-field element
    const formField = textarea.parentElement;
    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');
    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
};

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

//check everything
document.getElementById('comment-form').addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'comment':
            checkCommentContent();
            break;
    }
}));

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    let isCommentContentValid = checkCommentContent();
    if(isCommentContentValid) {
        const data = await createComment({
            comment: document.getElementById('comment').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            showMessage('Comment Posted!', () => {
                console.log('Comment Posted!');
            });
        }
    }
});