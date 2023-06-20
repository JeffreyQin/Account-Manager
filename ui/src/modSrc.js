const showButton = document.querySelector('#showButton');
const removeButton = document.querySelector('#removeButton');
const showPanel = document.querySelector('#showPanel');
const removePanel = document.querySelector('#removePanel');

showButton.addEventListener('click', async () => {
    const result = await fetch('http://localhost:3000/mod/show')
        .then(res => res.json())
        .then(res => res.data);
    
    showPanel.innerHTML = '';
    removePanel.innerHTML = '';
    for (record of result) {
        const recordText = document.createElement('p');
        recordText.innerHTML = generateText(record);
        showPanel.appendChild(recordText);
    }
})

removeButton.addEventListener('click', async () => {
    removePanel.innerHTML = '';
    const removeForm = document.createElement('form');
    const removeLabel = document.createElement('label');
    removeLabel.setAttribute('for', 'removeInput');
    removeLabel.innerHTML = 'Enter account ID to remove:'
    const removeInput = document.createElement('input');
    removeInput.setAttribute('type', 'input');
    removeInput.setAttribute('id', 'removeInput');
    const removeConfirmButton = document.createElement('button');
    removeConfirmButton.setAttribute('type', 'submit');
    removeConfirmButton.setAttribute('id', 'removeButton');
    removeConfirmButton.innerHTML = 'Confirm';
    removeForm.appendChild(removeLabel);
    removeForm.appendChild(removeInput);
    removeForm.appendChild(removeConfirmButton);
    removePanel.appendChild(removeForm);

    removeConfirmButton.addEventListener('click', () => {
        fetch('http://localhost:3000/mod/remove', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: removeInput.value
            })
        });
    });
})

function generateText(record) {
    return `
        <b>ID:</b> ${record.id},
        <b>email:</b> ${record.email},
        <b>username:</b> ${record.username},
        <b>password:</b> ${record.password}`
}