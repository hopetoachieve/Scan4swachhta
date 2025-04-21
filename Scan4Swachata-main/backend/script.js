// script.js
// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
function toggleTheme() {
  const current = document.body.style.background;
  if (!current || current.includes('f6f9f6')) {
    document.body.style.background = '#1f1f1f';
    document.body.style.color = '#eee';
  } else {
    document.body.style.background = '#f6f9f6';
    document.body.style.color = '#333';
  }
}
