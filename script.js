let dataStorage = [];

function saveData() {
    let dataForm = document.getElementById('dataForm');
    let data = {
        point: dataForm.point.value,
        latitude: parseFloat(dataForm.latitude.value),
        longitude: parseFloat(dataForm.longitude.value),
        tideCondition: dataForm.tideCondition.value,
        waterCondition: dataForm.waterCondition.value,
        observations: dataForm.observations.value,
        time: dataForm.time.value,
    };
    dataStorage.push(data);

    displayData();
    clearForm();
}

function displayData() {
    let dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '';
    dataStorage.forEach((data, index) => {
        let dataItem = document.createElement('div');
        dataItem.className = 'dataItem';
        dataItem.innerHTML = `
            <strong>Ponto:</strong> ${data.point}<br>
            <strong>Latitude:</strong> ${data.latitude}<br>
            <strong>Longitude:</strong> ${data.longitude}<br>
            <strong>Condição da Maré:</strong> ${data.tideCondition}<br>
            <strong>Condição da Água:</strong> ${data.waterCondition}<br>
            <strong>Observações:</strong> ${data.observations}<br>
            <strong>Hora:</strong> ${data.time}<br>
        `;
        dataDisplay.appendChild(dataItem);
    });
}

function clearForm() {
    let dataForm = document.getElementById('dataForm');
    dataForm.reset();
}

function downloadData() {
    let blob = new Blob([JSON.stringify(dataStorage)], { type: 'application/json' });
    saveAs(blob, 'data.json');
}
