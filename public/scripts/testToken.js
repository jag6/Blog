import { getUserInfo } from "./export/cookies.js";

const { token } = getUserInfo();

document.getElementById('user-info').innerHTML = token;