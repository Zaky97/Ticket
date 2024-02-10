// Optional: Auto-resize wave height with window resize
window.addEventListener("resize", () => {
  const wave = document.querySelector(".wave");
  wave.style.height = `${window.innerHeight}px`;
});
