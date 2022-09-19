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

const { isAdmin } = getUserInfo();

const headerRight = document.getElementById('header-right');
headerRight.innerHTML = ` 
    ${
        isAdmin 
        ? `<ul><li><a href="/dashboard">Dashboard</a></li></ul>`
        : ''
    } 
`;

const showDashboardBack = document.getElementById('hidden-a');
showDashboardBack.innerHTML = `
    ${
        isAdmin
        ? `<a class="btn blue" href="/dashboard#to-Dashboard">Back to Dashboard</a>`
        : `<a class="btn blue" href="/#articles-top">Back to Articles</a>`
    }
`;