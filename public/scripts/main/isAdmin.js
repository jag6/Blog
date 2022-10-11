import { getUserInfo } from "../export/cookies.js"; 

const { isAdmin } = getUserInfo();

const headerRight = document.getElementById('header-right');
headerRight.innerHTML = ` 
    ${
        isAdmin 
        ? ` <ul>
                <li><a href="/dashboard">Dashboard</a></li>
            </ul>`
        : ` <ul>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>`
    } 
`;