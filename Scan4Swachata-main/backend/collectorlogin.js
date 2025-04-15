function collectorLogin() {
    const id = document.getElementById('collectorId').value;
    const pass = document.getElementById('collectorPass').value;
    
    if (!id || !pass) {
      alert('Please enter both ID and password');
      return;
    }
    
    // Simple validation
    if (id.length < 4 || pass.length < 6) {
      alert('Invalid credentials. ID should be at least 4 characters and password at least 6.');
      return;
    }
    
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }
  
  function logoutCollector() {
    // Clear any session data if needed
    document.getElementById('collectorId').value = '';
    document.getElementById('collectorPass').value = '';
    
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('howToRate').style.display = 'none';
    document.getElementById('rateSection').style.display = 'none';
    document.getElementById('manualEntrySection').style.display = 'none';
    document.getElementById('successSection').style.display = 'none';
  }
  
  function showHowToRate() {
    document.getElementById('howToRate').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
  }
  
  function hideHowToRate() {
    document.getElementById('howToRate').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }
  
  function startQRScan() {
    // In a real app, this would interface with a QR scanner
    let citizenName = prompt("Enter Citizen Name after scanning QR:");
    
    if (citizenName) {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('rateSection').style.display = 'block';
      document.getElementById('citizenName').textContent = citizenName;
    }
  }
  
  function connectWeighingMachine() {
    // Simulate connecting to a weighing machine
    document.getElementById('rating').focus();
    
    setTimeout(() => {
      const weight = (Math.random() * 5 + 0.5).toFixed(1); // Random weight between 0.5-5.5 kg
      alert(`Weight received from machine: ${weight} Kg`);
      submitData('machine', parseFloat(weight));
    }, 2000);
  }
  
  function manualEntry() {
    document.getElementById('rateSection').style.display = 'none';
    document.getElementById('manualEntrySection').style.display = 'block';
    document.getElementById('manualWeight').focus();
  }
  
  function submitData(type, weight = null) {
    if (type === 'manual') {
      weight = document.getElementById('manualWeight').value;
      if (!weight || isNaN(weight) || weight <= 0) {
        alert('Please enter a valid weight');
        return;
      }
      weight = parseFloat(weight);
    }
    
    const rating = document.getElementById('rating').value;
    if (!rating || rating < 1 || rating > 10) {
      alert('Please enter a valid rating between 1 and 10');
      return;
    }
    
    // In a real app, this would send data to the server
    console.log(`Submitting data - Rating: ${rating}, Weight: ${weight}kg, Type: ${type}`);
    
    document.getElementById('manualEntrySection').style.display = 'none';
    document.getElementById('rateSection').style.display = 'none';
    document.getElementById('successSection').style.display = 'block';
    
    // Reset form for next entry
    document.getElementById('rating').value = '';
    if (type === 'manual') {
      document.getElementById('manualWeight').value = '';
    }
  }
  
  function goToDashboard() {
    document.getElementById('successSection').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }