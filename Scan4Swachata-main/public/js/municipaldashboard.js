// authoritydashboard.js

function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  
    if (id === 'overview') loadOverviewData();
  }
  
  function logout() {
    alert("You have been logged out.");
    window.location.href = "index.html"; // Use relative path for deployment
  }
  
  
  function renderChart(scanData) {
    const ctx = document.getElementById('scanChart').getContext('2d');
    
    // Convert scansPerDay object to two arrays: labels and data
    const labels = Object.keys(scanData); // ['2025-04-15', ...]
    const values = Object.values(scanData); // [2, 5, 3, ...]
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // actual date strings
        datasets: [{
          label: 'Scans in Last 7 Days',
          data: values,
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Scan Activity (Last 7 Days)'
          },
          legend: {
            display: true
          }
        }
      }
    });
  }
  
  
  // Load default section
  window.onload = () => {
    showSection('overview');
  };

  // Load overview data when the page is loaded
  async function loadOverviewData() {
    try {
      const response = await fetch('/api/government/overview');
      const data = await response.json();
      
      document.querySelector('.widget-box:nth-child(1)').innerHTML = `<strong>Total Waste Today:</strong> ${data.totalWasteToday} kg`;
      document.querySelector('.widget-box:nth-child(2)').innerHTML = `<strong>Scans Today:</strong> ${data.scansToday}`;
      document.querySelector('.widget-box:nth-child(3)').innerHTML = `<strong>Top User:</strong> ${data.topUser}`;
      renderChart(data.scansPerDay); 
      const list = document.getElementById('heavyContributorsList');
      list.innerHTML = ''; // clear existing items

        data.heavyContributors.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.name} - ${user.email}`;
          list.appendChild(li);
        });


    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  }
  
  async function deleteCitizen() {
    const email = document.getElementById('citizenEmailInput').value.trim();
    if (!email) return alert('Please enter a citizen email.');
  
    try {
      const res = await fetch(`/api/government/citizens/${encodeURIComponent(email)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Error deleting citizen:', err);
      alert('Failed to delete citizen.');
    }
  }
  
  async function deleteCollector() {
    const collectorId = document.getElementById('collectorIdInput').value.trim();
    if (!collectorId) return alert('Please enter a collector ID.');
  
    try {
      const res = await fetch(`/api/government/collectors/${encodeURIComponent(collectorId)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error('Error deleting collector:', err);
      alert('Failed to delete collector.');
    }
  }
  