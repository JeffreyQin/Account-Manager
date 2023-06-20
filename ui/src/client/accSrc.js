const infoButton = document.getElementById('infoButton');
const resetButton = document.getElementById('resetPasswordButton');
const logoutButton = document.getElementById('logoutButton');
const welcomeTitle = document.getElementById('welcomeTitle');
const accPanel = document.getElementById('accountPanel');

document.addEventListener('DOMContentLoaded', async () => {
    welcomeTitle.innerHTML = `Welcome, ${document.cookie}`;
});

infoButton.addEventListener('click', async () => {
    const result = await fetch(`http://localhost:3000/account/info?user=${document.cookie}`)
        .then(res => res.json());

    constructInfoPanel(result.email, result.username);
});

resetButton.addEventListener('click', () => {});

logoutButton.addEventListener('click', () => {});

function constructInfoPanel(email, username) {
}