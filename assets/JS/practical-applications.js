// Practical Applications - Immersive SAR Mission Experience
// This script handles the cinematic journey through a real-world disaster case study

// Stage Management
let currentStage = 0;
let selectedBranch = null;
const reflectionAnswers = [];

// Stage Definitions
const stages = [
  {
    id: "welcome",
    title: "MISSION BRIEFING",
    description:
      "In this stage, you will go through the cycle of studying a real-world disaster case. We'll take you from the very beginning – selecting the region, studying the event history, and analyzing satellite images – until you form your own conclusions.",
    type: "intro",
  },
  {
    id: "earth-view",
    title: "GLOBAL PERSPECTIVE",
    description:
      "There are many regions to study across our planet, but today we'll focus on a critical event that demonstrates the power of SAR technology in disaster response.",
    type: "earth-globe",
  },
  {
    id: "derna-zoom",
    title: "DESTINATION: DERNA, LIBYA",
    description:
      "We're zooming into Derna, a coastal city that experienced catastrophic flooding in September 2023. Let's examine this region before the disaster struck.",
    type: "region-info",
    regionData: {
      name: "Derna",
      country: "Libya",
      coordinates: "32.7569° N, 22.6376° E",
      population: "~100,000",
      event: "Catastrophic Flooding - September 2023",
      description:
        "A coastal Mediterranean city vulnerable to extreme weather events due to aging infrastructure and geographical positioning.",
    },
  },
  {
    id: "optical-images",
    title: "OPTICAL SATELLITE IMAGERY",
    description:
      "This is what Derna looked like before the flood using optical satellite imagery. These images show us the visible spectrum – what our eyes would see from space.",
    type: "optical-images",
    images: [
      {
        title: "Pre-Disaster Overview",
        description:
          "Wide view of Derna showing the city layout and surrounding terrain.",
        query: "aerial view of coastal city Derna Libya before flooding",
      },
      {
        title: "Infrastructure Detail",
        description:
          "Closer view showing buildings, roads, and the dam system.",
        query: "satellite image of urban infrastructure and dams in Derna",
      },
      {
        title: "Coastal Region",
        description:
          "The Mediterranean coastline and river system through the city.",
        query: "coastal satellite view of Derna Libya with river delta",
      },
    ],
  },
  {
    id: "sar-introduction",
    title: "WHY WE NEED SAR",
    description:
      "You can't fully study and understand the disaster just through optical images. Optical sensors can't see through clouds, work at night, or penetrate vegetation. To really see and analyze the data, we use SAR. Our Sentinel-1 radar observed the event, and now we reveal that story to you.",
    type: "sar-intro",
    limitations: [
      "Optical imagery is blocked by clouds and weather",
      "Cannot capture data during nighttime",
      "Limited penetration through vegetation or structures",
      "Affected by atmospheric conditions",
    ],
    sarAdvantages: [
      "Works day and night, regardless of weather",
      "Penetrates clouds, smoke, and light vegetation",
      "Detects surface changes and deformation",
      "Measures water extent and flood mapping",
    ],
  },
  {
    id: "branching-analysis",
    title: "CHOOSE YOUR ANALYSIS PATH",
    description:
      "Now it's time to dive into the SAR analysis. You have two paths to explore. Both will give you valuable insights, but from different perspectives.",
    type: "branching-choice",
    choices: [
      {
        id: "flooding-extent",
        icon: "🌊",
        title: "Analyze Flooding Extent",
        description:
          "Examine how far the water spread across the city and surrounding areas. Understand the scale of the disaster through water detection analysis.",
      },
      {
        id: "infrastructure-damage",
        icon: "🏗️",
        title: "Assess Infrastructure Damage",
        description:
          "Investigate the damage to buildings, roads, and critical infrastructure. Use SAR coherence analysis to detect structural changes.",
      },
    ],
  },
  {
    id: "sar-analysis",
    title: "SAR ANALYSIS RESULTS",
    description:
      "Based on your chosen path, here are the SAR analysis results from Sentinel-1 radar observations.",
    type: "sar-analysis",
  },
  {
    id: "reflection",
    title: "MISSION REFLECTION",
    description:
      "Based on the SAR images and analysis you've reviewed, let's test your understanding of what happened in Derna.",
    type: "reflection",
    questions: [
      {
        id: "q1",
        question:
          "What is the primary advantage of SAR over optical imagery in disaster response?",
        options: [
          "SAR provides higher resolution images",
          "SAR can operate through clouds and at night",
          "SAR is less expensive to operate",
          "SAR shows better color information",
        ],
        correct: 1,
      },
      {
        id: "q2",
        question:
          "Based on the SAR analysis, what was the main cause of the catastrophic flooding in Derna?",
        options: [
          "Tsunami from the Mediterranean Sea",
          "Dam collapse during extreme rainfall",
          "Gradual sea level rise",
          "Underground water eruption",
        ],
        correct: 1,
      },
      {
        id: "q3",
        question: "How can SAR coherence analysis help in disaster assessment?",
        options: [
          "It measures the temperature of affected areas",
          "It detects changes in surface structure between observations",
          "It predicts future disasters",
          "It counts the number of people affected",
        ],
        correct: 1,
      },
    ],
  },
];

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Practical Applications initialized");

  // Show loading state for 3 seconds
  setTimeout(() => {
    hideLoading();
    showStage(0);
  }, 3000);

  // Setup navigation buttons
  document
    .getElementById("prevStageBtn")
    .addEventListener("click", () => navigateStage(-1));
  // document.getElementById("nextStageBtn").addEventListener("click", () => navigateStage(1))
});

