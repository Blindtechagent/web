const thoughts = {
    "2025-07-23": "Rest is not weakness; it’s part of your strength.",
  "2025-07-24": "You carry more light than you realize—keep shining.",
  "2025-07-25": "Hard moments don’t last, but the strength you gain from them does.",
  "2025-07-26": "Your worth isn’t measured by productivity—just by being, you are enough.",
  "2025-07-27": "Doubt has a loud voice—let your actions speak louder.",
  "2025-07-28": "The climb may be steep, but so is your resilience.",
  "2025-07-29": "Be patient with the process—beautiful things take time.",
  "2025-07-30": "Trust that every step forward, no matter how small, is progress.",
  "2025-07-31": "You’re building something meaningful—keep laying the bricks.",
  "2025-08-01": "Choose kindness, especially for yourself.",
  "2025-08-02": "Growth happens in the quiet moments too—honor them.",
  "2025-08-03": "Let your passion be louder than your fear.",
  "2025-08-04": "You’re allowed to be a work in progress and still be proud.",
  "2025-08-05": "Your presence makes a difference—never underestimate that.",
  "2025-08-06": "Let go of what you can’t control and focus on what you can create.",
  "2025-08-07": "Some days, simply showing up is the bravest thing you can do.",
  "2025-08-08": "Your future is built by what you do consistently, not occasionally.",
  "2025-08-09": "Every step forward is a victory—celebrate them all.",
  "2025-08-10": "You don’t need all the answers to take the first step.",
  "2025-08-11": "There’s strength in vulnerability—own your truth.",
  "2025-08-12": "Let today be a fresh page in your story—write it with purpose.",
  "2025-08-13": "You’re not stuck—you’re in the process of becoming.",
  "2025-08-14": "Clarity comes from movement, not from standing still.",
  "2025-08-15": "Let yourself evolve—you were never meant to stay the same.",
  "2025-08-16": "You have more power than you think—use it with intention.",
  "2025-08-17": "The way you speak to yourself shapes your path—choose words that lift.",
  "2025-08-18": "Success is built on many small, quiet choices.",
  "2025-08-19": "You are not the storm—you are the one who weathers it.",
  "2025-08-20": "Take pride in how far you’ve come, even if the road was rough.",
  "2025-08-21": "Progress isn’t always loud—trust the quiet growth within.",
  "2025-08-22": "You don’t have to rush—what’s meant for you will find you.",
  "2025-08-23": "Your resilience is a quiet superpower—honor it.",
  "2025-08-24": "When you feel overwhelmed, return to your why.",
  "2025-08-25": "The courage to begin is often the most powerful step.",
  "2025-08-26": "Let your heart guide you when your mind feels cluttered.",
  "2025-08-27": "Even when it’s hard, keep choosing hope.",
  "2025-08-28": "You’re not alone—someone is inspired by your strength.",
  "2025-08-29": "Don’t dim your light to fit in—shine in your own way.",
  "2025-08-30": "The journey is yours—walk it with confidence and compassion."
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