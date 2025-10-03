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



/////////////////////////////////////////////////////////////////////
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

// ===== ENHANCED LEARNING CARD MODAL SYSTEM WITH MULTI-PAGE SUPPORT =====
const learningCards = document.querySelectorAll(".learning-card")
const modal = document.getElementById("learningModal")
const modalBody = document.getElementById("modalBody")
const modalClose = document.querySelector(".modal-close")
const progressIndicator = document.getElementById("progressIndicator")
const moduleNavigation = document.getElementById("moduleNavigation")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const quizScorePopup = document.getElementById("quizScorePopup")
const closeScoreBtn = document.getElementById("closeScoreBtn")

let currentModule = null
let currentPageIndex = 0
let quizAnswers = []

const moduleData = {
  intro: {
    title: "Introduction to Remote Sensing",
    pages: [
      {
        title: "What is Remote Sensing?",
        content: `
          <h2>What is Remote Sensing?</h2>
          <p>Remote sensing is the science of obtaining information about objects or areas from a distance, typically from aircraft or satellites. It allows us to observe and measure Earth's surface without physical contact.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🛰️</div>
            <div class="skeleton-label">Satellite Observation Diagram</div>
            <div class="skeleton-description">Insert your diagram showing satellite orbiting Earth with sensor beams scanning the surface</div>
          </div>
          
          <p>This revolutionary technology has transformed how we understand our planet, enabling us to monitor changes in real-time and make informed decisions about environmental management, urban planning, and disaster response.</p>
          <h3>The Power of Distance</h3>
          <p>By observing from space or high altitudes, remote sensing provides a unique perspective that reveals patterns and changes invisible from the ground. This bird's-eye view is essential for understanding large-scale phenomena like climate change, deforestation, and urban sprawl.</p>
        `,
      },
      {
        title: "Key Concepts",
        content: `
          <h2>Fundamental Principles</h2>
          <h3>Electromagnetic Radiation</h3>
          <p>Remote sensors detect energy reflected or emitted from Earth's surface. Different materials reflect different wavelengths, creating unique spectral signatures that help us identify and classify surface features.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🌈</div>
            <div class="skeleton-label">Electromagnetic Spectrum</div>
            <div class="skeleton-description">Insert diagram showing wavelength ranges from gamma rays to radio waves</div>
          </div>
          
          <h3>Passive vs Active Sensors</h3>
          <p><strong>Passive sensors</strong> detect natural radiation, primarily sunlight reflected from Earth's surface. Examples include optical cameras and thermal sensors.</p>
          <p><strong>Active sensors</strong> emit their own energy and measure the reflected signal. Radar and LiDAR are prime examples, offering the advantage of working day or night, through clouds.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">📡</div>
            <div class="skeleton-label">Passive vs Active Sensing</div>
            <div class="skeleton-description">Insert comparison diagram showing sun-powered passive sensing vs radar-powered active sensing</div>
          </div>
        `,
      },
      {
        title: "Resolution Types",
        content: `
          <h2>Understanding Resolution</h2>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🎯</div>
            <div class="skeleton-label">Four Resolution Types</div>
            <div class="skeleton-description">Insert four-panel diagram showing spatial, temporal, spectral, and radiometric resolution examples</div>
          </div>
          
          <h3>Spatial Resolution</h3>
          <p>The size of the smallest feature that can be detected. High-resolution satellites can see objects as small as 30cm, while weather satellites have resolutions of several kilometers.</p>
          <h3>Temporal Resolution</h3>
          <p>How often a sensor revisits the same location. Some satellites return daily, others every few weeks. This affects our ability to monitor rapid changes.</p>
          <h3>Spectral Resolution</h3>
          <p>The number and width of wavelength bands a sensor can detect. More bands provide richer information about surface materials.</p>
          <h3>Radiometric Resolution</h3>
          <p>The sensitivity to differences in energy levels. Higher radiometric resolution allows detection of subtle variations in surface properties.</p>
        `,
      },
      {
        title: "Applications Overview",
        content: `
          <h2>Real-World Impact</h2>
          <p>Remote sensing has become indispensable across numerous fields:</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🌍</div>
            <div class="skeleton-label">Global Applications</div>
            <div class="skeleton-description">Insert collage showing agriculture monitoring, disaster response, urban planning, and climate research</div>
          </div>
          
          <ul>
            <li><strong>Agriculture:</strong> Crop health monitoring, yield prediction, irrigation management</li>
            <li><strong>Forestry:</strong> Deforestation tracking, biomass estimation, fire detection</li>
            <li><strong>Urban Planning:</strong> Land use mapping, infrastructure monitoring, growth analysis</li>
            <li><strong>Disaster Management:</strong> Flood mapping, earthquake damage assessment, wildfire tracking</li>
            <li><strong>Climate Research:</strong> Ice sheet monitoring, sea level rise, temperature patterns</li>
            <li><strong>Military & Security:</strong> Reconnaissance, border monitoring, change detection</li>
          </ul>
          <p>These applications demonstrate how remote sensing provides critical data for understanding and managing our changing planet.</p>
        `,
      },
    ],
    quiz: [
      {
        question: "What is the primary advantage of remote sensing?",
        options: [
          "It's cheaper than ground surveys",
          "It provides a large-scale perspective without physical contact",
          "It only works in good weather",
          "It requires no specialized equipment",
        ],
        correct: 1,
        explanation:
          "Remote sensing's key advantage is providing large-scale observations from a distance, revealing patterns invisible from the ground.",
      },
      {
        question: "What is the difference between passive and active sensors?",
        options: [
          "Passive sensors are older technology",
          "Active sensors are more expensive",
          "Passive sensors detect natural radiation while active sensors emit their own energy",
          "There is no significant difference",
        ],
        correct: 2,
        explanation:
          "Passive sensors rely on natural energy sources (like sunlight), while active sensors emit their own energy and measure the return signal.",
      },
      {
        question: "Which resolution type determines how often a satellite revisits the same location?",
        options: ["Spatial resolution", "Temporal resolution", "Spectral resolution", "Radiometric resolution"],
        correct: 1,
        explanation:
          "Temporal resolution refers to the frequency of observations over the same area, crucial for monitoring dynamic phenomena.",
      },
      {
        question: "What can remote sensing NOT do effectively?",
        options: [
          "Monitor large-scale environmental changes",
          "Provide detailed chemical analysis of individual plants",
          "Track deforestation patterns",
          "Map urban growth",
        ],
        correct: 1,
        explanation:
          "While remote sensing excels at large-scale observations, detailed chemical analysis typically requires direct sampling and laboratory analysis.",
      },
    ],
  },
  frequencies: {
    title: "Frequencies & Polarizations",
    pages: [
      {
        title: "The Electromagnetic Spectrum",
        content: `
          <h2>Understanding Electromagnetic Waves</h2>
          <p>Electromagnetic radiation travels as waves at the speed of light, with different wavelengths carrying different amounts of energy. Remote sensing exploits these differences to extract information about Earth's surface.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">〰️</div>
            <div class="skeleton-label">Wave Properties</div>
            <div class="skeleton-description">Insert diagram showing wavelength, frequency, and amplitude of electromagnetic waves</div>
          </div>
          
          <h3>Why Different Frequencies Matter</h3>
          <p>Different frequencies interact with materials in unique ways. Shorter wavelengths (like visible light) are scattered by small particles, while longer wavelengths (like radar) can penetrate clouds, vegetation, and even soil.</p>
          <p>This diversity allows us to choose the optimal frequency for each application, from monitoring ocean waves to mapping underground water resources.</p>
        `,
      },
      {
        title: "Radar Frequency Bands",
        content: `
          <h2>Common Radar Bands in Remote Sensing</h2>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">📊</div>
            <div class="skeleton-label">Radar Frequency Bands</div>
            <div class="skeleton-description">Insert chart showing X, C, L, and P bands with wavelengths and penetration depths</div>
          </div>
          
          <h3>X-band (8-12 GHz, ~3cm wavelength)</h3>
          <p><strong>Characteristics:</strong> High resolution, sensitive to surface roughness, limited penetration</p>
          <p><strong>Applications:</strong> Urban mapping, ice monitoring, high-resolution imaging, ship detection</p>
          
          <h3>C-band (4-8 GHz, ~6cm wavelength)</h3>
          <p><strong>Characteristics:</strong> Good balance of resolution and penetration, all-weather capability</p>
          <p><strong>Applications:</strong> Ocean monitoring, ice classification, agriculture, disaster response</p>
          
          <h3>L-band (1-2 GHz, ~24cm wavelength)</h3>
          <p><strong>Characteristics:</strong> Penetrates vegetation canopy, sensitive to moisture</p>
          <p><strong>Applications:</strong> Forestry, soil moisture, biomass estimation, subsurface imaging</p>
          
          <h3>P-band (0.3-1 GHz, ~70cm wavelength)</h3>
          <p><strong>Characteristics:</strong> Maximum penetration depth, sees through dense vegetation</p>
          <p><strong>Applications:</strong> Forest biomass, underground features, ice sheet structure</p>
        `,
      },
      {
        title: "Polarization Fundamentals",
        content: `
          <h2>What is Polarization?</h2>
          <p>Electromagnetic waves oscillate in specific orientations. Polarization describes the orientation of these oscillations, and it profoundly affects how radar signals interact with surfaces.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">↕️</div>
            <div class="skeleton-label">Polarization Orientations</div>
            <div class="skeleton-description">Insert diagram showing horizontal and vertical polarization wave orientations</div>
          </div>
          
          <h3>Linear Polarization Types</h3>
          <p><strong>Horizontal (H):</strong> Wave oscillates parallel to Earth's surface</p>
          <p><strong>Vertical (V):</strong> Wave oscillates perpendicular to Earth's surface</p>
          <h3>Polarization Combinations</h3>
          <p>Radar systems can transmit and receive in different polarizations, creating four possible combinations:</p>
          <ul>
            <li><strong>HH:</strong> Transmit horizontal, receive horizontal</li>
            <li><strong>VV:</strong> Transmit vertical, receive vertical</li>
            <li><strong>HV:</strong> Transmit horizontal, receive vertical</li>
            <li><strong>VH:</strong> Transmit vertical, receive horizontal</li>
          </ul>
        `,
      },
      {
        title: "Polarization Applications",
        content: `
          <h2>Using Polarization for Surface Analysis</h2>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🎨</div>
            <div class="skeleton-label">Polarization Signatures</div>
            <div class="skeleton-description">Insert comparison showing HH, VV, and cross-pol images of the same area</div>
          </div>
          
          <h3>HH Polarization</h3>
          <p>Sensitive to surface roughness and horizontal structures. Excellent for ocean wave monitoring and detecting horizontal features like roads.</p>
          
          <h3>VV Polarization</h3>
          <p>Sensitive to vertical structures like buildings and tree trunks. Preferred for urban mapping and forest structure analysis.</p>
          
          <h3>Cross-Polarized (HV/VH)</h3>
          <p>Sensitive to volume scattering from complex structures like vegetation canopies. The signal changes polarization when bouncing through leaves and branches.</p>
          <p><strong>Key Applications:</strong></p>
          <ul>
            <li>Forest biomass estimation</li>
            <li>Crop type classification</li>
            <li>Ice type discrimination</li>
            <li>Ship detection (ships appear bright in cross-pol while ocean appears dark)</li>
          </ul>
          <p>By combining multiple polarizations, we can extract far more information than from a single polarization alone.</p>
        `,
      },
    ],
    quiz: [
      {
        question: "Which radar band has the longest wavelength and best penetration through vegetation?",
        options: ["X-band", "C-band", "L-band", "P-band"],
        correct: 3,
        explanation:
          "P-band has the longest wavelength (~70cm) and can penetrate dense vegetation to reveal forest structure and even underground features.",
      },
      {
        question: "What is C-band radar primarily used for?",
        options: [
          "Only urban mapping",
          "Ocean monitoring, ice classification, and all-weather observations",
          "Underground mineral detection",
          "Atmospheric studies only",
        ],
        correct: 1,
        explanation:
          "C-band offers an excellent balance of resolution and penetration, making it ideal for ocean monitoring, ice studies, and all-weather Earth observation.",
      },
      {
        question: "What does cross-polarization (HV or VH) primarily detect?",
        options: [
          "Smooth water surfaces",
          "Volume scattering from complex structures like vegetation",
          "Metal objects only",
          "Atmospheric moisture",
        ],
        correct: 1,
        explanation:
          "Cross-polarization is sensitive to volume scattering that occurs when radar signals bounce through complex structures like vegetation canopies.",
      },
      {
        question: "Why is VV polarization preferred for urban mapping?",
        options: [
          "It's cheaper to implement",
          "It's sensitive to vertical structures like buildings",
          "It works better at night",
          "It has higher resolution",
        ],
        correct: 1,
        explanation:
          "VV polarization is sensitive to vertical structures, making it ideal for detecting and mapping buildings and other vertical urban features.",
      },
    ],
  },
  sar: {
    title: "How SAR Works",
    pages: [
      {
        title: "The SAR Principle",
        content: `
          <h2>Synthetic Aperture Radar Technology</h2>
          <p>Synthetic Aperture Radar (SAR) is one of the most sophisticated remote sensing technologies ever developed. It creates high-resolution images by synthesizing a large antenna aperture through the motion of the satellite.</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🛰️</div>
            <div class="skeleton-label">Synthetic Aperture Concept</div>
            <div class="skeleton-description">Insert diagram showing satellite moving along orbit creating virtual antenna array</div>
          </div>
          
          <h3>The Resolution Challenge</h3>
          <p>Traditional radar resolution depends on antenna size—larger antennas provide better resolution. But building a 100-meter antenna on a satellite is impossible!</p>
          <h3>The Brilliant Solution</h3>
          <p>SAR solves this by using the satellite's motion to simulate a much larger antenna. As the satellite moves along its orbit, it transmits pulses and records the echoes. By combining these echoes with precise knowledge of the satellite's position, SAR creates images as if it had a massive antenna.</p>
          <p>This "synthetic aperture" can be hundreds of meters long, achieving resolution of just a few meters from space!</p>
        `,
      },
      {
        title: "How SAR Imaging Works",
        content: `
          <h2>The SAR Imaging Process</h2>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">⚙️</div>
            <div class="skeleton-label">SAR Imaging Workflow</div>
            <div class="skeleton-description">Insert step-by-step diagram: pulse transmission → echo reception → signal processing → image creation</div>
          </div>
          
          <h3>Step 1: Pulse Transmission</h3>
          <p>The SAR antenna transmits a microwave pulse toward Earth's surface at an angle (typically 20-60 degrees from vertical).</p>
          
          <h3>Step 2: Echo Reception</h3>
          <p>The pulse reflects off the surface and returns to the antenna. Different surfaces reflect differently based on their roughness, moisture content, and structure.</p>
          
          <h3>Step 3: Signal Processing</h3>
          <p>The satellite records both the amplitude (strength) and phase (timing) of the returned signal. This phase information is crucial—it's what makes SAR so powerful.</p>
          
          <h3>Step 4: Synthetic Aperture Formation</h3>
          <p>As the satellite moves, it collects echoes from multiple positions. Advanced algorithms combine these echoes, using the phase information to focus the image and achieve high resolution.</p>
          
          <h3>Step 5: Image Creation</h3>
          <p>The processed data becomes a SAR image where brightness indicates how strongly each area reflected the radar signal.</p>
        `,
      },
      {
        title: "SAR Advantages",
        content: `
          <h2>Why SAR is Revolutionary</h2>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">☁️</div>
            <div class="skeleton-label">All-Weather Capability</div>
            <div class="skeleton-description">Insert comparison showing SAR imaging through clouds at night vs optical sensor blocked by clouds</div>
          </div>
          
          <h3>All-Weather, Day-Night Capability</h3>
          <p>Unlike optical sensors, SAR microwaves penetrate clouds, rain, and darkness. This makes SAR invaluable for monitoring tropical regions, polar areas, and emergency situations where clouds often obscure optical views.</p>
          
          <h3>High Resolution</h3>
          <p>Modern SAR satellites achieve resolution of 1 meter or better, rivaling optical satellites while maintaining all-weather capability.</p>
          
          <h3>Coherent Imaging</h3>
          <p>SAR preserves phase information, enabling advanced techniques like interferometry that can measure ground movement with millimeter precision.</p>
          
          <h3>Penetration Capability</h3>
          <p>Depending on frequency, SAR can penetrate vegetation, sand, and even ice, revealing hidden features and subsurface structures.</p>
          
          <h3>Surface Sensitivity</h3>
          <p>SAR is extremely sensitive to surface roughness, moisture content, and structure—properties that optical sensors cannot directly measure.</p>
        `,
      },
      {
        title: "SAR Interferometry (InSAR)",
        content: `
          <h2>Measuring Ground Movement from Space</h2>
          <p>SAR Interferometry (InSAR) is perhaps the most remarkable application of SAR technology. It can measure ground deformation with millimeter precision from satellites orbiting 700 kilometers above Earth!</p>
          
          <div class="image-skeleton">
            <div class="skeleton-icon">🌈</div>
            <div class="skeleton-label">InSAR Interferogram</div>
            <div class="skeleton-description">Insert colorful interferogram showing fringe patterns representing ground movement</div>
          </div>
          
          <h3>The InSAR Technique</h3>
          <p>InSAR compares the phase of SAR images taken at different times. When the ground moves between acquisitions, it changes the distance to the satellite by tiny amounts. These distance changes appear as phase shifts in the SAR data.</p>
          
          <h3>Creating Interferograms</h3>
          <p>By subtracting the phases of two SAR images, we create an interferogram—a colorful pattern where each color cycle represents a specific amount of ground movement (typically 2.8cm for C-band radar).</p>
          
          <h3>Applications of InSAR</h3>
          <ul>
            <li><strong>Earthquake Monitoring:</strong> Map ground deformation and identify fault lines</li>
            <li><strong>Volcano Surveillance:</strong> Detect inflation before eruptions</li>
            <li><strong>Landslide Detection:</strong> Identify unstable slopes before failure</li>
            <li><strong>Subsidence Monitoring:</strong> Track sinking ground from groundwater extraction or mining</li>
            <li><strong>Infrastructure Monitoring:</strong> Measure bridge and dam stability</li>
            <li><strong>Glacier Movement:</strong> Track ice flow and melting</li>
          </ul>
          
          <p>InSAR has revolutionized our ability to monitor Earth's dynamic surface, providing early warning of hazards and insights into geological processes.</p>
        `,
      },
    ],
    quiz: [
      {
        question: "What does 'synthetic aperture' mean in SAR?",
        options: [
          "The antenna is made of synthetic materials",
          "The satellite simulates a large antenna by combining signals from multiple positions",
          "The images are artificially enhanced",
          "It uses synthetic wavelengths",
        ],
        correct: 1,
        explanation:
          "SAR uses the satellite's motion to synthesize a large antenna aperture, combining signals from multiple positions to achieve high resolution.",
      },
      {
        question: "What is the primary advantage of SAR over optical sensors?",
        options: [
          "Better color images",
          "Cheaper to operate",
          "Can image through clouds and darkness",
          "Easier to interpret",
        ],
        correct: 2,
        explanation:
          "SAR's microwave signals penetrate clouds and work day or night, providing all-weather imaging capability that optical sensors cannot match.",
      },
      {
        question: "What does InSAR measure?",
        options: [
          "Temperature changes",
          "Ground deformation with millimeter precision",
          "Atmospheric pressure",
          "Ocean salinity",
        ],
        correct: 1,
        explanation:
          "InSAR compares the phase of SAR images to measure ground movement with millimeter-level precision, crucial for monitoring earthquakes, volcanoes, and subsidence.",
      },
      {
        question: "Why is phase information important in SAR?",
        options: [
          "It makes images look better",
          "It enables interferometry and high-resolution imaging",
          "It reduces data size",
          "It's not actually important",
        ],
        correct: 1,
        explanation:
          "Phase information is essential for both creating high-resolution SAR images and enabling interferometry to measure ground deformation.",
      },
    ],
  },
  applications: {
    title: "Practical Applications",
    content: `
            <h2>Real-World Uses of SAR</h2>
            <p>SAR technology has revolutionized numerous fields with its unique capabilities.</p>
            
            <div class="image-skeleton">
              <div class="skeleton-icon">🌍</div>
              <div class="skeleton-label">SAR Applications Overview</div>
              <div class="skeleton-description">Insert collage showing agriculture, disaster management, maritime surveillance, and infrastructure monitoring</div>
            </div>

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
}

if (learningCards.length > 0) {
  learningCards.forEach((card) => {
    card.addEventListener("click", () => {
      const topic = card.getAttribute("data-topic")

      // Add flip animation
      card.classList.add("flipping")

      setTimeout(() => {
        card.classList.remove("flipping")
        openModule(topic)
      }, 300)
    })
  })
}

function openModule(topic) {
  const module = moduleData[topic]

  if (!module) return

  currentModule = module
  currentPageIndex = 0
  quizAnswers = []

  // Show modal directly
  modal.classList.add("active")
  renderModulePage()
}

function renderModulePage() {
  if (!currentModule) return

  const isQuizMode = currentPageIndex >= currentModule.pages.length

  // Update progress indicator
  renderProgressIndicator()

  // Render content
  if (isQuizMode) {
    renderQuiz()
  } else {
    const page = currentModule.pages[currentPageIndex]
    modalBody.innerHTML = `<div class="module-page">${page.content}</div>`
  }

  // Update navigation buttons
  updateNavigationButtons()
}

function renderProgressIndicator() {
  if (!currentModule.pages) {
    progressIndicator.style.display = "none"
    return
  }

  progressIndicator.style.display = "flex"
  progressIndicator.innerHTML = ""

  const totalPages = currentModule.pages.length + (currentModule.quiz ? 1 : 0)

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("div")
    dot.className = "progress-dot"

    if (i < currentPageIndex) {
      dot.classList.add("completed")
    } else if (i === currentPageIndex) {
      dot.classList.add("active")
    }

    dot.addEventListener("click", () => {
      if (i < currentPageIndex) {
        currentPageIndex = i
        renderModulePage()
      }
    })

    progressIndicator.appendChild(dot)
  }
}

function updateNavigationButtons() {
  const isQuizMode = currentPageIndex >= currentModule.pages.length
  const totalPages = currentModule.pages.length + (currentModule.quiz ? 1 : 0)

  prevBtn.disabled = currentPageIndex === 0
  nextBtn.disabled = isQuizMode && quizAnswers.length < currentModule.quiz.length

  if (isQuizMode) {
    nextBtn.textContent = "Complete Quiz →"
  } else if (currentPageIndex === currentModule.pages.length - 1 && currentModule.quiz) {
    nextBtn.textContent = "Start Quiz →"
  } else {
    nextBtn.textContent = "Next →"
  }
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPageIndex > 0) {
      currentPageIndex--
      modalBody.querySelector(".module-page, .quiz-container")?.classList.add("slide-left")
      setTimeout(() => {
        renderModulePage()
      }, 200)
    }
  })
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    const isQuizMode = currentPageIndex >= currentModule.pages.length
    const totalPages = currentModule.pages.length + (currentModule.quiz ? 1 : 0)

    if (isQuizMode) {
      // Show quiz results
      showQuizResults()
    } else if (currentPageIndex < totalPages - 1) {
      currentPageIndex++
      modalBody.querySelector(".module-page, .quiz-container")?.classList.add("slide-right")
      setTimeout(() => {
        renderModulePage()
      }, 200)
    }
  })
}

function renderQuiz() {
  if (!currentModule.quiz) return

  let quizHTML =
    '<div class="quiz-container"><h2>Knowledge Check</h2><p style="color: var(--color-gray-muted); margin-bottom: 2rem;">Test your understanding of the concepts covered in this module.</p>'

  currentModule.quiz.forEach((question, qIndex) => {
    const isAnswered = quizAnswers[qIndex] !== undefined
    const userAnswer = quizAnswers[qIndex]
    const isCorrect = userAnswer === question.correct

    quizHTML += `
      <div class="quiz-question">
        <h3>Question ${qIndex + 1}: ${question.question}</h3>
        <div class="quiz-options">
    `

    question.options.forEach((option, oIndex) => {
      let optionClass = "quiz-option"
      if (isAnswered) {
        optionClass += " disabled"
        if (oIndex === question.correct) {
          optionClass += " correct"
        } else if (oIndex === userAnswer && !isCorrect) {
          optionClass += " incorrect"
        }
      }

      quizHTML += `
        <div class="${optionClass}" data-question="${qIndex}" data-option="${oIndex}">
          ${option}
        </div>
      `
    })

    quizHTML += "</div>"

    if (isAnswered) {
      const feedbackClass = isCorrect ? "correct" : "incorrect"
      const feedbackIcon = isCorrect ? "✓" : "✗"
      quizHTML += `
        <div class="quiz-feedback ${feedbackClass}">
          ${feedbackIcon} ${question.explanation}
        </div>
      `
    }

    quizHTML += "</div>"
  })

  quizHTML += "</div>"
  modalBody.innerHTML = quizHTML

  // Add click handlers to quiz options
  document.querySelectorAll(".quiz-option:not(.disabled)").forEach((option) => {
    option.addEventListener("click", handleQuizAnswer)
  })
}

function handleQuizAnswer(e) {
  const questionIndex = Number.parseInt(e.target.dataset.question)
  const optionIndex = Number.parseInt(e.target.dataset.option)

  quizAnswers[questionIndex] = optionIndex

  // Re-render quiz to show feedback
  renderQuiz()
  updateNavigationButtons()
}

function showQuizResults() {
  const totalQuestions = currentModule.quiz.length
  const correctAnswers = quizAnswers.filter((answer, index) => answer === currentModule.quiz[index].correct).length
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100)

  document.getElementById("finalScore").textContent = scorePercentage

  let message = ""
  if (scorePercentage === 100) {
    message = "Perfect score! You've mastered this module! 🎉"
  } else if (scorePercentage >= 75) {
    message = "Excellent work! You have a strong understanding of the material."
  } else if (scorePercentage >= 50) {
    message = "Good effort! Review the material to strengthen your knowledge."
  } else {
    message = "Keep learning! Review the module and try again."
  }

  document.getElementById("scoreMessage").textContent = message

  quizScorePopup.classList.remove("hidden")
}

if (closeScoreBtn) {
  closeScoreBtn.addEventListener("click", () => {
    quizScorePopup.classList.add("hidden")
    modal.classList.remove("active")
  })
}

// Close modal handlers
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

// ===== GUIDED TOUR SYSTEM =====
const tourSteps = [
  {
    element: ".mission-header",
    title: "Welcome to Mission Control",
    description:
      "This is your command center for learning about SAR technology. Each module will guide you through different aspects of remote sensing and radar imaging.",
    position: "bottom",
  },
  {
    element: '[data-topic="intro"]',
    title: "Module 01: Introduction",
    description:
      "Start here to learn the fundamentals of remote sensing. Each module contains multiple pages with detailed explanations, diagrams, and a quiz to test your knowledge.",
    position: "right",
  },
  {
    element: '[data-topic="frequencies"]',
    title: "Module 02: Frequencies & Polarizations",
    description:
      "Dive into the electromagnetic spectrum and understand how different radar frequencies interact with Earth's surface. This is crucial for SAR applications.",
    position: "right",
  },
  {
    element: '[data-topic="sar"]',
    title: "Module 03: How SAR Works",
    description:
      "Explore the engineering brilliance behind Synthetic Aperture Radar. Learn how satellites create high-resolution images and measure ground movement with millimeter precision.",
    position: "right",
  },
  {
    element: "#learningGrid",
    title: "Interactive Learning Experience",
    description:
      "Click any module card to begin. You'll navigate through multiple pages, view diagrams, and complete quizzes. Your progress is tracked with visual indicators.",
    position: "top",
  },
]

let currentTourStep = 0
const tourOverlay = document.getElementById("tourOverlay")
const tourTooltip = document.getElementById("tourTooltip")
const tourStepNumber = document.getElementById("tourStepNumber")
const tourTotalSteps = document.getElementById("tourTotalSteps")
const tourTitle = document.getElementById("tourTitle")
const tourDescription = document.getElementById("tourDescription")
const tourPrevBtn = document.getElementById("tourPrevBtn")
const tourNextBtn = document.getElementById("tourNextBtn")
const tourSkipBtn = document.getElementById("tourSkipBtn")
const startTourBtn = document.getElementById("startTourBtn")

function startTour() {
  currentTourStep = 0
  tourOverlay.classList.remove("hidden")
  tourTooltip.classList.remove("hidden")
  document.body.style.overflow = "hidden"
  showTourStep(currentTourStep)
}

function endTour() {
  tourOverlay.classList.add("hidden")
  tourTooltip.classList.add("hidden")
  document.body.style.overflow = ""
  document.querySelectorAll(".tour-highlight").forEach((el) => el.classList.remove("tour-highlight"))
}

function showTourStep(stepIndex) {
  const step = tourSteps[stepIndex]
  const element = document.querySelector(step.element)

  if (!element) {
    console.error("[v0] Tour element not found:", step.element)
    return
  }

  // Update tooltip content
  tourStepNumber.textContent = stepIndex + 1
  tourTotalSteps.textContent = tourSteps.length
  tourTitle.textContent = step.title
  tourDescription.textContent = step.description

  // Update button states
  tourPrevBtn.disabled = stepIndex === 0
  tourNextBtn.textContent = stepIndex === tourSteps.length - 1 ? "Finish Tour" : "Next →"

  // Highlight element
  document.querySelectorAll(".tour-highlight").forEach((el) => el.classList.remove("tour-highlight"))
  element.classList.add("tour-highlight")

  element.scrollIntoView({ behavior: "smooth", block: "center" })

  setTimeout(() => {
    requestAnimationFrame(() => {
      positionSpotlight(element)
      positionTooltip(element, step.position)
    })
  }, 400) // Wait for smooth scroll animation to complete
}

function positionSpotlight(element) {
  const rect = element.getBoundingClientRect()
  const spotlight = document.querySelector(".tour-spotlight")

  // Calculate position with scroll offset accounted for
  spotlight.style.top = `${rect.top + window.scrollY - 10}px`
  spotlight.style.left = `${rect.left + window.scrollX - 10}px`
  spotlight.style.width = `${rect.width + 20}px`
  spotlight.style.height = `${rect.height + 20}px`
}

function positionTooltip(element, position) {
  const rect = element.getBoundingClientRect()
  const tooltipRect = tourTooltip.getBoundingClientRect()
  const padding = 20

  // Remove all position classes
  tourTooltip.classList.remove("position-top", "position-bottom", "position-left", "position-right")

  let top, left

  switch (position) {
    case "bottom":
      top = rect.bottom + padding
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      tourTooltip.classList.add("position-bottom")
      break
    case "top":
      top = rect.top - tooltipRect.height - padding
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      tourTooltip.classList.add("position-top")
      break
    case "left":
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      left = rect.left - tooltipRect.width - padding
      tourTooltip.classList.add("position-left")
      break
    case "right":
      top = rect.top + rect.height / 2 - tooltipRect.height / 2
      left = rect.right + padding
      tourTooltip.classList.add("position-right")
      break
    default:
      top = rect.bottom + padding
      left = rect.left + rect.width / 2 - tooltipRect.width / 2
      tourTooltip.classList.add("position-bottom")
  }

  // Keep tooltip within viewport
  const maxLeft = window.innerWidth - tooltipRect.width - 20
  const maxTop = window.innerHeight - tooltipRect.height - 20
  left = Math.max(20, Math.min(left, maxLeft))
  top = Math.max(20, Math.min(top, maxTop))

  tourTooltip.style.top = `${top}px`
  tourTooltip.style.left = `${left}px`
}

if (startTourBtn) {
  startTourBtn.addEventListener("click", startTour)
}

if (tourPrevBtn) {
  tourPrevBtn.addEventListener("click", () => {
    if (currentTourStep > 0) {
      currentTourStep--
      showTourStep(currentTourStep)
    }
  })
}

if (tourNextBtn) {
  tourNextBtn.addEventListener("click", () => {
    if (currentTourStep < tourSteps.length - 1) {
      currentTourStep++
      showTourStep(currentTourStep)
    } else {
      endTour()
    }
  })
}

if (tourSkipBtn) {
  tourSkipBtn.addEventListener("click", endTour)
}

// Close tour when clicking overlay (but not spotlight)
if (tourOverlay) {
  tourOverlay.addEventListener("click", (e) => {
    if (e.target === tourOverlay) {
      endTour()
    }
  })
}
