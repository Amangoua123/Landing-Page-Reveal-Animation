import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(Flip, SplitText);

const select = (el) => document.querySelector(el);
const selectAll = (el) => document.querySelectorAll(el);

// LOADING
function spliText() {
  const textElements = selectAll("h1, h2, p, a");

  textElements.forEach((element) => {
    SplitText.create(element, {
      type: "lines, chars",
      linesClass: "line",
    });

    const lines = element.querySelectorAll(".line");
    lines.forEach((line) => {
      const textContent = line.textContent;
      line.innerHTML = `<span>${textContent}</span>`;
    });
  });
}

function createCounterDigits() {
  const counter1 = select(".count-1");
  const num0 = document.createElement("div");
  num0.className = "num";
  num0.textContent = "0";
  counter1.appendChild(num0);

  const num1 = document.createElement("div");
  num1.className = "num num1offset1";
  num1.textContent = "1";
  counter1.appendChild(num1);

  const counter2 = select(".count-2");
  for (let i = 0; i <= 10; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = i === 1 ? "num num1offset2" : "num";
    numDiv.textContent = i === 10 ? "0" : i;
    counter2.appendChild(numDiv);
  }

  const counter3 = select(".count-3");
  for (let i = 0; i < 30; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = "num";
    numDiv.textContent = i % 10;
    counter3.appendChild(numDiv);
  }

  const finalNum = document.createElement("div");
  finalNum.className = "num";
  finalNum.textContent = "0";
  counter3.appendChild(finalNum);
}

function animateCounter(counter, duration, delay = 0) {
  const numHeight = counter.querySelector(".num").clientHeight;
  const totalDistance =
    (counter.querySelectorAll(".num").length - 1) * numHeight;
  gsap.to(counter, {
    y: -totalDistance,
    duration: duration,
    delay: delay,
    ease: "power2.inOut",
  });
}

function animateImages() {
  const images = selectAll(".img");

  images.forEach((image) => image.classList.remove("animate-out"));

  const state = Flip.getState(images);

  images.forEach((img) => img.classList.add("animate-out"));

  const mainTimelime = gsap.timeline();
  mainTimelime.add(
    Flip.from(state, {
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
    }),
  );

  images.forEach((img, index) => {
    const scaleTimeline = gsap.timeline();

    scaleTimeline
      .to(
        img,
        {
          scale: 2.5,
          duration: 0.45,
          ease: "power3.in",
        },
        "0.025",
      )
      .to(
        img,
        {
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        "0.5",
      );

    mainTimelime.add(scaleTimeline, index * 0.1);
  });

  return mainTimelime;
}

document.addEventListener("DOMContentLoaded", function () {
  spliText();
  createCounterDigits();

  animateCounter(select(".count-3"), 2.5);
  animateCounter(select(".count-2"), 3);
  animateCounter(select(".count-1"), 2, 1.5);

  const tl = gsap.timeline();

  gsap.set("nav, .header, .sidebar", {
    autoAlpha: 1,
  });

  gsap.set(".img", {
    scale: 0,
  });

  gsap.set(".cta", {
    autoAlpha: 0,
    y: 50,
  });

  tl.to(".hero-bg", {
    scaleY: "100%",
    duration: 3,
    ease: "power2.inOut",
    delay: 0.25,
  });

  tl.to(
    ".img",
    {
      scale: 1,
      duration: 1,
      stagger: 0.125,
      ease: "power3.out",
    },
    "<",
  );

  tl.to(".counter", {
    opacity: 0,
    duration: 0.3,
    ease: "power3.out",
    delay: 0.3,
    onStart: () => animateImages(),
  });

  tl.to(".sidebar .divider", {
    scaleY: "100%",
    duration: 1,
    ease: "power3.inOut",
    delay: 1.25,
  });

  tl.to(
    ["nav .divider", ".side-info .divider"],
    {
      scaleX: "100%",
      duration: 1,
      stagger: 0.5,
      ease: "power3.inOut",
    },
    "<",
  );

  tl.to(
    ".logo",
    {
      scale: 1,
      duration: 1,
      ease: "power4.inOut",
    },
    "<",
  );

  tl.to(
    [".logo-name a span", ".links a span", ".links p span", ".cta a span"],
    {
      y: "0%",
      duration: 1.5,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5,
    },
    "<",
  );

  tl.to(
    ".cta",
    {
      autoAlpha: 1,
      y: 0,
      x: 0,
    },
    "<",
  );

  tl.to(
    [".header span"],
    {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    },
    "<",
  );
});
