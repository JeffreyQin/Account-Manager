const usernameLoginButton = document.querySelector('#usernameLoginButton');
const emailLoginButton = document.querySelector('#emailLoginButton');
const userProfile = document.querySelector('#userProfile');
const password = document.querySelector('#password');

usernameLoginButton.addEventListener('click', async () => {
    const res = await fetch('http://localhost:3000/login/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username: userProfile.value,
            password: password.value
        })
    });
});

emailLoginButton.addEventListener('click', () => {

});