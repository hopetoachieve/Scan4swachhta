// dashboard.js
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  
    if (id === 'leaderboard') renderCharts();
  }
  
  function generateQR(data) {
    document.getElementById('qrcode').innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
      text: data,
      width: 150,
      height: 150
    });
  }
  
  function logout() {
    localStorage.clear();
    alert("Logged out successfully!");
    window.location.href = "citizenregister.html";
  }
  
  window.onload = function () {
    const user = localStorage.getItem("username") || "User";
    document.getElementById("welcome").textContent = "Welcome, " + user;
    document.getElementById("usernameDisplay").innerHTML = `<div class='info-box'><strong>Name:</strong> ${user}</div>`;
  };
  
  function renderCharts() {
    // Bar chart - Area wise scores
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Area A', 'Area B', 'Area C'],
        datasets: [{
          label: 'Points',
          data: [1000, 850, 920],
          backgroundColor: ['#28a745', '#56ab2f', '#a8e063']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Points by Area' }
        }
      }
    });
  
    // Pie chart - Waste segregation breakdown
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Dry Waste', 'Wet Waste', 'Hazardous Waste'],
        datasets: [{
          label: 'Waste Segregation',
          data: [50, 30, 20],
          backgroundColor: ['#f4c430', '#28a745', '#dc3545']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Waste Segregation' }
        }
      }
    });
  }
  