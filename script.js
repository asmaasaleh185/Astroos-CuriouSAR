// ===== PAGE TRANSITION EFFECT =====
document.addEventListener("DOMContentLoaded", () => {
  // Fade in page on load
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)

  // Smooth page transitions
  const links = document.querySelectorAll(
    'a[href^="index.html"], a[href^="explore.html"], a[href^="about.html"], a[href^="gallery.html"], a[href^="contact.html"]',
  )

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const href = link.getAttribute("href")

      document.body.style.opacity = "0"
      setTimeout(() => {
        window.location.href = href
      }, 300)
    })
  })
})

// ===== LEARNING CARD MODAL SYSTEM =====
const learningCards = document.querySelectorAll(".learning-card")
const modal = document.getElementById("learningModal")
const modalBody = document.getElementById("modalBody")
const modalClose = document.querySelector(".modal-close")

const learningContent = {
  intro: {
    title: "Introduction to Remote Sensing",
    content: `
            <h2>What is Remote Sensing?</h2>
            <p>Remote sensing is the science of obtaining information about objects or areas from a distance, typically from aircraft or satellites. It allows us to observe and measure Earth's surface without physical contact.</p>
            
            <h3>Key Concepts</h3>
            <ul>
                <li><strong>Electromagnetic Radiation:</strong> Remote sensors detect energy reflected or emitted from Earth's surface</li>
                <li><strong>Passive vs Active:</strong> Passive sensors detect natural radiation (like sunlight), while active sensors emit their own energy</li>
                <li><strong>Spatial Resolution:</strong> The size of the smallest feature that can be detected</li>
                <li><strong>Temporal Resolution:</strong> How often a sensor revisits the same location</li>
            </ul>
            
            <h3>Applications</h3>
            <p>Remote sensing is used in agriculture, forestry, urban planning, disaster management, climate research, and military reconnaissance. It provides critical data for understanding our changing planet.</p>
        `,
  },
  frequencies: {
    title: "Frequencies & Polarizations",
    content: `
            <h2>Electromagnetic Spectrum in Remote Sensing</h2>
            <p>Different frequencies of electromagnetic radiation interact with Earth's surface in unique ways, providing different types of information.</p>
            
            <h3>Common Radar Bands</h3>
            <ul>
                <li><strong>X-band (8-12 GHz):</strong> High resolution, used for urban mapping and ice monitoring</li>
                <li><strong>C-band (4-8 GHz):</strong> All-weather monitoring, ocean and ice applications</li>
                <li><strong>L-band (1-2 GHz):</strong> Penetrates vegetation, ideal for forestry and soil moisture</li>
                <li><strong>P-band (0.3-1 GHz):</strong> Deep penetration for biomass estimation</li>
            </ul>
            
            <h3>Polarization</h3>
            <p>Radar waves can be transmitted and received in different polarizations (HH, VV, HV, VH). Different polarizations reveal different surface characteristics:</p>
            <ul>
                <li><strong>HH (Horizontal-Horizontal):</strong> Sensitive to surface roughness</li>
                <li><strong>VV (Vertical-Vertical):</strong> Sensitive to vertical structures</li>
                <li><strong>Cross-polarized (HV/VH):</strong> Sensitive to volume scattering from vegetation</li>
            </ul>
        `,
  },
  sar: {
    title: "How SAR Works",
    content: `
            <h2>Synthetic Aperture Radar Technology</h2>
            <p>SAR is an active remote sensing system that transmits microwave signals and measures the backscattered energy. It creates high-resolution images regardless of weather or daylight conditions.</p>
            
            <h3>The SAR Principle</h3>
            <p>SAR synthesizes a large antenna aperture by combining signals from multiple positions along the satellite's flight path. This creates much higher resolution than would be possible with a physical antenna of the same size.</p>
            
            <h3>Key Advantages</h3>
            <ul>
                <li><strong>All-Weather Capability:</strong> Microwaves penetrate clouds and work day or night</li>
                <li><strong>High Resolution:</strong> Can achieve meter or sub-meter resolution</li>
                <li><strong>Coherent Imaging:</strong> Preserves phase information for interferometry</li>
                <li><strong>Penetration:</strong> Can see through vegetation and even soil</li>
            </ul>
            
            <h3>SAR Interferometry (InSAR)</h3>
            <p>By comparing the phase of SAR images taken at different times, InSAR can measure ground deformation with millimeter precision. This is crucial for monitoring earthquakes, volcanoes, landslides, and subsidence.</p>
        `,
  },
  applications: {
    title: "Practical Applications",
    content: `
            <h2>Real-World Uses of SAR</h2>
            <p>SAR technology has revolutionized numerous fields with its unique capabilities.</p>
            
            <h3>Agriculture</h3>
            <p>Monitor crop health, soil moisture, and field conditions. SAR can detect irrigation patterns and predict yields.</p>
            
            <h3>Disaster Management</h3>
            <p>Rapid mapping of floods, earthquakes, and landslides. SAR works through clouds, making it ideal for emergency response.</p>
            
            <h3>Climate & Environment</h3>
            <p>Track ice sheet movement, deforestation, and land use changes. Monitor sea ice extent and glacier dynamics.</p>
            
            <h3>Maritime Surveillance</h3>
            <p>Detect ships, monitor oil spills, and track ocean currents. SAR is essential for maritime security.</p>
            
            <h3>Infrastructure Monitoring</h3>
            <p>InSAR detects millimeter-scale ground movement, helping monitor bridges, dams, mines, and urban subsidence.</p>
            
            <h3>Defense & Security</h3>
            <p>All-weather reconnaissance, change detection, and target identification for military applications.</p>
        `,
  },
  quiz: {
    title: "Knowledge Assessment",
    content: `
            <h2>Test Your Understanding</h2>
            <p>Challenge yourself with these questions about remote sensing and SAR technology.</p>
            
            <h3>Question 1: What makes SAR different from optical sensors?</h3>
            <p><strong>Answer:</strong> SAR is an active sensor that emits its own microwave energy and can operate day or night, through clouds and weather. Optical sensors are passive and require sunlight.</p>
            
            <h3>Question 2: Which radar band penetrates vegetation best?</h3>
            <p><strong>Answer:</strong> L-band and P-band have longer wavelengths that can penetrate vegetation canopy, making them ideal for forestry applications.</p>
            
            <h3>Question 3: What is InSAR used for?</h3>
            <p><strong>Answer:</strong> Interferometric SAR (InSAR) measures ground deformation with millimeter precision by comparing the phase of SAR images taken at different times.</p>
            
            <h3>Question 4: Why is SAR important for disaster response?</h3>
            <p><strong>Answer:</strong> SAR can image through clouds and darkness, providing critical information during floods, earthquakes, and other disasters when optical satellites cannot see the ground.</p>
            
            <p style="margin-top: 2rem; padding: 1rem; background: rgba(0, 255, 136, 0.1); border-left: 4px solid var(--color-neon-green);">
                <strong>Congratulations!</strong> You've completed the SAR Mission training modules. Continue exploring to deepen your knowledge of remote sensing technology.
            </p>
        `,
  },
}

