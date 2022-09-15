const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
};
  
const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
};

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

const redirectUser = () => {
    document.location.hash = '/';
};