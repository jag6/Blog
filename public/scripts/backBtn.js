import { getUserInfo } from "./cookies.js";

const { isAdmin } = getUserInfo();

const showDashboardBack = document.getElementById('hidden-a');
showDashboardBack.innerHTML = `
    ${
        isAdmin
        ? `<a class="btn blue" href="/dashboard#to-Dashboard">Back to Dashboard</a>`
        : `<a class="btn blue" href="/#articles-top">Back to Articles</a>`
    }
`;