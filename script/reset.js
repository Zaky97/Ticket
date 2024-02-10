import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase initialization
const auth = getAuth();

// Function to reset password
const resetPassword = async (email) => {
  try {
    // Check if the email is from Gmail
    if (!email.endsWith("@gmail.com")) {
      throw new Error("Only Gmail addresses are allowed.");
    }

    // Send password reset email
    await sendPasswordResetEmail(auth, email);
    Swal.fire({
      icon: "success",
      title: "Email Sent",
      text: "Please check your email to reset your password.",
    });
  } catch (error) {
    // Handle reset password errors
    let errorMessage = "Failed to send password reset email.";
    if (error.code === "auth/user-not-found") {
      errorMessage = "Account not found.";
    }
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  }
};

// Event listener for reset password button
document.getElementById("lupapw").addEventListener("click", () => {
  Swal.fire({
    title: "Reset Password",
    html: '<input id="swal-input-email" class="swal2-input" placeholder="Enter your email">',
    focusConfirm: false,
    preConfirm: () => {
      const email = Swal.getPopup().querySelector("#swal-input-email").value;
      if (!email) {
        Swal.showValidationMessage("Email is required");
      }
      return email;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const email = result.value;
      resetPassword(email);
    }
  });
});
