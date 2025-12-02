// I am storing the API urls here so I can reuse them
const materialsAPI = "https://swiftpixel.com/earbud/api/materials";
const infoboxAPI = "https://swiftpixel.com/earbud/api/infoboxes";

// I am selecting the elements I need for data and UI
const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error");
const hotspotTemplate = document.querySelector("#hotspot-template");
const hotspots = document.querySelectorAll(".Hotspot");
const materialsList = document.querySelector("#materials-list");

// I am setting up the canvas scroll animation values
const canvas = document.querySelector("#earbudsCanvas");
const ctx = canvas.getContext("2d");
const frameCount = 41;
const images = [];
let loadedImages = 0;
const animation = { frame: 0 };

// --------- loader and error helpers ---------

function fakeDelay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
}

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}

// I am using this to keep fetch response handling in one place
function handleFetchResponse(response) {
  if (!response.ok) {
    throw new Error("Network error: " + response.status);
  }

  return response.json();
}

// --------- hotspot and materials rendering ---------

// I am filling each hotspot annotation from the API data
function setupHotspotContent(spot, index) {
  const hotspotNumber = index + 1;
  const hotspotId = "#hotspot-" + hotspotNumber;
  const annotation = document.querySelector(hotspotId);

  if (!annotation) {
    return;
  }

  const clone = hotspotTemplate.content.cloneNode(true);
  const titleElement = clone.querySelector(".hotspot-title");
  const textElement = clone.querySelector(".hotspot-text");

  const titleValue = spot.title || spot.heading || spot.name || "Detail";
  const textValue =
    spot.description || spot.body || spot.text || "More information about this feature.";

  titleElement.textContent = titleValue;
  textElement.textContent = textValue;

  annotation.innerHTML = "";
  annotation.appendChild(clone);
}

function renderHotspotsFromAPI(hotspotData) {
  hotspotData.forEach(setupHotspotContent);
}

// I am building one list item for the materials section
function addMaterialItem(item) {
  if (!materialsList) {
    return;
  }

  const listItem = document.createElement("li");
  listItem.classList.add("materials__item");

  const titleText = item.material || item.name || item.title || "Material";
  const descriptionText =
    item.description || item.finish || item.info || "";

  const titleElement = document.createElement("h3");
  titleElement.classList.add("materials__item-title");
  titleElement.textContent = titleText;

  listItem.appendChild(titleElement);

  if (descriptionText !== "") {
    const textElement = document.createElement("p");
    textElement.classList.add("materials__item-text");
    textElement.textContent = descriptionText;
    listItem.appendChild(textElement);
  }

  materialsList.appendChild(listItem);
}

function renderMaterials(materialData) {
  if (!materialsList) {
    return;
  }

  materialsList.innerHTML = "";
  materialData.forEach(addMaterialItem);
}

// I am loading both APIs at once so the UI updates together
async function loadModelData() {
  showLoader();
  hideError();

  try {
    const materialsPromise = fetch(materialsAPI).then(handleFetchResponse);
    const infoboxPromise = fetch(infoboxAPI).then(handleFetchResponse);

    const results = await Promise.all([materialsPromise, infoboxPromise]);
    const materialsData = results[0];
    const hotspotData = results[1];

    renderMaterials(materialsData);
    renderHotspotsFromAPI(hotspotData);
  } catch (error) {
    showError("I could not load the model information. Please try again.");
  }

  hideLoader();
}

// --------- hotspot hover animation with GSAP ---------

// I use this to show the hotspot annotation on hover
function showInfo() {
  const selected = document.querySelector("#" + this.slot);
  gsap.to(selected, { duration: 0.6, autoAlpha: 1, y: -10 });
}

// I use this to hide the hotspot annotation when the mouse leaves
function hideInfo() {
  const selected = document.querySelector("#" + this.slot);
  gsap.to(selected, { duration: 0.6, autoAlpha: 0, y: 0 });
}

function addHotspotListeners(hotspot) {
  hotspot.addEventListener("mouseenter", showInfo);
  hotspot.addEventListener("mouseleave", hideInfo);
}

function initHotspots() {
  hotspots.forEach(addHotspotListeners);
}

// --------- scroll-driven canvas animation ---------

// I draw the current frame onto the canvas
function drawImage(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

// I track when the sequence images finish loading
function handleImageLoad() {
  loadedImages = loadedImages + 1;

  if (loadedImages === 1) {
    drawImage(0);
  }
}

// I update the frame based on the ScrollTrigger value
function handleScrollUpdate() {
  const index = Math.round(animation.frame);

  if (images[index]) {
    drawImage(index);
  }
}

// I am setting up the scroll animation for the canvas
function initScrollAnimation() {
  canvas.width = 1920;
  canvas.height = 1080;

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    const indexString = String(i).padStart(4, "0");
    img.src = "images/earbud_animation" + indexString + ".jpg";
    img.onload = handleImageLoad;
    images.push(img);
  }

  gsap.registerPlugin(ScrollTrigger);

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
    onUpdate: handleScrollUpdate
  });
}

// Loader/Error Elements
var loaderEl = document.querySelector(".loader");
var errorEl = document.querySelector(".error-message");

// Show Loader
function showLoader() {
    if (loaderEl) {
        loaderEl.style.display = "block";
    }
}

// Hide Loader
function hideLoader() {
    if (loaderEl) {
        loaderEl.style.display = "none";
    }
}

// Show Error Message
function showError(message) {
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
    }
}

// Hide Error
function hideError() {
    if (errorEl) {
        errorEl.style.display = "none";
    }
}

// --------- initialize everything ---------

// I call these directly because the script is at the end of the body
loadModelData();
initHotspots();
initScrollAnimation();
