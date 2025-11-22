(() => {
  const hotspots = document.querySelectorAll(".Hotspot");

  const infoBoxes = [
    {
      title: "Noise-cancelling microphones",
      text: "Dual microphones cancel out ambient noise before it reaches your ears.",
    },
    {
      title: "Comfortable Fit",
      text: "Soft silicone tips ensure stability and comfort for every ear type.",
    },
    {
      title: "360° Audio",
      text: "Surround sound with Dolby Head Tracking™ keeps you immersed.",
    },
    {
      title: "Ultra Fast Charging",
      text: "Get up to 6 hours of playtime in just 15 minutes of charge.",
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

// Scroll animations

gsap.registerPlugin(ScrollTrigger);

gsap.from(".scroll-box", {
  opacity: 0,
  y: 50,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#scrollSection",
    start: "top 80%", 
    end: "top 30%",
    scrub: false,       
    markers: false      
  }
});

gsap.registerPlugin(ScrollTrigger);

const model = document.querySelector("#scrollSection model-viewer");

model.addEventListener("load", () => {
  
  const animation = model.model.animations[0];
  const duration = animation.duration;

  model.pause();

  gsap.to(model, {
    animationTime: duration,  
    ease: "none",
    scrollTrigger: {
      trigger: "#scrollSection",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1,
      markers: false
    }
  });

});