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

    generateChart();
}

function clearForm() {
    let dataForm = document.getElementById('dataForm');
    dataForm.reset();
}

function generateChart() {
    let chartType = document.getElementById('chartType').value;
    let dataToPlot = document.getElementById('dataToPlot').value;

    let labels = [];
    let data = [];

    dataStorage.forEach((item, index) => {
        labels.push('Ponto ' + (index + 1));
        data.push(item[dataToPlot]);
    });

    let ctx = document.getElementById('dataChart').getContext('2d');
    if (window.dataChart) {
        window.dataChart.destroy();
    }

    window.dataChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: dataToPlot,
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

function downloadData() {
    let blob = new Blob([JSON.stringify(dataStorage)], { type: 'application/json' });
    saveAs(blob, 'data.json');
}

function downloadChart() {
    let canvas = document.getElementById('dataChart');
    canvas.toBlob(function (blob) {
        saveAs(blob, 'chart.png');
    });
}
