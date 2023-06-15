const startButton = document.getElementById('startButton')

startButton.addEventListener('click', () => {
    fetch('http://localhost:3000/setup')
        .then(window.location.href = './website/pages/role.html');
});