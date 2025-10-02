// DOM Elements
const questionInput = document.getElementById("questionInput");
const submitBtn = document.getElementById("submitBtn");
const loadingIndicator = document.getElementById("loadingIndicator");
const resultPanel = document.getElementById("resultPanel");
const resultContent = document.getElementById("resultContent");

// Gemini API Config
const API_KEY = "AIzaSyC8Z2OXA3gw4iWAvAhTnuVdBt5ny1vEaU4";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`;

// Function to render Markdown-like text with LaTeX support
function renderFormattedText(text) {
  let html = text;

  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Convert *italic* to <em>
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert `code` to <code>
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Convert headers (## Header)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Convert bullet lists
  html = html.replace(/^\* (.+)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Convert numbered lists
  html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
  
  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  
  // Wrap in paragraph if not already
  if (!html.startsWith('<')) {
    html = '<p>' + html + '</p>';
  }

  return html;
}

// Function to render LaTeX equations
function renderMathEquations(element) {
  // تحقق من وجود MathJax أو KaTeX
  if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise([element]).catch((err) => console.log('MathJax error:', err));
  } else if (typeof katex !== 'undefined') {
    // رندر inline math $...$
    element.innerHTML = element.innerHTML.replace(/\$([^\$]+)\$/g, (match, eq) => {
      try {
        return katex.renderToString(eq, { throwOnError: false });
      } catch (e) {
        return match;
      }
    });
    
    // رندر display math $$...$$
    element.innerHTML = element.innerHTML.replace(/\$\$([^\$]+)\$\$/g, (match, eq) => {
      try {
        return katex.renderToString(eq, { displayMode: true, throwOnError: false });
      } catch (e) {
        return match;
      }
    });
  }
}

// Function to call Gemini
async function callGemini(question) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are SAR (Synthetic Aperture Radar) AI Assistant, an expert in remote sensing, satellite technology, and radar systems.
              
Answer the following question in a clear, educational, and engaging way. Use technical accuracy but make it accessible. 
If the question is about SAR, remote sensing, satellites, or related topics, provide detailed explanations. 
If it's off-topic, politely redirect to SAR-related topics.

Question: ${question}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();
  console.log("Gemini response:", data);

  if (data.candidates && data.candidates.length > 0) {
    return data.candidates[0].content.parts[0].text;
  } else {
    return "⚠️ لم يتم إرجاع أي نتيجة. تحقق من الـ API Key.";
  }
}

// Handle form submission
submitBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    alert("Please enter a question first!");
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  loadingIndicator.classList.remove("hidden");
  resultPanel.classList.add("hidden");

  try {
    // Call Gemini AI
    const text = await callGemini(question);

    // Render formatted text
    const formattedHTML = renderFormattedText(text);
    resultContent.innerHTML = formattedHTML;
    
    // Render math equations if present
    renderMathEquations(resultContent);

    loadingIndicator.classList.add("hidden");
    resultPanel.classList.remove("hidden");

    // Scroll to result
    resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    console.error("[v0] Error calling Gemini:", error);

    // Show error message
    resultContent.innerHTML = `<p><strong>⚠️ Communication Error</strong></p>
      <p>Unable to reach the radar intelligence system. Please check your connection and try again.</p>
      <p><em>Error: ${error.message}</em></p>`;
    loadingIndicator.classList.add("hidden");
    resultPanel.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
  }
});

// Allow Enter key to submit (with Shift+Enter for new line)
questionInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submitBtn.click();
  }
});

// Add focus glow effect
questionInput.addEventListener("focus", () => {
  questionInput.parentElement.style.transform = "translateY(-2px)";
});

questionInput.addEventListener("blur", () => {
  questionInput.parentElement.style.transform = "translateY(0)";
});