const stickyTop = document.querySelector(".sticky-top");
const offCanvas = document.querySelector(".offcanvas");
const homeElement = document.querySelector(".home");

// Membuat efek Navbar berubah warna ketika di scroll
const heroObserver = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      document.querySelector(".myNavbar").classList.add("scrolled");
    } else {
      document.querySelector(".myNavbar").classList.remove("scrolled");
    }
  },
  { threshold: 0.9 }
);

// Memakai aksi offcanvas bootstrap
// ada show untuk aksi sebelum animasi, ada shown untuk aksi sesudah animasi
offCanvas.addEventListener("show.bs.offcanvas", function () {
  stickyTop.style.overflow = "visible";
});

// ada hide untuk aksi sebelum animasi, ada hidden untuk aksi sesudah animasi
offCanvas.addEventListener("hidden.bs.offcanvas", function () {
  stickyTop.style.overflow = "hidden";
});

// Disable Scroll
const rootElement = document.querySelector(":root");
const audioIcon = document.querySelector(".audio-icon");
const audioI = document.querySelector(".audio-icon i");
let isPlaying = false;
const song = document.querySelector("#song");

function disableScroll() {
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(screenTop, screenLeft);
  };

  // Mengambil Scroll Smoth bawaan Bootstrap
  rootElement.style.scrollBehavior = "auto";
}

// Enable Scroll
function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  // localStorage.setItem('opened', 'true');
  homeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  playAudio();
}

function playAudio() {
  song.volume = 0.1;
  audioIcon.style.display = "flex";
  song.play();
  isPlaying = true;
}

audioIcon.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioI.classList.remove("bi-disc");
    audioI.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioI.classList.add("bi-disc");
    audioI.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
};

// if (!localStorage.getItem('opened')) {
//     disableScroll();
// }

disableScroll();
heroObserver.observe(homeElement);

// Form
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Success!");
    });
  });
});

// Untuk mengatur Nama Undangan
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || "";
const pronoun = urlParams.get("p") || "Bapak/Ibu/Saudara/i";

const namaContainer = document.querySelector(".hero h4 span");

namaContainer.innerHTML = `${pronoun} ${nama},`.replace(/ ,$/, ",");

// Otomatis mengisi RSVP nama
document.querySelector("#nama").value = nama;
