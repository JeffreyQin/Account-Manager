const registerButton = document.querySelector('#registerButton');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

registerButton.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email: emailInput.value,
            username: usernameInput.value,
            password: passwordInput.value
        })
    })
});