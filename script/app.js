const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const lupaPassword = document.getElementById("lupapw");
const animationDuration = 800;

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  setTimeout(() => {
    lupaPassword.style.display = "none";
  }, animationDuration);
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  setTimeout(() => {
    lupaPassword.style.display = "block";
  }, animationDuration);
});
