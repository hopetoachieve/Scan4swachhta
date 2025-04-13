function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  function generateQR() {
    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
      text: "User123-Dustbin-QR",
      width: 128,
      height: 128,
    });
  }
  
  function logout() {
    window.location.href = "citizen.html";
  }
  