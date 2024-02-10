// cookie.js

// Fungsi untuk memeriksa apakah pengguna sudah login
function checkLogin() {
  const userLoggedInCookie = "userLoggedIn=true";
  return document.cookie.includes(userLoggedInCookie);
}

// Fungsi untuk mengarahkan pengguna kembali ke halaman login jika belum login
function redirectIfNotLoggedIn() {
  if (!checkLogin()) {
    window.location.replace("../index.html"); // Ganti "../login.html" dengan lokasi yang sesuai
  }
}

// Pemanggilan fungsi untuk memeriksa login pada saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  redirectIfNotLoggedIn();
});
