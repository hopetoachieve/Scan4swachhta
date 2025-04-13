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
  
  function submitRating() {
    const rating = document.getElementById('rating').value;
    if (rating && rating >= 1 && rating <= 10) {
      alert(`Rating ${rating} submitted successfully!`);
      document.getElementById('ratingSection').classList.add('hidden');
      document.getElementById('rating').value = '';
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