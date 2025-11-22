(() => {
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      title: "Comfortable Fit",
      text: "Soft silicone tips ensure stability and comfort for every ear type.",
    },
    {
      title: "360° Audio",
      text: "Surround sound with Dolby Head Tracking™ keeps you immersed.",
    },
    {
      title: "Seamless Controls",
      text: "Experience seamless volume control for effortless listening, anytime, anywhere.",
    },
  ];

  // Fill hotspot annotations dynamically
  infoBoxes.forEach((box, index) => {
    const el = document.querySelector(`#hotspot-${index + 1}`);
    if (!el) return;

    const title = document.createElement("h2");
    const text = document.createElement("p");
    title.textContent = box.title;
    text.textContent = box.text;

    el.appendChild(title);
    el.appendChild(text);
  });

  // Hover animations
  function showInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 0.6, autoAlpha: 1, y: -10 });
  }

  function hideInfo() {
    const selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, { duration: 0.6, autoAlpha: 0, y: 0 });
  }

  hotspots.forEach(h => {
    h.addEventListener("mouseenter", showInfo);
    h.addEventListener("mouseleave", hideInfo);
  });
})();

// Scroll animation

gsap.registerPlugin(ScrollTrigger);

const frameCount = 41; 
const images = [];
let loadedImages = 0;

const canvas = document.querySelector("#earbudsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `images/earbud_animation${String(i).padStart(4, "0")}.jpg`;

  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) drawImage(0);
  };

  images.push(img);
}

function drawImage(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

const animation = { frame: 0 };

gsap.to(animation, {
  frame: frameCount - 1,
  ease: "none",
  scrollTrigger: {
    trigger: "#earbuds-canvas-section",
    scrub: 1,
    start: "top",
    end: "bottom+=800 top",  
    pin: true,                 
    anticipatePin: 1
  },

  onUpdate: () => {
    const index = Math.round(animation.frame);
    if (images[index]) drawImage(index);
  }
});