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
  

  window.onload = async function () {
    const user = localStorage.getItem("username") || "User ";
    document.getElementById("welcome").textContent = "Welcome, " + user;
    document.getElementById("usernameDisplay").innerHTML = `<div class='info-box'><strong>Name:</strong> ${user}</div>`;
    await fetchCitizenData();
    await fetchLeaderboard();
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
  
   
  }
  
  async function fetchCitizenData() {
    const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage
    if (!userId) {
        console.error("User  ID not found in local storage.");
        return;
    }

    try {
        const response = await fetch(`/api/citizen/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch citizen data');
        }
        const data = await response.json();

        // Display the username from local storage
        const username = localStorage.getItem("username") || "User ";
        document.getElementById("usernameDisplay").innerHTML = `<div class='info-box'><strong>Name:</strong> ${username}</div>`;
        
        // Display total points and today's score
        document.getElementById("totalPoints").textContent = `Total Points: ${data.totalPoints}`;
        document.getElementById("todaysScore").textContent = `Today's Score: ${data.todaysScore}`;
    } catch (error) {
        console.error("Error fetching citizen data:", error);
    }
}


async function fetchAreaScores() {
  try {
    const res = await fetch('/api/citizen/leaderboard/area-scores');
    const data = await res.json();

    const labels = Object.keys(data);
    const scores = Object.values(data);

    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Points',
          data: scores,
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
  } catch (error) {
    console.error("Failed to load area scores:", error);
  }
}

async function fetchLeaderboard() {
  try {
    const res = await fetch('/api/citizen/leaderboard/top-citizens');
    const data = await res.json();

    const list = document.getElementById('leaderboardList');
    list.innerHTML = ''; // Clear default list

    data.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${user.name}</strong> - ${user.score} pts`;
      list.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to load leaderboard:", error);
  }
}


window.onload = async function () {
  const user = localStorage.getItem("username") || "User ";
  document.getElementById("welcome").textContent = "Welcome, " + user;

  await fetchCitizenData();
  await fetchLeaderboard();
  await fetchAreaScores();
};