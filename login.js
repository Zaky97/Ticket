import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiA-CPBjHgdNMSkECYJ3D55S-OJWeRpNM",
  authDomain: "noir-b0cf8.firebaseapp.com",
  databaseURL:
    "https://noir-b0cf8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "noir-b0cf8",
  storageBucket: "noir-b0cf8.appspot.com",
  messagingSenderId: "265741421264",
  appId: "1:265741421264:web:5d6af087a996b58a9cecd5",
  measurementId: "G-CDZKCSXS56",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Function to display modal box with alert message
const showAlertModal = (message) => {
  const modal = document.getElementById("myModal");
  const modalMessage = document.getElementById("modal-message");
  const closeButton = document.getElementsByClassName("close")[0];

  modalMessage.textContent = message;
  modal.style.display = "block";

  // Close the modal when the close button is clicked
  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  // Close the modal when clicking anywhere outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// Function to handle sign-up
const signUp = async (email, password) => {
  try {
    // Try to create a new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification
    await sendEmailVerification(auth.currentUser);

    // Sign-up successful, you can add further logic here
    console.log("Sign-up successful:", userCredential.user.uid);
    showAlertModal(
      "Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi."
    );
    const sign_in_btn = document.getElementById("sign-in-btn");
    sign_in_btn.click();
    sign_in_btn.addEventListener("click", () => {
      container.classList.add("sign-in-mode");
    });
  } catch (error) {
    // Handle sign-up errors
    console.error("Sign-up error:", error.message);
    if (error.code === "auth/email-already-in-use") {
      showAlertModal("Email Sudah Digunakan");
    } else {
      showAlertModal("Terjadi kesalahan saat mendaftar pengguna baru.");
    }
  }
};

// Function to handle sign-in
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Sign-in successful:", userCredential.user.uid);
    window.location.replace("main/main.html");
  } catch (error) {
    console.error("Sign-in error:", error.message);
    showAlertModal("Akun Tidak Ditemukan");
  }
};

// Event listener for sign-in form submission
document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(
    ".sign-in-form input[type='email']"
  ).value;
  const password = document.querySelector(
    ".sign-in-form input[type='password']"
  ).value;
  signIn(email, password);
});

// Event listener for sign-up form submission
document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector(
    ".sign-up-form input[type='email']"
  ).value;
  const password = document.querySelector(
    ".sign-up-form input[type='password']"
  ).value;
  signUp(email, password);
});
