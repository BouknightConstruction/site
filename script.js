// Contact form submission with JSON handling because frankly idk how any of this stuff is working otherwise
document.getElementById("contactForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = this;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    message: form.message.value
  };

  try {
    const response = await fetch("https://formspree.io/f/mgvzklry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      form.style.display = "none";
      const thankYou = document.getElementById("formThankYou");
      if (thankYou) thankYou.style.display = "block";
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    alert("There was a problem sending your message. Please try again.");
    console.error(error);
  }
});

// Scroll fade-in animation
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Modal image viewer for gallery
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.createElement("div");
  modal.id = "imageModal";
  modal.style.cssText = "display:none;position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,0.8);justify-content:center;align-items:center;";
  const modalImg = document.createElement("img");
  modalImg.id = "modalImg";
  modalImg.style.cssText = "max-width:90%;max-height:90%;box-shadow:0 0 20px rgba(255,255,255,0.5);border-radius:8px;";
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  document.querySelectorAll(".gallery-image").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImg.src = "";
    }
  });
});
