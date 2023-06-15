const showButton = document.querySelector('#showButton');
const removeButton = document.querySelector('#removeButton');
const modPanel = document.querySelector('#modPanel');

showButton.addEventListener('click', async () => {
    const result = await fetch('http://localhost:3000/mod/show')
        .then(res => res.json())
        .then(res => res.data);
    
    modPanel.innerHTML = '';
    for (record of result) {
        const recordText = document.createElement('p');
        recordText.innerHTML = `
            id: ${record.id}, email: ${record.email}, username: ${record.username}, password: ${record.password}
        `;
        modPanel.appendChild(recordText);
    }
})

removeButton.addEventListener('click', async () => {
    modPanel.innerHTML = '';
})