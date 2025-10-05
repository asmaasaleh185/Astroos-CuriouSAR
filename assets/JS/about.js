// About Page Interactive Logic

// Scroll-triggered animations
function initScrollAnimations() {
  const panels = document.querySelectorAll('.story-panel[data-scroll="fade-in"]')

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  panels.forEach((panel) => {
    observer.observe(panel)
  })
}

// Add hover pulse effect to panels
function initPanelHoverEffects() {
  const panels = document.querySelectorAll(".story-panel")

  panels.forEach((panel) => {
    panel.addEventListener("mouseenter", () => {
      panel.style.transform = "translateY(-10px) scale(1.02)"
    })

    panel.addEventListener("mouseleave", () => {
      panel.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Parallax effect for floating elements
function initParallaxEffect() {
  const satellites = document.querySelectorAll(".satellite-float")
  const particles = document.querySelectorAll(".particle")

  window.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    satellites.forEach((satellite, index) => {
      const speed = (index + 1) * 20
      const x = (mouseX - 0.5) * speed
      const y = (mouseY - 0.5) * speed

      satellite.style.transform = `translate(${x}px, ${y}px)`
    })

    particles.forEach((particle, index) => {
      const speed = (index + 1) * 10
      const x = (mouseX - 0.5) * speed
      const y = (mouseY - 0.5) * speed

      particle.style.transform = `translate(${x}px, ${y}px)`
    })
  })
}

// Smooth scroll to top on page load
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Initialize all effects
document.addEventListener("DOMContentLoaded", () => {
  smoothScrollToTop()
  initScrollAnimations()
  initPanelHoverEffects()
  initParallaxEffect()

  // Add entrance animation to hero
  const logoContainer = document.querySelector(".logo-container")
  setTimeout(() => {
    logoContainer.style.opacity = "1"
  }, 100)
})

// Add smooth transition when leaving page
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href")

    // Only apply transition for internal links
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      e.preventDefault()

      document.body.style.transition = "opacity 0.5s ease, filter 0.5s ease"
      document.body.style.opacity = "0"
      document.body.style.filter = "blur(10px)"

      setTimeout(() => {
        window.location.href = href
      }, 500)
    }
  })
})
