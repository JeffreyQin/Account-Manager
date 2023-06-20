const usernameLoginButton = document.querySelector('#usernameLoginButton');
const emailLoginButton = document.querySelector('#emailLoginButton');
const userProfile = document.querySelector('#userProfile');
const password = document.querySelector('#password');
const loginMsg = document.querySelector('#loginMsg');

usernameLoginButton.addEventListener('click', async () => {
    fetch('http://localhost:3000/login/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username: userProfile.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.message == 'Invalid credentials.') {
            loginMsg.innerHTML = res.message;
        } else {
            document.cookie = res.id;
            window.location.href = './account.html'
        }
    });
});

emailLoginButton.addEventListener('click', async () => {
    fetch('http://localhost:3000/login/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email: userProfile.value,
            password: password.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.message == 'Invalid credentials.') {
            loginMsg.innerHTML = res.message;
        } else {
            document.cookie = res.id;
            window.location.href = './account.html'
        }
    })
});