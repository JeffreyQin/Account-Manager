const infoButton = document.getElementById('infoButton');
const resetButton = document.getElementById('resetPasswordButton');
const logoutButton = document.getElementById('logoutButton');
const welcomeTitle = document.getElementById('welcomeTitle');

document.addEventListener('DOMContentLoaded', async () => {
    welcomeTitle.innerHTML = `Welcome, ${document.cookie}`;
});

infoButton.addEventListener('click', () => {});

resetButton.addEventListener('click', () => {});

logoutButton.addEventListener('click', () => {});