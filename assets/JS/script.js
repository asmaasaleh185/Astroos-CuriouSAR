// stars background
function createStars() {
  const starsContainer = document.getElementById("stars");
  const starCount = 200;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.8 + 0.2;
    const delay = Math.random() * 5;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.style.opacity = opacity;
    star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite ${delay}s`;

    starsContainer.appendChild(star);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createStars();

  const exploreBtn = document.getElementById('exploreBtn');
  const sarHistory = document.getElementById('sar-history');
  const landing = document.getElementById('landing');
  const detailsBtn = document.querySelector('.details-btn');

  // Explore SAR History
  exploreBtn.addEventListener("click", () => {
    landing.classList.remove("show");
    setTimeout(() => {
      landing.style.display = "none";
      sarHistory.style.display = "flex";
      setTimeout(() => sarHistory.classList.add("show"), 50);
      sarHistory.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  });

  if (detailsBtn) {
    detailsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sarHistory.classList.remove("show");
      setTimeout(() => {
        window.location.href = detailsBtn.getAttribute("href");
      }, 1000);
    });
  }

  // slides control
  const track = document.getElementById("slidesTrack");
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const playPauseBtn = document.getElementById("playPause");
  const dotsContainer = document.getElementById("dots");

  let currentIndex = 0;
  let autoPlay = false;
  let autoPlayInterval;

  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      goToSlide(idx);
      stopAutoPlay();
    });
  });

  const dots = Array.from(dotsContainer.children);

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    updateSlidePosition();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoPlay();
  });

  function startAutoPlay() {
    autoPlay = true;
    playPauseBtn.innerHTML = "<i class='fas fa-play'></i> Pause";
    playPauseBtn.setAttribute("aria-pressed", "true");
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    autoPlay = false;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Play';
    playPauseBtn.setAttribute("aria-pressed", "false");
    clearInterval(autoPlayInterval);
  }

  playPauseBtn.addEventListener("click", () => {
    if (autoPlay) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  updateSlidePosition();
  startAutoPlay();
});