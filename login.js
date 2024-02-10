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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const signUpAndSendEmailVerification = async (email, password) => {
  try {
    if (password.length < 8) {
      throw new Error("Password harus terdiri dari minimal 8 karakter.");
    }

    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods && methods.length > 0) {
      throw new Error("Email Sudah Digunakan");
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(auth.currentUser);

    console.log("Sign-up successful:", userCredential.user.uid);
    Swal.fire({
      icon: "success",
      title: "Pendaftaran Berhasil!",
      text: "Silakan periksa email Anda untuk verifikasi.",
    }).then(() => {
      showSignIn();
    });
  } catch (error) {
    let errorMessage = "Terjadi kesalahan saat mendaftar pengguna baru.";
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "Email sudah digunakan. Gunakan email lain atau gunakan opsi lupa password.";
        break;
      case "auth/weak-password":
        errorMessage =
          "Password terlalu lemah. Gunakan password dengan minimal 8 karakter.";
        break;
      default:
        errorMessage = error.message;
        break;
    }
    Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: errorMessage,
    });
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    document.cookie = "userLoggedIn=true";
    window.location.replace("main/main.html");
    document.getElementById("email").value = email;
    console.log("Sign-in successful:", userCredential.user.uid);
  } catch (error) {
    let errorMessage = "Pastikan email dan password Anda benar.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "Akun tidak ditemukan.";
    }
    Swal.fire({
      icon: "error",
      title: "Gagal Masuk",
      text: errorMessage,
    });
  }
};

const showSignIn = () => {
  const sign_in_btn = document.getElementById("sign-in-btn");
  sign_in_btn.click();
  sign_in_btn.addEventListener("click", () => {
    container.classList.add("sign-in-mode");
  });
};

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
