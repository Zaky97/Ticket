import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

// Function to handle sign-up and send email verification
const signUpAndSendEmailVerification = async (email, password) => {
  try {
    // Check if the email has been used
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      throw new Error("Email Sudah Digunakan");
    }

    // Create a new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification
    await sendEmailVerification(auth.currentUser);

    // Sign-up successful
    console.log("Sign-up successful:", userCredential.user.uid);
    Swal.fire({
      icon: "success",
      title: "Pendaftaran Berhasil!",
      text: "Silakan periksa email Anda untuk verifikasi.",
    }).then(() => {
      const sign_in_btn = document.getElementById("sign-in-btn");
      sign_in_btn.click();
      sign_in_btn.addEventListener("click", () => {
        container.classList.add("sign-in-mode");
      });
    });
  } catch (error) {
    // Handle sign-up errors
    console.error("Sign-up error:", error.message);
    if (error.message === "Email Sudah Digunakan") {
      Swal.fire({
        icon: "error",
        title: "Email Sudah Digunakan",
        text: "Gunakan email lain atau gunakan opsi lupa password.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat mendaftar pengguna baru.",
      });
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
    Swal.fire({
      icon: "error",
      title: "Akun Tidak Ditemukan",
      text: "Pastikan email dan password Anda benar.",
    });
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
  signUpAndSendEmailVerification(email, password);
});
