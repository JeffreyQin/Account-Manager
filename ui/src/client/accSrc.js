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

resetButton.addEventListener('click', async () => {
    constructResetPanel();
});

logoutButton.addEventListener('click', () => {
    window.location.href = './login.html';
});

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
    changeButton.innerHTML = 'Update';
    const changeMsg = document.createElement('label');
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
        if (changeResult.code == 0) {
            const updatedResult = await fetch(`http://localhost:3000/account/info?id=${document.cookie}`)
                .then(res => res.json());
            constructInfoPanel(updatedResult);
            welcomeTitle.innerHTML = `Welcome, ${updatedResult.username}`;
        } else {
            changeMsg.innerHTML = changeResult.message;
        }
    });

    emailButton.addEventListener('click', () => {
        changeLabel.innerHTML = "New email: ";
        changeMsg.innerHTML = "";
        accPanel.appendChild(changePanel);
    });

    usernameButton.addEventListener('click', () => {
        changeLabel.innerHTML = "New username: ";
        changeMsg.innerHTML = "";
        accPanel.appendChild(changePanel);
    });
}

function constructResetPanel() {
    accPanel.innerHTML = '';
    const oldPwPanel = document.createElement('div');
    const oldPwLabel = document.createElement('label');
    oldPwLabel.setAttribute('for', 'oldPwInput');
    oldPwLabel.innerHTML = 'Old password: '
    const oldPwInput = document.createElement('input');
    oldPwInput.setAttribute('id', 'oldPwInput');
    oldPwPanel.appendChild(oldPwLabel);
    oldPwPanel.appendChild(oldPwInput);
    const newPwPanel = document.createElement('div');
    const newPwLabel = document.createElement('label');
    newPwLabel.setAttribute('for', 'newPwInput');
    newPwLabel.innerHTML = 'New password: '
    const newPwInput = document.createElement('input');
    newPwInput.setAttribute('id', 'newPwInput');
    newPwPanel.appendChild(newPwLabel);
    newPwPanel.appendChild(newPwInput);
    const confirmPwPanel = document.createElement('div');
    const confirmPwLabel = document.createElement('label');
    confirmPwLabel.setAttribute('for', 'confirmPwInput');
    confirmPwLabel.innerHTML = 'Confirm new password: '
    const confirmPwInput = document.createElement('input');
    confirmPwInput.setAttribute('id', 'confirmPwInput');
    confirmPwPanel.appendChild(confirmPwLabel);
    confirmPwPanel.appendChild(confirmPwInput);
    const resetButton = document.createElement('button');
    resetButton.innerHTML = 'Reset password';
    const resetMsg = document.createElement('label');
    accPanel.appendChild(oldPwPanel);
    accPanel.appendChild(newPwPanel);
    accPanel.appendChild(confirmPwPanel);
    accPanel.appendChild(resetButton);
    accPanel.appendChild(resetMsg);

    resetButton.addEventListener('click', async () => {
        const result = await fetch('http://localhost:3000/account/update/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                id: document.cookie,
                oldPw: oldPwInput.value,
                newPw: newPwInput.value,
                confirmPw: confirmPwInput.value
            })
        }).then(res => res.json());
        resetMsg.innerHTML = result.message;
    })
}