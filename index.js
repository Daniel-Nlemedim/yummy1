"use strict";
const header = document.querySelector(".header");
const nav = document.querySelector(".navbar");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const section1 = document.querySelector(".firstCoord");
const copyYear = document.querySelector(".copy-year");

//function

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//////////////////////////////////////
//for the slide show
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

//////////////////////////////////////
//nav smooth scrolling
document.querySelector(".nav__link").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////
//menu fade animation
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".navbar").querySelectorAll(".nav-link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = 0.5;
      }
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".navbar").querySelectorAll(".nav-link");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = 1;
      }
    });
  }
});

//////////////////////////////////////
//smooth scrolling to section
const btnScrollTo = document.querySelector(".btn--scroll-to");
btnScrollTo.addEventListener("click", function (e) {
  section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

//////////////////////////////////////
//sticky navigation
// const initialCoordinates = section1.getBoundingClientRect();
// console.log(initialCoordinates);
// window.addEventListener("scroll", function () {
//   if (this.window.scrollY > initialCoordinates.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//////////////////////////////////////
//stickyNav with intersectionAPI
const navHeight = section1.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickyNav, obsOption);
headerObserver.observe(header);

//////////////////////////////////////
//copyright year
const calcYear = function () {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  copyYear.textContent = year;
};
calcYear();

//lazy img**
navHeight;
const allImages = document.querySelectorAll(".lazy-img");

const loadObserver = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const loadOption = {
  root: null,
  threshold: 0,
};
const imageObserver = new IntersectionObserver(loadObserver, loadOption);

allImages.forEach((img) => {
  imageObserver.observe(img);
});
