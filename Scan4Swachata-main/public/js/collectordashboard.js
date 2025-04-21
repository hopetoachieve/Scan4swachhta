let html5QrCode;

function startScanner() {
  const qrRegionId = "qrcode-reader";
  const qrRegion = document.getElementById(qrRegionId);

  if (html5QrCode) {
    html5QrCode.clear().catch(err => console.error("Clear error:", err));
  }

  html5QrCode = new Html5Qrcode(qrRegionId);

  const config = { fps: 10, qrbox: 250 };

  html5QrCode.start(
    { facingMode: "environment" },
    config,
    (decodedText, decodedResult) => {
      console.log("QR Code Scanned:", decodedText);

      const name = decodedText.replace("User: ", "").trim();
      document.getElementById("citizenName").value = name;
      document.getElementById("scannedName").textContent = name; // <-- This line!

      alert("Scanned user: " + name);

      html5QrCode.stop().then(() => {
        console.log("Scanner stopped");
      }).catch((err) => console.error("Stop failed", err));
    },
    (errorMessage) => {
      // optionally log errors
    }
  ).catch((err) => {
    console.error("Start failed", err);
  });
}


document.getElementById('qrScanForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('citizenName').value.trim();
  const weight = parseFloat(document.getElementById('weight').value);
  const rating = parseInt(document.getElementById('rating').value);
  const collectorId = localStorage.getItem('collectorId');

  try {
    const res = await fetch('/api/collector/manual-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, weight, rating, collectorId })
    });

    const data = await res.json();
    alert(data.message || 'Entry submitted!');

    document.getElementById('qrScanForm').reset();
    document.getElementById('scannedName').textContent = 'None';
  } catch (err) {
    console.error('Submission error:', err);
    alert('Something went wrong!');
  }
});



function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
      section.classList.add('hidden');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  function logout() {
    localStorage.removeItem('collectorId');
    window.location.href = 'collectorlogin.html';
  }
  
  function startQRScan() {
    // In a real app, this would activate the camera for QR scanning
    alert('QR scanner would activate here in a real app');
    document.getElementById('ratingSection').classList.remove('hidden');
  }
  
  async function submitRating() {
    const rating = document.getElementById('rating').value;
    const collectorId = localStorage.getItem('collectorId');
  
    if (rating >= 1 && rating <= 10) {
      const res = await fetch('/collector/rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectorId, rating: Number(rating) })
      });
  
      const data = await res.json();
      alert(data.message);
      document.getElementById('ratingSection').classList.add('hidden');
      document.getElementById('rating').value = '';
      loadDashboardData();
      showSection('dashboard');
    } else {
      alert('Please enter a valid rating between 1 and 10');
    }
  }
  
  
  // Initialize dashboard
  document.addEventListener('DOMContentLoaded', function() {
    const collectorId = localStorage.getItem('collectorId');
    if (!collectorId) {
      window.location.href = 'collectorlogin.html';
    } else {
      document.getElementById('welcome').textContent = `Welcome, Collector ${collectorId}`;
    }
  });
  async function loadDashboardData() {
    const collectorId = localStorage.getItem('collectorId');
    const res = await fetch(`/api/collector/dashboard/${collectorId}`);
    if (!res.ok) {
      throw new Error(`Failed to load dashboard data: ${res.status}`);
    }
     
    const data = await res.json();
  
    document.getElementById('todaysCollections').textContent = `Today's Collections: ${data.todaysCollections}`;
    document.getElementById('totalRated').textContent = `Total Rated: ${data.totalRated} households`;
    document.getElementById('avgRating').textContent = `Average Rating Given: ${data.avgRating}/10`;

  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const collectorId = localStorage.getItem('collectorId');
    if (!collectorId) {
      window.location.href = 'collectorlogin.html';
    } else {
      document.getElementById('welcome').textContent = `Welcome, Collector ${collectorId}`;
      loadDashboardData();
    }
    document.getElementById("startScannerBtn").addEventListener("click", startScanner);

  });
  
  document.getElementById('manualEntryForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('citizenName').value.trim();
    const weight = parseFloat(document.getElementById('weight').value);
    const rating = parseInt(document.getElementById('rating').value);
  
    // Ideally, the collectorId is stored in localStorage after login
    const collectorId = localStorage.getItem('collectorId');
  
    try {
      const res = await fetch('/api/collector/manual-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, weight, rating, collectorId })
      });
  
      const data = await res.json();
      alert(data.message || 'Entry submitted!');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong!');
    }
  });
  
  window.onload = async function () {// Push a new state to history so there's something to go "back" to
    history.pushState(null, null, location.href);
    
    // Now listen for back/forward navigation
    window.addEventListener('popstate', function (event) {
      // Push user back forward again
      history.pushState(null, null, location.href);
    
      // Show SweetAlert popup
      Swal.fire({
        icon: 'warning',
        title: 'Logout First!',
        text: 'You need to log out before leaving the dashboard.',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#3085d6'
      });
    });
  };


 
 

  
  