let barIcon = document.querySelector("#menu-bar");
let navBar = document.querySelector(".nav-bar");

barIcon.onclick = () => {
  barIcon.classList.toggle("fa-times");
  navBar.classList.toggle("active");
};

window.onscroll = () => {
  barIcon.classList.remove("fa-times");
  navBar.classList.remove("active");
};
