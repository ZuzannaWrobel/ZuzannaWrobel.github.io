// script.js
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  header.addEventListener("click", () => {
    header.style.backgroundColor = header.style.backgroundColor === "blue" ? "#333" : "blue";
  });
});