if (learningCards.length > 0) {
  learningCards.forEach((card) => {
    card.addEventListener("click", () => {
      const topic = card.getAttribute("data-topic")
      const content = learningContent[topic]

      if (content) {
        modalBody.innerHTML = content.content
        modal.classList.add("active")
      }
    })
  })
}

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.classList.remove("active")
  })
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
}

// ===== SCROLL ANIMATIONS FOR TIMELINE =====
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
      }, index * 200)
    }
  })
}, observerOptions)

const timelineItems = document.querySelectorAll(".timeline-item")
timelineItems.forEach((item) => {
  observer.observe(item)
})

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById("contactForm")
const formSuccess = document.getElementById("formSuccess")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    const formData = new FormData(contactForm)
    console.log("[v0] Form submitted with data:", Object.fromEntries(formData))

    // Show success message
    formSuccess.classList.remove("hidden")
    contactForm.reset()

    // Hide success message after 4 seconds
    setTimeout(() => {
      formSuccess.classList.add("hidden")
    }, 4000)
  })
}

// ===== GALLERY CARD INTERACTIONS =====
const galleryCards = document.querySelectorAll(".gallery-card")

galleryCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Could expand to show full-size image in modal
    console.log("[v0] Gallery card clicked:", card.querySelector("h3").textContent)
  })
})

// ===== PARALLAX EFFECT FOR FLOATING ELEMENTS =====
document.addEventListener("mousemove", (e) => {
  const floatItems = document.querySelectorAll(".float-item")
  const mouseX = e.clientX / window.innerWidth
  const mouseY = e.clientY / window.innerHeight

  floatItems.forEach((item, index) => {
    const speed = (index + 1) * 20
    const x = (mouseX - 0.5) * speed
    const y = (mouseY - 0.5) * speed

    item.style.transform = `translate(${x}px, ${y}px)`
  })
})

// ===== CONSOLE WELCOME MESSAGE =====
console.log("%c🛰️ SAR MISSION CONTROL INITIALIZED", "color: #00ff88; font-size: 20px; font-weight: bold;")
console.log("%cWelcome to the Remote Sensing Education Platform", "color: #00d9ff; font-size: 14px;")
console.log("%cExplore the cosmos of radar technology and Earth observation", "color: #6b7a8f; font-size: 12px;")
