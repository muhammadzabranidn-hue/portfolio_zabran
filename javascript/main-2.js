
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('is-scrolled');
  } else {
    navbar.classList.remove('is-scrolled');
  }
}


function updateNavbarOffset() {
  const height = navbar.offsetHeight;
  document.body.style.setProperty('--navbar-offset', `${height}px`);
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', updateNavbarOffset);
window.addEventListener('DOMContentLoaded', () => {
  updateNavbarOffset();
  handleScroll();
});



const launchDate = new Date("2026-12-31T00:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "<h3>WEBSITE SUDAH RESMI RILIS!</h3>";
  }
}, 1000);