// Hide loading state and show content
function hideLoading() {
  const loadingState = document.getElementById("loadingState");
  const stageContainer = document.getElementById("stageContainer");
  const stageNavigation = document.getElementById("stageNavigation");
  const missionTimeline = document.getElementById("missionTimeline");

  loadingState.style.display = "none";
  stageContainer.classList.remove("hidden");
  stageNavigation.classList.remove("hidden");
  missionTimeline.classList.remove("hidden");
}

// Show specific stage
function showStage(stageIndex) {
  currentStage = stageIndex;
  const stage = stages[stageIndex];
  const stageContainer = document.getElementById("stageContainer");

  // Update timeline
  updateTimeline();

  // Render stage content based on type
  let content = "";

  switch (stage.type) {
    case "intro":
      content = renderIntroStage(stage);
      break;
    case "earth-globe":
      content = renderEarthGlobeStage(stage);
      break;
    case "region-info":
      content = renderRegionInfoStage(stage);
      break;
    case "optical-images":
      content = renderOpticalImagesStage(stage);
      break;
    case "sar-intro":
      content = renderSARIntroStage(stage);
      break;
    case "branching-choice":
      content = renderBranchingChoiceStage(stage);
      break;
    case "sar-analysis":
      content = renderSARAnalysisStage(stage);
      break;
    case "reflection":
      content = renderReflectionStage(stage);
      break;
  }

  stageContainer.innerHTML = content;

  // Update navigation buttons
  updateNavigationButtons();

  // Attach event listeners for interactive elements
  attachStageEventListeners(stage);
}

// Render different stage types
function renderIntroStage(stage) {
  return `
    <div class="stage-content">
      <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div style="text-align: center; margin-top: 3rem;">
        <div style="font-size: 8rem; margin-bottom: 2rem;">🛰️</div>
        <p style="color: var(--color-electric-cyan); font-size: 1.3rem; font-family: var(--font-display);">
          MISSION OBJECTIVE: DISASTER ANALYSIS
        </p>
      </div>
    </div>
  `;
}

function renderEarthGlobeStage(stage) {
  return `
      <div class="video-layer visible" id="bgLayer" aria-hidden="false">
    <video class="bg" id="bgVideo" autoplay muted loop playsinline preload="auto"
        poster="assets/video/earth-poster.jpg">
        <source src="assets/video/earth.mp4" type="video/mp4">
        Your browser doesn't support the Earth background video.
    </video>
    <div class="video-overlay">
        <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
    </div>
</div>
  `;
}

function renderRegionInfoStage(stage) {
    return `
    <div class="video-layer visible" id="zoomLayer" aria-hidden="false">
        <video class="zoom" id="zoomVideo" autoplay muted playsinline preload="auto"
            poster="assets/video/derna-poster.jpg">
            <source src="assets/video/derna-zoom.mp4" type="video/mp4">
            <source src="assets/video/derna-zoom.webm" type="video/webm">
            Your browser doesn't support the Derna zoom video.
        </video>
    </div>
    `;
}


