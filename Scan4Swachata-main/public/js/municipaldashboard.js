// authoritydashboard.js

function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  
    if (id === 'overview') renderChart();
  }
  
  function logout() {
    alert("You have been logged out.");
    window.location.href = "D:\Scan4Swachata-main\Scan4Swachata-main\S4S\Scan4swachhta\Scan4Swachata-main\public\index.html";
  }
  
  function renderChart() {
    const ctx = document.getElementById('scanChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Scans per Day',
          data: [12, 19, 14, 17, 22, 26, 30],
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
            text: 'Weekly Scan Trends'
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
