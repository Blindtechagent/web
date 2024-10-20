const thoughts = {
  "2024-10-20": "Believe in yourself, take the leap of faith and watch the universe conspire to make your dreams a reality.",

  "2024-10-21": "Life's beauty lies in its unpredictability, so keep smiling and make the most of every moment.",

  "2024-10-22": "Your worth is not measured by your accomplishments, but by your willingness to keep trying.",

  "2024-10-23": "Every sunrise marks a new chance to rewrite your story, make it a bestseller.",

  "2024-10-24": "You are stronger than you think, braver than you feel, and smarter than you know.",

  "2024-10-25": "Don't let fear hold you back, let curiosity drive you forward.",

  "2024-10-26": "Life's journey is not about finding answers, but about asking the right questions.",

  "2024-10-27": "Your voice matters, use it to uplift and inspire others.",

  "2024-10-28": "Every setback is an opportunity to come back stronger and wiser.",

  "2024-10-29": "You are one thought away from changing your life's trajectory.",

  "2024-10-30": "Embrace your uniqueness, it's your greatest strength.",

  "2024-10-31": "The best is yet to come, keep shining and believing."

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