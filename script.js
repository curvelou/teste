let data = JSON.parse(localStorage.getItem('data')) || [];

function addData() {
    const point = document.getElementById('point').value;
    const coordinates = document.getElementById('coordinates').value;
    const tideCondition = document.getElementById('tideCondition').value;
    const waterCondition = document.getElementById('waterCondition').value;

    const newData = { point, coordinates, tideCondition, waterCondition };
    data.push(newData);
    localStorage.setItem('data', JSON.stringify(data));
    displayData();
}

function displayData() {
    const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';
    data.forEach((item, index) => {
        const row = dataTable.insertRow();
        row.insertCell(0).innerHTML = item.point;
        row.insertCell(1).innerHTML = item.coordinates;
        row.insertCell(2).innerHTML = item.tideCondition;
        row.insertCell(3).innerHTML = item.waterCondition;
    });
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Ponto,Coordenadas,Condição de Maré,Condição da Água\n";

    data.forEach(item => {
        csvContent += `${item.point},${item.coordinates},${item.tideCondition},${item.waterCondition}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
}

window.onload = displayData;
