import { getUserInfo } from "../export/cookies.js"; 

const { isAdmin } = getUserInfo();

const headerRight = document.getElementById('header-right');
headerRight.innerHTML = ` 
    ${
        isAdmin 
        ? ` <a href="/dashboard"><img class="user-icon" src="/images/user.svg" alt="user icon"></a>`
        : ` <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>`
    } 
`;