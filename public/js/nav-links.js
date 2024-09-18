// Mendapatkan URL saat ini
const currentUrl = window.location.pathname;

// Mendapatkan semua elemen dengan class nav-link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  // Jika href dari link sesuai dengan URL saat ini, tambahkan class active
  if (link.getAttribute('href') === currentUrl) {
    link.classList.add('active');
  }
});