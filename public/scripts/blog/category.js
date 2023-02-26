import { getUrl } from "../export/config.js";

document.getElementById('canonical').href = getUrl;
document.getElementById('og-url').content = getUrl;

const getCategory = document.getElementById('category-hidden').textContent;
document.getElementById('category-show').textContent = getCategory;
document.getElementById('category-show-2').textContent = getCategory;
document.getElementById('category-show-3').content = getCategory;
document.getElementById('category-show-4').content = getCategory;