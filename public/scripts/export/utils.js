export const showMessage = (message, callback) => {
    document.getElementById('message-overlay').innerHTML =
    `
        <div>
            <div id="message-overlay-content">
                <p>${message}</p>
            </div>
            <button id="message-overlay-close-btn" class="message-overlay-close-btn">OK</button>
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

export const escapeHTML = (unsafe_str) => {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
};