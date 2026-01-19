// ===============================
// SIDEBAR TOGGLE
// ===============================
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const urlInput = document.getElementById("urlInput");

// Create overlay
const overlay = document.createElement("div");
overlay.classList.add("sidebar-overlay");
document.body.appendChild(overlay);

function toggleSidebar() {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  hamburger.classList.remove("active");
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

hamburger.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeSidebar);

sidebarLinks.forEach(link => {
  link.addEventListener("click", closeSidebar);
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains("open")) {
    closeSidebar();
  }
});

// ===============================
// DOWNLOAD BUTTON (UI DEMO)
// ===============================
const downloadBtn = document.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (!url) {
    alert("Please paste a TikTok URL");
    return;
  }

  if (!url.includes("tiktok.com") && !url.includes("vm.tiktok.com")) {
    alert("Please enter a valid TikTok URL");
    return;
  }

  alert("Thank you for using CU-Dev! (UI demo only)");
  urlInput.value = "";
  updateInputButtons();
});

// ===============================
// PASTE & CLEAR BUTTON LOGIC
// ===============================
const clearBtn = document.getElementById("clearBtn");
const pasteBtn = document.getElementById("pasteBtn");

// Initial state
function updateInputButtons() {
  if (urlInput.value.trim() === "") {
    clearBtn.style.display = "none";
    pasteBtn.style.display = "flex";
  } else {
    clearBtn.style.display = "flex";
    pasteBtn.style.display = "none";
  }
}

updateInputButtons();

// When typing
urlInput.addEventListener("input", updateInputButtons);

// Clear button
clearBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  urlInput.value = "";
  updateInputButtons();
  urlInput.focus();
});

// Paste button
pasteBtn.addEventListener("click", async (e) => {
  e.stopPropagation();

  try {
    const text = await navigator.clipboard.readText();
    if (!text) return;

    urlInput.value = text;
    updateInputButtons();
    urlInput.focus();

  } catch (err) {
    alert("Clipboard access denied. Please allow paste permission.");
  }
});