function renderOpticalImagesStage(stage) {
  return `
    <div class="stage-content">
      <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div class="image-grid">
        ${stage.images
          .map(
            (img) => `
          <div class="image-panel">
            <img src="/--encodeuricomponent-img-query--.jpg" alt="${img.title}">
            <h4>${img.title}</h4>
            <p>${img.description}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255, 136, 0, 0.1); border: 2px solid rgba(255, 136, 0, 0.4); border-radius: 15px;">
        <p style="color: #ff8800; font-size: 1.1rem;">
          ⚠️ <strong>Limitation:</strong> But you can't fully study and understand the disaster just through optical images...
        </p>
      </div>
    </div>
  `;
}

function renderSARIntroStage(stage) {
  return `
    <div class="stage-content">
      <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
        <div style="background: rgba(255, 68, 68, 0.1); border: 2px solid rgba(255, 68, 68, 0.4); border-radius: 15px; padding: 2rem;">
          <h3 style="color: #ff4444; font-family: var(--font-display); margin-bottom: 1rem;">❌ Optical Limitations</h3>
          <ul style="color: var(--color-soft-white); line-height: 2;">
            ${stage.limitations.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
        <div style="background: rgba(0, 255, 136, 0.1); border: 2px solid rgba(0, 255, 136, 0.4); border-radius: 15px; padding: 2rem;">
          <h3 style="color: var(--color-neon-green); font-family: var(--font-display); margin-bottom: 1rem;">✓ SAR Advantages</h3>
          <ul style="color: var(--color-soft-white); line-height: 2;">
            ${stage.sarAdvantages.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div style="text-align: center; font-size: 6rem; margin: 2rem 0;">🛰️📡</div>
    </div>
  `;
}

function renderBranchingChoiceStage(stage) {
  return `
    <div class="stage-content">
      <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div class="branching-choice">
        ${stage.choices
          .map(
            (choice) => `
          <div class="choice-card" data-choice="${choice.id}">
            <div class="choice-icon">${choice.icon}</div>
            <h3>${choice.title}</h3>
            <p>${choice.description}</p>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSARAnalysisStage(stage) {
  const branchContent =
    selectedBranch === "flooding-extent"
      ? {
          title: "Flooding Extent Analysis",
          images: [
            {
              title: "Pre-Flood SAR Image",
              description:
                "Sentinel-1 SAR image before the disaster showing normal water levels.",
              query:
                "SAR satellite image of Derna before flooding dark areas water",
            },
            {
              title: "Post-Flood SAR Image",
              description:
                "SAR image after the flood showing extensive water coverage (dark areas indicate water).",
              query:
                "SAR satellite image of Derna after flooding extensive dark water areas",
            },
            {
              title: "Flood Extent Map",
              description:
                "Change detection analysis highlighting the flooded areas in red.",
              query:
                "flood extent map SAR analysis Derna red highlighted flooded areas",
            },
          ],
          findings: [
            "Water extent increased by over 300% in the urban area",
            "Flood waters reached up to 3km inland from the coast",
            "River discharge exceeded normal levels by 1000x",
            "SAR detected water under debris and vegetation",
          ],
        }
      : {
          title: "Infrastructure Damage Assessment",
          images: [
            {
              title: "Coherence Analysis",
              description:
                "SAR coherence map showing structural changes (red = high change/damage).",
              query: "SAR coherence map infrastructure damage red areas Derna",
            },
            {
              title: "Building Damage",
              description:
                "Detailed view of damaged buildings and collapsed structures.",
              query: "SAR image building damage collapsed structures Derna",
            },
            {
              title: "Dam Failure Site",
              description:
                "SAR analysis of the dam collapse that caused the catastrophic flooding.",
              query: "SAR satellite image dam collapse failure site Derna",
            },
          ],
          findings: [
            "Two major dams completely collapsed upstream",
            "Over 1,000 buildings showed significant structural damage",
            "Critical infrastructure including bridges destroyed",
            "SAR coherence detected subtle ground deformation",
          ],
        };

  return `
    <div class="stage-content">
      <h1 class="stage-title">${branchContent.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div class="image-grid">
        ${branchContent.images
          .map(
            (img) => `
          <div class="image-panel">
            <img src="/--encodeuricomponent-img-query--.jpg" alt="${img.title}">
            <h4>${img.title}</h4>
            <p>${img.description}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <div style="background: rgba(0, 255, 136, 0.1); border: 2px solid var(--color-neon-green); border-radius: 15px; padding: 2rem; margin-top: 2rem;">
        <h3 style="color: var(--color-neon-green); font-family: var(--font-display); margin-bottom: 1rem;">🔍 Key Findings</h3>
        <ul style="color: var(--color-soft-white); line-height: 2;">
          ${branchContent.findings
            .map((finding) => `<li>${finding}</li>`)
            .join("")}
        </ul>
      </div>
    </div>
  `;
}

function renderReflectionStage(stage) {
  return `
    <div class="stage-content">
      <h1 class="stage-title">${stage.title}</h1>
      <p class="stage-description">${stage.description}</p>
      <div class="reflection-container">
        ${stage.questions
          .map(
            (q, index) => `
          <div class="reflection-question" data-question="${index}">
            <h3>Question ${index + 1}: ${q.question}</h3>
            <div class="reflection-options">
              ${q.options
                .map(
                  (option, optIndex) => `
                <div class="reflection-option" data-option="${optIndex}">
                  ${option}
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div id="reflectionResults" style="display: none; text-align: center; margin-top: 3rem; padding: 2rem; background: rgba(0, 255, 136, 0.1); border: 2px solid var(--color-neon-green); border-radius: 15px;">
        <h2 style="color: var(--color-neon-green); font-family: var(--font-display); font-size: 2rem; margin-bottom: 1rem;">
          🎯 MISSION COMPLETE
        </h2>
        <p style="color: var(--color-soft-white); font-size: 1.3rem;">
          Score: <span id="reflectionScore" style="color: var(--color-electric-cyan); font-weight: bold;">0</span>/3
        </p>
        <p style="color: var(--color-gray-muted); margin-top: 1rem;">
          You've completed the practical applications mission. You now understand how SAR technology is used in real-world disaster response and analysis.
        </p>
      </div>
    </div>
  `;
}

// Attach event listeners for interactive elements
function attachStageEventListeners(stage) {
  if (stage.type === "branching-choice") {
    const choiceCards = document.querySelectorAll(".choice-card");
    choiceCards.forEach((card) => {
      card.addEventListener("click", () => {
        selectedBranch = card.dataset.choice;
        console.log("[v0] Selected branch:", selectedBranch);
        navigateStage(1);
      });
    });
  }

  if (stage.type === "reflection") {
    const options = document.querySelectorAll(".reflection-option");
    options.forEach((option) => {
      option.addEventListener("click", handleReflectionAnswer);
    });
  }
}

// Handle reflection question answers
function handleReflectionAnswer(event) {
  const option = event.target;
  const questionDiv = option.closest(".reflection-question");
  const questionIndex = Number.parseInt(questionDiv.dataset.question);
  const optionIndex = Number.parseInt(option.dataset.option);
  const question = stages[currentStage].questions[questionIndex];

  // Disable all options in this question
  const allOptions = questionDiv.querySelectorAll(".reflection-option");
  allOptions.forEach((opt) => opt.classList.add("disabled"));

  // Mark selected
  option.classList.add("selected");

  // Store answer
  reflectionAnswers[questionIndex] = {
    selected: optionIndex,
    correct: question.correct,
  };

  // Check if all questions answered
  if (reflectionAnswers.length === stages[currentStage].questions.length) {
    showReflectionResults();
  }
}

// Show reflection results
function showReflectionResults() {
  const correctCount = reflectionAnswers.filter(
    (a) => a.selected === a.correct
  ).length;
  const resultsDiv = document.getElementById("reflectionResults");
  const scoreSpan = document.getElementById("reflectionScore");

  scoreSpan.textContent = correctCount;
  resultsDiv.style.display = "block";

  // Enable next button
  document.getElementById("nextStageBtn").disabled = false;
}

// Navigate between stages
function navigateStage(direction) {
  const stack = new Error().stack.split("\n")[2].trim();
  console.log(
    `[v0] Navigate clicked: direction=${direction}, currentStage=${currentStage}, caller=${stack}`
  );
  const newStage = currentStage + direction;
  console.log(`[v0] Calculated newStage=${newStage}`);

  if (newStage >= 0 && newStage < stages.length) {
    // Special handling for branching
    if (currentStage === 5 && direction === 1 && !selectedBranch) {
      alert("Please select an analysis path to continue.");
      return;
    }
    console.log(
      `[v0] Showing stage index=${newStage}, type=${stages[newStage].type}`
    );

    showStage(newStage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// Update timeline
function updateTimeline() {
  const timelineStages = document.querySelectorAll(".timeline-stage");
  const progress = document.getElementById("timelineProgress");

  timelineStages.forEach((stage, index) => {
    stage.classList.remove("active", "completed");
    if (index < currentStage) {
      stage.classList.add("completed");
    } else if (index === currentStage) {
      stage.classList.add("active");
    }
  });

  const progressPercent = (currentStage / (stages.length - 1)) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
  const prevBtn = document.getElementById("prevStageBtn");
  const nextBtn = document.getElementById("nextStageBtn");
  console.log(
    `[v0] Updating navigation buttons: currentStage=${currentStage}, stageType=${stages[currentStage].type}`
  );

  prevBtn.disabled = currentStage === 0;

  // Disable next button on reflection stage until all questions answered
  if (stages[currentStage].type === "reflection") {
    nextBtn.disabled =
      reflectionAnswers.length < stages[currentStage].questions.length;
    console.log(`[v0] Reflection stage - nextBtn.disabled=${nextBtn.disabled}`);
  } else {
    nextBtn.disabled = false;
  }

  // Change button text on last stage
  if (currentStage === stages.length - 1) {
    nextBtn.querySelector(".nav-text").textContent = "Complete Mission";
    nextBtn.onclick = () => {
      alert("Mission Complete! You can now return to the Learning Hub.");
      window.location.href = "explore.html";
    };
  } else {
    nextBtn.querySelector(".nav-text").textContent = "Continue";
    nextBtn.onclick = () => navigateStage(1);
  }
}

// Add this to your existing JavaScript file

// Function to show the region popup at the end of the video
function showRegionPopup(regionData) {
    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    document.body.appendChild(popupOverlay);

    // Create popup content
    const popup = document.createElement('div');
    popup.className = 'video-end-popup';
    popup.innerHTML = `
        <div class="popup-header">
            <h2 class="popup-title">REGION ANALYSIS COMPLETE</h2>
            <p class="popup-subtitle">${regionData.name}, ${regionData.country}</p>
        </div>
        
        <div class="popup-content">
            <div class="popup-map-section">
                <div class="map-container">
                    <div class="map-placeholder">
                        <div class="map-icon">🗺️</div>
                        <div class="map-text">REGIONAL OVERVIEW</div>
                        <div class="map-coordinates">${regionData.coordinates}</div>
                    </div>
                </div>
            </div>
            
            <div class="popup-info-section">
                <div class="region-stats">
                    <div class="stat-item">
                        <div class="stat-value">${regionData.population}</div>
                        <div class="stat-label">Population</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">Coastal</div>
                        <div class="stat-label">Geography</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">Urban</div>
                        <div class="stat-label">Area Type</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">High Risk</div>
                        <div class="stat-label">Flood Risk</div>
                    </div>
                </div>
                
                <p class="region-description">
                    ${regionData.description}
                </p>
                
                <div class="event-highlight">
                    <div class="event-title">SEPTEMBER 2023 EVENT</div>
                    <div class="event-details">
                        ${regionData.event}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="popup-footer">
            <button class="continue-button" id="continueFromPopup">
                <span>CONTINUE ANALYSIS</span>
                <span>→</span>
            </button>
        </div>
    `;

    document.body.appendChild(popup);

    // Show popup with animation
    setTimeout(() => {
        popupOverlay.classList.add('active');
        popup.classList.add('active');
    }, 100);

    // Add event listeners
    const continueBtn = document.getElementById('continueFromPopup');
    continueBtn.addEventListener('click', () => {
        closeRegionPopup();
        // Continue to next stage
        if (typeof navigateStage === 'function') {
            navigateStage(1);
        }
    });

    // Close on overlay click
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closeRegionPopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            closeRegionPopup();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Function to close the popup
function closeRegionPopup() {
    const popup = document.querySelector('.video-end-popup');
    const overlay = document.querySelector('.popup-overlay');

    if (popup) {
        popup.classList.remove('active');
        overlay.classList.remove('active');
        
        setTimeout(() => {
            popup.remove();
            overlay.remove();
        }, 400);
    }
}

// Modify your existing region info stage to include video end detection
function attachVideoEndListener() {
    const zoomVideo = document.getElementById('zoomVideo');
    if (zoomVideo) {
        zoomVideo.addEventListener('ended', function() {
            // Get current stage data
            const currentStageData = stages.find(stage => stage.type === 'region-info');
            if (currentStageData && currentStageData.regionData) {
                // Show popup with region data
                setTimeout(() => {
                    showRegionPopup(currentStageData.regionData);
                }, 1000); // 1 second delay after video ends
            }
        });
    }
}

// Update your existing attachStageEventListeners function
function attachStageEventListeners(stage) {
    if (stage.type === 'region-info') {
        // Wait for video to be loaded and attach end listener
        setTimeout(attachVideoEndListener, 500);
    }
    
    // ... rest of your existing event listener code
}
// Add these functions to your existing JavaScript

// Function to create and show the clickable dot
function createVideoEndDot(regionData) {
    const videoLayer = document.getElementById('zoomLayer');
    if (!videoLayer) return;

    // Remove any existing dot
    const existingDot = document.querySelector('.video-end-dot');
    if (existingDot) existingDot.remove();

    // Create the dot
    const dot = document.createElement('div');
    dot.className = 'video-end-dot';
    dot.innerHTML = '●';
    dot.style.cssText = `
        position: absolute;
        top: 45%;
        left: 55%;
        transform: translate(-50%, -50%);
    `;

    // Create hint text
    const hint = document.createElement('div');
    hint.className = 'dot-hint';
    hint.textContent = 'Click for region info';
    
    videoLayer.appendChild(dot);
    videoLayer.appendChild(hint);

    // Show dot and hint with delay
    setTimeout(() => {
        dot.classList.add('active');
        setTimeout(() => {
            hint.classList.add('active');
        }, 500);
    }, 500);

    // Add click event to show popup
    dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showRegionPopup(regionData, dot);
    });

    // Hide hint when dot is clicked
    dot.addEventListener('click', () => {
        hint.classList.remove('active');
    });

    return dot;
}

// Function to show the small scrollable popup
function showRegionPopup(regionData, dotElement) {
    // Remove any existing popup
    const existingPopup = document.querySelector('.region-popup');
    if (existingPopup) existingPopup.remove();

    const videoLayer = document.getElementById('zoomLayer');
    if (!videoLayer) return;

    // Determine popup position based on dot position
    const dotRect = dotElement.getBoundingClientRect();
    const videoRect = videoLayer.getBoundingClientRect();
    
    let popupPosition = 'right';
    let popupStyle = '';
    
    // Position popup to avoid going off-screen
    if (dotRect.left > videoRect.width * 0.7) {
        popupPosition = 'left';
        popupStyle = `right: ${videoRect.width - dotRect.left + 20}px;`;
    } else if (dotRect.top < videoRect.height * 0.3) {
        popupPosition = 'bottom';
        popupStyle = `left: ${dotRect.left - videoRect.left}px;`;
    } else if (dotRect.top > videoRect.height * 0.7) {
        popupPosition = 'top';
        popupStyle = `left: ${dotRect.left - videoRect.left}px;`;
    } else {
        popupStyle = `left: ${dotRect.right - videoRect.left + 10}px`;
    }

    // Create popup
    const popup = document.createElement('div');
    popup.className = `region-popup ${popupPosition}`;
    popup.style.cssText = popupStyle;
    
    popup.innerHTML = `
        <button class="popup-close-btn" onclick="closeRegionPopup()">×</button>
        <div class="popup-header">
            <h3 class="popup-title">${regionData.name}</h3>
            <p class="popup-subtitle">${regionData.country}</p>
        </div>
        
        <div class="popup-scroll-content">
            <div class="region-info">
                <div class="region-stats-compact">
                    <div class="stat-item-compact">
                        <div class="stat-value-compact">${regionData.population}</div>
                        <div class="stat-label-compact">Population</div>
                    </div>
                    <div class="stat-item-compact">
                        <div class="stat-value-compact">Coastal</div>
                        <div class="stat-label-compact">Geography</div>
                    </div>
                    <div class="stat-item-compact">
                        <div class="stat-value-compact">${regionData.coordinates.split(' ')[0]}</div>
                        <div class="stat-label-compact">Latitude</div>
                    </div>
                    <div class="stat-item-compact">
                        <div class="stat-value-compact">${regionData.coordinates.split(' ')[2]}</div>
                        <div class="stat-label-compact">Longitude</div>
                    </div>
                </div>
                
                <p class="region-description-compact">
                    ${regionData.description}
                </p>
                
                <div class="event-highlight-compact">
                    <div class="event-title-compact">SEPTEMBER 2023</div>
                    <div class="event-details-compact">
                        ${regionData.event}
                    </div>
                </div>
            </div>
        </div>
        
    `;

    videoLayer.appendChild(popup);

    // Show popup with animation
    setTimeout(() => {
        popup.classList.add('active');
    }, 50);

    // Close popup when clicking outside
    const closeOnOutsideClick = (e) => {
        if (!popup.contains(e.target) && e.target !== dotElement) {
            closeRegionPopup();
            document.removeEventListener('click', closeOnOutsideClick);
        }
    };

    setTimeout(() => {
        document.addEventListener('click', closeOnOutsideClick);
    }, 100);

    // Close on escape key
    const closeOnEscape = (e) => {
        if (e.key === 'Escape') {
            closeRegionPopup();
            document.removeEventListener('keydown', closeOnEscape);
        }
    };
    document.addEventListener('keydown', closeOnEscape);
}

// Function to close the popup
function closeRegionPopup() {
    const popup = document.querySelector('.region-popup');
    if (popup) {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Function to continue to next stage from popup
function continueFromPopup() {
    closeRegionPopup();
    
    // Remove dot and hint
    const dot = document.querySelector('.video-end-dot');
    const hint = document.querySelector('.dot-hint');
    if (dot) dot.remove();
    if (hint) hint.remove();
    
    // Continue to next stage
    if (typeof navigateStage === 'function') {
        setTimeout(() => {
            navigateStage(1);
        }, 500);
    }
}

// Update your existing video end detection
function attachVideoEndListener() {
    const zoomVideo = document.getElementById('zoomVideo');
    if (zoomVideo) {
        zoomVideo.addEventListener('ended', function() {
            // Get current stage data
            const currentStageData = stages.find(stage => stage.type === 'region-info');
            if (currentStageData && currentStageData.regionData) {
                // Create clickable dot instead of auto-showing popup
                setTimeout(() => {
                    createVideoEndDot(currentStageData.regionData);
                }, 1000);
            }
        });

        // Also hide any overlay text when video starts
        zoomVideo.addEventListener('play', function() {
            const overlay = document.querySelector('.video-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }
}

// Update your region info stage render function to ensure overlay is hidden
function renderRegionInfoStage(stage) {
    return `
    <div class="video-layer visible" id="zoomLayer" aria-hidden="false">
        <video class="zoom" id="zoomVideo" autoplay muted playsinline preload="auto"
            poster="assets/video/derna-poster.jpg">
            <source src="assets/video/derna-zoom.mp4" type="video/mp4">
            <source src="assets/video/derna-zoom.webm" type="video/webm">
            Your browser doesn't support the Derna zoom video.
        </video>

        <!-- This overlay will be hidden by CSS -->
        <div class="video-overlay" id="overlayContent" style="display: none;">
            <h1 class="stage-title">${stage.title}</h1>
            <p class="stage-description">${stage.description}</p>
            
            <div class="region-panel">
                <h3>📍 ${stage.regionData.name}, ${stage.regionData.country}</h3>
                <p><strong>Coordinates:</strong> ${stage.regionData.coordinates}</p>
                <p><strong>Population:</strong> ${stage.regionData.population}</p>
                <p><strong>Event:</strong> ${stage.regionData.event}</p>
                <p style="margin-top: 1rem;">${stage.regionData.description}</p>
            </div>
        </div>
    </div>
    `;
}