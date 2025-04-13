function collectorLogin() {
    const id = document.getElementById('collectorId').value;
    const pass = document.getElementById('collectorPass').value;
    if (id && pass) {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    }
}

function logoutCollector() {
    location.reload();
}

function showHowToRate() {
    document.getElementById('howToRate').style.display = 'block';
}

function hideHowToRate() {
    document.getElementById('howToRate').style.display = 'none';
}

function startQRScan() {
    let citizenName = prompt("Enter Citizen Name after scanning QR:");
    if (citizenName) {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('rateSection').style.display = 'block';
        document.getElementById('citizenName').innerText = citizenName;
    }
}

function connectWeighingMachine() {
    setTimeout(() => {
        alert("Weight received from machine: 2.5 Kg");
        submitData('machine', 2.5);
    }, 2000);
}

function manualEntry() {
    document.getElementById('rateSection').style.display = 'none';
    document.getElementById('manualEntrySection').style.display = 'block';
}

function submitData(type, weight = null) {
    if (type === 'manual') {
        weight = document.getElementById('manualWeight').value;
    }
    alert(`Rating Submitted with Weight: ${weight} Kg`);
    document.getElementById('manualEntrySection').style.display = 'none';
    document.getElementById('rateSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'block';
}

function goToDashboard() {
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
}
