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

function generateChart() {
    let chartType = document.getElementById('chartType').value;
    let dataToPlot = document.getElementById('dataToPlot').value;

    let labels = [];
    let data = [];

    if (dataToPlot === 'fragmentQuantity' || dataToPlot === 'fiberQuantity' || dataToPlot === 'total') {
        dataStorage.forEach((item, index) => {
            labels.push('Ponto ' + (index + 1));
            if (dataToPlot === 'fragmentQuantity') {
                data.push(item.fragmentQuantity);
            } else if (dataToPlot === 'fiberQuantity') {
                data.push(item.fiberQuantity);
            } else {
                data.push(item.fragmentQuantity + item.fiberQuantity);
            }
        });
    } else {
        let colorData = {
            blue: 0,
            red: 0,
            green: 0,
            yellow: 0,
            black: 0,
            white: 0,
            orange: 0,
            pink: 0,
            brown: 0,
            grey: 0,
            translucent: 0,
        };
        dataStorage.forEach(item => {
            for (let color in colorData) {
                colorData[color] += item.colors[color];
            }
        });
        labels = Object.keys(colorData);
        data = Object.values(colorData);
    }

    let ctx = document.getElementById('dataChart').getContext('2d');
    new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: 'Dados de Coleta',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function downloadChart() {
    let link = document.createElement('a');
    link.href = document.getElementById('dataChart').toDataURL();
    link.download = 'chart.png';
    link.click();
}
