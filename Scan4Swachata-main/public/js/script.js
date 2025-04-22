// Set year in footer
document.getElementById('2025').textContent = new Date().getFullYear();

// Toggle theme and save to localStorage
function toggleTheme() {
  document.body.classList.toggle('dark-theme');

  // Save theme to localStorage
  const isDark = document.body.classList.contains('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme on load
window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
  }
};

