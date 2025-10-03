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
          <div>
  <h2>What is Remote Sensing?</h2>
  <p>
    Remote sensing is the science of obtaining information about objects or areas from a distance, typically from aircraft or satellites. 
    It allows us to observe and measure Earth's surface without physical contact.
  </p>
  <p>
    This revolutionary technology has transformed how we understand our planet, enabling us to monitor changes in real-time and make informed decisions about environmental management, urban planning, and disaster response.
  </p>
</div>

<div style="display: flex; align-items: flex-start; gap: 20px; margin-top: 20px;">
  <div style="flex: 1;">
    <h3>The Power of Distance</h3>
    <p>
      By observing from space or high altitudes, remote sensing provides a unique perspective that reveals patterns and changes invisible from the ground. 
      This bird's-eye view is essential for understanding large-scale phenomena like climate change, deforestation, and urban sprawl.
    </p>
  </div>

  <img src="https://www.nasa.gov/wp-content/uploads/2023/08/edu-remote-sensing-large.jpg?w=1920" 
       alt="Satellite observing Earth" width="250" 
       style="flex-shrink: 0;margin-top:90px;"/>
</div>`,
    },
    {
      title: "Key Concepts",
      content: `
        <h2>Fundamental Principles</h2>
        <h3>Electromagnetic Radiation</h3>
        <p>Remote sensors detect energy reflected or emitted from Earth's surface. Different materials reflect different wavelengths, creating unique spectral signatures that help us identify and classify surface features.</p>
        <h3>Passive vs Active Sensors</h3>
        <p><strong>Passive sensors</strong> detect natural radiation, primarily sunlight reflected from Earth's surface. Examples include optical cameras and thermal sensors.</p>
        <p><strong>Active sensors</strong> emit their own energy and measure the reflected signal. Radar and LiDAR are prime examples, offering the advantage of working day or night, through clouds.</p>
        <img src="https://earthdata.nasa.gov/s3fs-public/2024-10/active-passive-remote-sensing.png?VersionId=pEmhi8lVUM4aACGHMaPTwQMKAokvnIwI" alt="Passive remote sensing" width="400" style="margin-left:370px;"/>
      `,
    },
    {
      title: "Resolution Types",
      content: `
        <h2>Understanding Resolution</h2>
        <h3>Spatial Resolution</h3>
        <p>The size of the smallest feature that can be detected. High-resolution satellites can see objects as small as 30cm, while weather satellites have resolutions of several kilometers.</p>
        <img src="https://gisgeography.com/wp-content/uploads/2015/10/Spatial-Resolution-Comparison.png" alt="Spatial resolution comparison" width="500"/>
        <h3>Temporal Resolution</h3>
        <p>How often a sensor revisits the same location. Some satellites return daily, others every few weeks. This affects our ability to monitor rapid changes.</p>
        <img src="https://eo.belspo.be/sites/default/files/images/teledetection/Spot-Visee-oblique-et-stereo-images-3D_EN.jpg" alt="Temporal resolution" width="500"/>
        <h3>Spectral Resolution</h3>
        <p>The number and width of wavelength bands a sensor can detect. More bands provide richer information about surface materials.</p>
        <img src="https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/media/images/Aquatic%20Remote%20Sensing%20-%20Examples%20of%20spectral%20resolution.png" alt="Spectral resolution" width="200" style="margin-left:410px;"/>
        <h3>Radiometric Resolution</h3>
        <p>The sensitivity to differences in energy levels. Higher radiometric resolution allows detection of subtle variations in surface properties.</p>
        <img src="https://earthdatascience.org/images/courses/earth-analytics/remote-sensing/spectrumZoomed.png" alt="Radiometric resolution" width="500"/>
      `,
    },
    {
      title: "Applications Overview",
      content: `
        <h2>Real-World Impact</h2>
        <p>Remote sensing has become indispensable across numerous fields:</p>
        <ul>
          <li><strong>Agriculture:</strong> Crop health monitoring, yield prediction, irrigation management</li>
          <li><strong>Forestry:</strong> Deforestation tracking, biomass estimation, fire detection</li>
          <li><strong>Urban Planning:</strong> Land use mapping, infrastructure monitoring, growth analysis</li>
          <li><strong>Disaster Management:</strong> Flood mapping, earthquake damage assessment, wildfire tracking</li>
          <li><strong>Climate Research:</strong> Ice sheet monitoring, sea level rise, temperature patterns</li>
          <li><strong>Military & Security:</strong> Reconnaissance, border monitoring, change detection</li>
        </ul>
        <img src="https://gisgeography.com/wp-content/uploads/2016/02/Remote-Sensing-Applications.jpg" alt="Applications of remote sensing" width="600"/>
        <p>These applications demonstrate how remote sensing provides critical data for understanding and managing our changing planet.</p>
      `,
    },
    {
      title: "Quick Summary",
      content: `
        <h2>Remote Sensing & SAR — Quick Summary</h2>
        <h3>1) Remote Sensing — What it is</h3>
        <p>Remote sensing is collecting information about Earth from a distance using instruments on satellites, aircraft, or the ground. These instruments detect and record reflected or emitted energy, giving us a broad view of Earth’s systems to support data-informed decisions.</p>

        <h3>2) Two Main Types</h3>
        <h4>2.1 Passive Remote Sensing</h4>
        <p>The sensor does not emit energy; it records natural energy from Earth (e.g., sunlight reflected by land/water, or heat emitted by surfaces).</p>
        <p><strong>Examples:</strong> Optical cameras and thermal sensors.</p>
        <p><strong>Limitations:</strong> Optical sensors depend on daylight and clear skies.</p>
        <img src="https://earthdata.nasa.gov/s3fs-public/2020-03/Passive-Sensing.png" alt="Passive sensing example" width="400"/>

        <h4>2.2 Active Remote Sensing</h4>
        <p>The sensor sends out its own signal and measures the returned energy.</p>
        <p><strong>Examples:</strong> Radar and LiDAR.</p>
        <p><strong>Advantages:</strong> Can operate day or night and often through clouds, because it doesn’t rely on sunlight.</p>
        <img src="https://earthdata.nasa.gov/s3fs-public/2020-03/Active-Sensing.png" alt="Active sensing example" width="400"/>

        <h3>3) SAR (Synthetic Aperture Radar) — The Essentials</h3>
        <h4>3.1 What SAR is</h4>
        <p>SAR is an active radar system: it transmits microwave pulses toward Earth and measures the echoes that bounce back from the surface. Because it uses microwaves (not visible light), it can image through clouds and at night.</p>
        <h4>3.2 How SAR forms sharp images</h4>
        <p>As the satellite moves, SAR combines many returned echoes to act like a large “synthetic” antenna. This processing step produces high-resolution images that reveal surface structure and changes.</p>
        <h4>3.3 Why SAR is valuable</h4>
        <ul>
          <li>All-weather, day/night imaging for consistent monitoring</li>
          <li>Sensitive to surface roughness, moisture, and geometry</li>
          <li>Useful for mapping flooding, landslides, sea ice, wetlands, and infrastructure changes</li>
        </ul>
        <img src="https://eoimages.gsfc.nasa.gov/images/imagerecords/145000/145162/SARComparison.jpg" alt="SAR example images" width="600"/>
      `
    }
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
  "title": "Frequencies & Polarizations",
  "pages": [
    {
      "title": "The Electromagnetic Spectrum",
      "content": "<h2>Understanding Electromagnetic Waves</h2><p>Electromagnetic radiation travels as waves at the speed of light, with different wavelengths carrying different amounts of energy. Synthetic Aperture Radar (SAR) uses microwave pulses (wavelengths from centimeters to meters) to create detailed images, penetrating clouds, darkness, or dense forests, making it ideal for all-weather remote sensing.</p><h3>Why Different Frequencies Matter</h3><p>Different frequencies interact with materials uniquely. Shorter wavelengths (e.g., visible light) scatter off small particles, while longer wavelengths (e.g., radar) penetrate clouds, vegetation, and soil. Microwaves operate in atmospheric windows with low absorption by air, water vapor, or rain, enabling reliable imaging. Frequency ranges for SAR bands, standardized by IEEE from WWII military origins, balance propagation, resolution, and regulatory constraints.</p><p>This diversity allows optimal frequency selection for applications, from ocean wave monitoring to mapping underground water resources.</p>"
    },
    {
      "title": "Radar Frequency Bands",
      "content": "<h2>Common Radar Bands in Remote Sensing</h2><h3>X-band (8-12 GHz, ~2.5-3.75 cm wavelength)</h3><p><strong>Characteristics:</strong> High resolution, sensitive to surface roughness, limited penetration. Originated from WWII 'experimental' targeting radars; short wavelengths suit compact antennas but face higher rain attenuation.</p><p><strong>Applications:</strong> Urban mapping, ice monitoring, high-resolution imaging, ship detection (e.g., TerraSAR-X, sub-meter resolution).</p><h3>C-band (4-8 GHz, ~3.75-7.5 cm wavelength)</h3><p><strong>Characteristics:</strong> Balances resolution and penetration, low rain attenuation (~0.01 dB/km/mm). Post-WWII 'compromise' band, aligns with ITU regulations for satellites.</p><p><strong>Applications:</strong> Ocean monitoring, ice classification, agriculture, disaster response (e.g., Sentinel-1 at 5.405 GHz).</p><h3>S-band (2-4 GHz, ~7.5-15 cm wavelength)</h3><p><strong>Characteristics:</strong> Good propagation over water, penetrates light foliage, manageable antenna sizes. WWII 'short-wave' for ship radars, avoids broadcast interference.</p><p><strong>Applications:</strong> Maritime surveillance, biomass studies, deformation monitoring (e.g., NISAR, Capella Space).</p><h3>L-band (1-2 GHz, ~15-30 cm wavelength)</h3><p><strong>Characteristics:</strong> Penetrates vegetation canopy, sensitive to moisture. WWII 'long-wave' for search radars, low atmospheric loss.</p><p><strong>Applications:</strong> Forestry, soil moisture, biomass estimation, subsurface imaging (e.g., ALOS-1, NISAR).</p><h3>P-band (0.3-1 GHz, ~30-100 cm wavelength)</h3><p><strong>Characteristics:</strong> Maximum penetration depth, sees through dense vegetation, coarser resolution, larger antennas.</p><p><strong>Applications:</strong> Forest biomass, underground features, ice sheet structure.</p>"
    },
    {
      "title": "Polarization Fundamentals",
      "content": "<h2>What is Polarization?</h2><p>Polarization describes the orientation of electromagnetic wave oscillations, profoundly affecting how SAR signals interact with surfaces. SAR uses horizontal (H, parallel to ground) or vertical (V, perpendicular) orientations, with single-pol (e.g., VV), dual-pol (e.g., VV+VH), or quad-pol (all four) modes.</p><h3>Linear Polarization Types</h3><p><strong>Horizontal (H):</strong> Wave oscillates parallel to Earth's surface.</p><p><strong>Vertical (V):</strong> Wave oscillates perpendicular to Earth's surface.</p><h3>Polarization Combinations</h3><p>SAR systems transmit and receive in different polarizations, yielding four combinations in quad-pol:</p><ul><li><strong>HH:</strong> Transmit horizontal, receive horizontal. Detects horizontal features, double-bounce scattering.</li><li><strong>VV:</strong> Transmit vertical, receive vertical. Sensitive to vertical structures, surface scattering.</li><li><strong>HV:</strong> Transmit horizontal, receive vertical. Captures volume scattering, often symmetric to VH.</li><li><strong>VH:</strong> Transmit vertical, receive horizontal. Detects depolarization in complex media.</li></ul><p>The scattering matrix S = [[S_HH, S_HV], [S_VH, S_VV]] enables advanced polarimetric analysis.</p>"
    },
    {
      "title": "Polarization Applications",
      "content": "<h2>Using Polarization for Surface Analysis</h2><h3>HH Polarization</h3><p>Sensitive to surface roughness and horizontal structures. Excels at ocean wave monitoring, urban mapping, and wetland monitoring via double-bounce scattering (e.g., flooded forests).</p><h3>VV Polarization</h3><p>Sensitive to vertical structures like buildings and tree trunks. Preferred for urban mapping, forest structure analysis, flood mapping (dark water, <-20 dB), and soil moisture estimation.</p><h3>Cross-Polarized (HV/VH)</h3><p>Detects volume scattering from complex structures like vegetation canopies, where signals depolarize. Weaker but informative for randomness.</p><p><strong>Key Applications:</strong></p><ul><li>Forest biomass estimation</li><li>Crop type classification and growth monitoring</li><li>Ice type discrimination</li><li>Ship detection (bright ships, dark ocean)</li><li>Deforestation tracking, landslide detection</li></ul><p>Combining polarizations (e.g., VV/HH ratios) or PolSAR decompositions (Pauli, Cloude-Pottier) enhances material classification.</p><h3>Scattering Insights by Polarization</h3><table border='1'><tr><th>Feature</th><th>Appearance</th><th>Scattering Type</th><th>Polarization Insight</th><th>Example</th></tr><tr><td>Calm Water</td><td>Dark/Black</td><td>Specular Reflection</td><td>Low backscatter in VV/HH; signals reflect away</td><td>Lakes, flooded fields</td></tr><tr><td>Forests/Fields</td><td>Bright/Textured</td><td>Diffuse/Volume</td><td>Strong in VH/HV for canopy; VV for stalks</td><td>Crops, woodlands</td></tr><tr><td>Buildings/Ships</td><td>Very Bright Dots</td><td>Double-Bounce</td><td>Bright in HH/VV; cross-pol for complexity</td><td>Urban areas, vessels</td></tr></table>"
    }
  ],
  "quiz": [
    {
      "question": "Which radar band has the longest wavelength and best penetration through vegetation?",
      "options": ["X-band", "C-band", "L-band", "P-band"],
      "correct": 3,
      "explanation": "P-band has the longest wavelength (~30-100 cm) and can penetrate dense vegetation to reveal forest structure and even underground features."
    },
    {
      "question": "What is C-band radar primarily used for?",
      "options": [
        "Only urban mapping",
        "Ocean monitoring, ice classification, and all-weather observations",
        "Underground mineral detection",
        "Atmospheric studies only"
      ],
      "correct": 1,
      "explanation": "C-band offers an excellent balance of resolution and penetration, making it ideal for ocean monitoring, ice studies, and all-weather Earth observation, as in Sentinel-1."
    },
    {
      "question": "What does cross-polarization (HV or VH) primarily detect?",
      "options": [
        "Smooth water surfaces",
        "Volume scattering from complex structures like vegetation",
        "Metal objects only",
        "Atmospheric moisture"
      ],
      "correct": 1,
      "explanation": "Cross-polarization is sensitive to volume scattering that occurs when radar signals bounce through complex structures like vegetation canopies."
    },
    {
      "question": "Why is VV polarization preferred for urban mapping?",
      "options": [
        "It's cheaper to implement",
        "It's sensitive to vertical structures like buildings",
        "It works better at night",
        "It has higher resolution"
      ],
      "correct": 1,
      "explanation": "VV polarization is sensitive to vertical structures, making it ideal for detecting and mapping buildings and other vertical urban features."
    },
    {
      "question": "Which band provides good propagation over water and is used in modern missions like NISAR?",
      "options": ["X-band", "C-band", "S-band", "P-band"],
      "correct": 2,
      "explanation": "S-band (2-4 GHz) offers good propagation over water and penetrates light foliage, used in NISAR for deformation monitoring and biomass studies."
    }
  ]
},
  sar: {
    title: "How SAR Works",
    pages: [
      {
        title: "The SAR Principle",
        content: `
          <h2>Synthetic Aperture Radar Technology</h2>
          <p>Synthetic Aperture Radar (SAR) is one of the most sophisticated remote sensing technologies ever developed. It creates high-resolution images by synthesizing a large antenna aperture through the motion of the satellite.</p>
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

  // Show modal
  modal.classList.add("active")

  // Render first page
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

  // Position spotlight
  const rect = element.getBoundingClientRect()
  const spotlight = document.querySelector(".tour-spotlight")
  spotlight.style.top = `${rect.top - 10}px`
  spotlight.style.left = `${rect.left - 10}px`
  spotlight.style.width = `${rect.width + 20}px`
  spotlight.style.height = `${rect.height + 20}px`

  // Position tooltip
  positionTooltip(element, step.position)

  // Scroll element into view
  element.scrollIntoView({ behavior: "smooth", block: "center" })
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

// ===== Gharabawy UPDATED MODULE DATA WITH IMAGE SKELETONS =====
// The moduleData object has been updated within the main script.
// The previous declaration of moduleData is replaced by this updated one.
// No additional code block needed here, as it's a modification of an existing variable.