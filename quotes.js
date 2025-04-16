const thoughts = {
  "2025-04-16": "You don’t have to see the whole staircase—just take the first step with faith.",
  "2025-04-17": "Let your dreams be bigger than your fears and your actions louder than your words.",
  "2025-04-18": "In every moment, you have the power to choose hope over despair.",
  "2025-04-19": "Sometimes the smallest step in the right direction ends up being the biggest leap of your life.",
  "2025-04-20": "The strength to keep going comes from believing that better days are ahead.",
  "2025-04-21": "Be patient with yourself; growth takes time, and every effort counts.",
  "2025-04-22": "Your voice matters—use it to spread kindness, truth, and positivity.",
  "2025-04-23": "Progress is progress, no matter how small. Keep moving forward.",
  "2025-04-24": "Great things never come from comfort zones—step out and shine.",
  "2025-04-25": "Your attitude determines your direction—stay positive and focused.",
  "2025-04-26": "Don't be afraid to start over. It's a new chance to rebuild what you truly want.",
  "2025-04-27": "You are capable of amazing things—believe it and act on it every day.",
  "2025-04-28": "Let today be the day you silence your doubts and amplify your courage.",
  "2025-04-29": "Even in uncertainty, choose to trust the journey and keep going.",
  "2025-04-30": "Success is built on consistency, not perfection—just keep showing up."
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