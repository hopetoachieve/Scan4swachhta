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
    const res = await fetch(`/collector/dashboard/${collectorId}`);
    const data = await res.json();
  
    document.querySelector('#dashboard p:nth-child(2)').textContent = `Today's Collections: ${data.todaysCollections}`;
    document.querySelector('#dashboard p:nth-child(3)').textContent = `Total Rated: ${data.totalRated} households`;
    document.querySelector('#dashboard p:nth-child(4)').textContent = `Average Rating Given: ${data.avgRating}/10`;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const collectorId = localStorage.getItem('collectorId');
    if (!collectorId) {
      window.location.href = 'collectorlogin.html';
    } else {
      document.getElementById('welcome').textContent = `Welcome, Collector ${collectorId}`;
      loadDashboardData();
    }
  });
  