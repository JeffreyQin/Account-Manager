const infoButton = document.getElementById('infoButton');
const resetButton = document.getElementById('resetPasswordButton');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('yee')
    const result = await fetch('http://localhost:3000/account/load')
        .then(res => res.json());
    console.log(result.data);
})