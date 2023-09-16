let dataStorage = [];

function saveData() {
    let dataForm = document.getElementById('dataForm');
    let data = {
        point: dataForm.point.value,
        latitude: dataForm.latitude.value,
        longitude: dataForm.longitude.value,
        tideCondition: dataForm.tideCondition.value,
        waterCondition: dataForm.waterCondition.value,
        fragmentQuantity: parseInt(dataForm.fragmentQuantity.value),
        fiberQuantity: parseInt(dataForm.fiberQuantity.value),
        colors: {
            blue: parseInt(dataForm.blue.value),
            red: parseInt(dataForm.red.value),
            green: parseInt(dataForm.green.value),
            yellow: parseInt(dataForm.yellow.value),
            black: parseInt(dataForm.black.value),
            white: parseInt(dataForm.white.value),
            orange: parseInt(dataForm.orange.value),
            pink: parseInt(dataForm.pink.value),
            brown: parseInt(dataForm.brown.value),
            grey: parseInt(dataForm.grey.value),
            translucent: parseInt(dataForm.translucent.value),
        },
        observations: dataForm.observations.value,
        date: dataForm.date.value,
        time: dataForm.time.value,
    };
    dataStorage.push(data);

    displayData();
}

function displayData() {
    let dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = '';
    dataStorage.forEach((data, index) => {
        let dataItem = document.createElement('div');
        dataItem.className = 'dataItem';
        dataItem.innerText = `Ponto: ${data.point}, Latitude: ${data.latitude}, Longitude: ${data.longitude}, Quantidade de Fragmentos: ${data.fragmentQuantity}, Quantidade de Fibras: ${data.fiberQuantity}`;
        dataDisplay.appendChild(dataItem);
    });
}

function downloadData() {
    let blob = new Blob([JSON.stringify(dataStorage)], { type: 'application/json' });
    saveAs(blob, 'data.json');
}

