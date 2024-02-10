import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const database = getDatabase(app);

// Get a reference to the form
const form = document.querySelector("form");

// Add submit event listener to the form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  const name = form.querySelector("#name").value;
  const email = form.querySelector("#email").value;
  const tel = form.querySelector("#tel").value;

  // Push data to the database
  const ticketsRef = ref(database, "Preorder");
  push(ticketsRef, {
    name: name,
    email: email,
    tel: tel,
  })
    .then(() => {
      // Reset the form after successful submission
      form.reset();
      // Display success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Form submitted successfully!",
        showConfirmButton: false,
        timer: 2000, // Auto close after 2 seconds
      });
    })
    .catch((error) => {
      // Handle errors
      console.error("Error submitting form:", error);
    });
});
