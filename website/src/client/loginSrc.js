const usernameLoginButton = document.querySelector('#usernameLoginButton');
const emailLoginButton = document.querySelector('#emailLoginButton');
const userProfile = document.querySelector('#userProfile');
const password = document.querySelector('#password');
const loginMsg = document.querySelector('#loginMsg');

usernameLoginButton.addEventListener('click', async () => {
    const result = await fetch('http://localhost:3000/login/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username: userProfile.value,
            password: password.value
        })
    }).then(res => res.json());
    if (result.message == 'Invalid credentials.') {
        loginMsg.innerHTML = result.message;
    } else {
        
    }
});

emailLoginButton.addEventListener('click', () => {

});