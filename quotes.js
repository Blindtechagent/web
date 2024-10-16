const thoughts = {
  "2024-10-16": "Believe you can and you're halfway there.",
  "2024-10-17": "Act as if what you do makes a difference. It does.",
  "2024-10-18": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "2024-10-19": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
  // Add more dates and thoughts as needed
};

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Function to display today's thought
function displayThought() {
  const thoughtElement = document.getElementById('thought');
  thoughtElement.textContent = thoughts[today] || "No thought available for today.";
}


// Display the thought when the page loads
window.onload = displayThought;

// copy function for thought
document.getElementById('copyBtn').addEventListener('click', function () {
  const text = document.getElementById('thought').innerText;
  navigator.clipboard.writeText(text).then(() => {
    announce('Copied successfully');
  }).catch(err => {
    announce('error copying text');
  });
});