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

dataStorage.push(data);  // Adicione os dados à matriz de armazenamento.

    displayData();
    clearForm();

    // Serialize e salve os dados em um arquivo de texto (.txt).
    saveToTxtFile(dataStorage, 'data.txt');
}

function displayData() {
    // ... Código para exibir os dados ...
}

function clearForm() {
    // ... Código para limpar o formulário ...
}

function saveToTxtFile(data, filename) {
    let textData = JSON.stringify(data, null, 2); // Transforma os dados em formato de texto (JSON indentado).
    let blob = new Blob([textData], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);

    let a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    // Limpar a URL criada após o download.
    URL.revokeObjectURL(url);
}
