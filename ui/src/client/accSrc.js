const infoButton = document.getElementById('infoButton');
const resetButton = document.getElementById('resetPasswordButton');
const logoutButton = document.getElementById('logoutButton');
const welcomeTitle = document.getElementById('welcomeTitle');
const accPanel = document.getElementById('accountPanel');

document.addEventListener('DOMContentLoaded', async () => {
    fetch (`http://localhost:3000/account/info?id=${document.cookie}`)
        .then(res => res.json())
        .then(res => welcomeTitle.innerHTML = `Welcome, ${res.username}`);
});

infoButton.addEventListener('click', async () => {
    const result = await fetch(`http://localhost:3000/account/info?id=${document.cookie}`)
        .then(res => res.json());
    constructInfoPanel(result);
});

resetButton.addEventListener('click', () => {});

logoutButton.addEventListener('click', () => {});

function constructInfoPanel(email, username) {
}

function constructInfoPanel(result) {
    accPanel.innerHTML =  '';
    const emailPanel = document.createElement('div');
    const emailLabel = document.createElement('label');
    emailLabel.innerHTML = `<b>Email:</b> ${result.email} `;
    const emailButton = document.createElement('button');
    emailButton.innerHTML = 'Change email'
    emailPanel.appendChild(emailLabel);
    emailPanel.appendChild(emailButton);
    const usernamePanel = document.createElement('div');
    const usernameLabel = document.createElement('label');
    usernameLabel.innerHTML = `<b>Username:</b> ${result.username} `;
    const usernameButton = document.createElement('button');
    usernameButton.innerHTML = 'Change username';
    usernamePanel.appendChild(usernameLabel);
    usernamePanel.appendChild(usernameButton);
    const changePanel = document.createElement('div');
    const changeLabel = document.createElement('label');
    const changeInput = document.createElement('input');
    const changeButton = document.createElement('button');
    const changeMsg = document.createElement('label');
    changeButton.innerHTML = 'Update';
    changePanel.appendChild(changeLabel);
    changePanel.appendChild(changeInput);
    changePanel.appendChild(changeButton);
    changePanel.appendChild(changeMsg);
    accPanel.appendChild(emailPanel);
    accPanel.appendChild(usernamePanel);

    changeButton.addEventListener('click', async () => {
        var changeResult;
        if (changeLabel.innerHTML.includes('email')) {
            changeResult = await fetch('http://localhost:3000/account/update/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id: document.cookie,
                    email: changeInput.value
                })
            }).then(res => res.json());
        } else {
            changeResult = await fetch('http://localhost:3000/account/update/username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id: document.cookie,
                    username: changeInput.value
                })
            }).then(res => res.json());
        }
        changeMsg.innerHTML = changeResult.message;
    });

    emailButton.addEventListener('click', () => {
        changeLabel.innerHTML = "New email: ";
        accPanel.appendChild(changePanel);
    });

    usernameButton.addEventListener('click', () => {
        changeLabel.innerHTML = "New username: ";
        accPanel.appendChild(changePanel);
    });
}