const thoughts = {
    "2025-10-30": "Peace begins when you stop arguing with what is.",
  "2025-10-31": "Your thoughts are powerful—feed the ones that make you lighter.",
  "2025-11-01": "You don’t always need a plan; sometimes you just need presence.",
  "2025-11-02": "Growth starts the moment you choose awareness over reaction.",
  "2025-11-03": "Let go of needing control—clarity comes with calm, not chaos.",
  "2025-11-04": "Every day offers a quiet chance to begin again.",
  "2025-11-05": "You glow differently when your mind is at peace.",
  "2025-11-06": "The way you speak to yourself shapes what you become.",
  "2025-11-07": "Not every storm is meant to destroy—some come to clear the path.",
  "2025-11-08": "Sometimes peace means walking away without anger.",
  "2025-11-09": "You are not behind—life unfolds at the pace meant for you.",
  "2025-11-10": "Stillness is not a pause in life; it’s part of living it well.",
  "2025-11-11": "Your perspective decides whether it’s a problem or a possibility.",
  "2025-11-12": "You can’t pour clarity from a cluttered mind—breathe first.",
  "2025-11-13": "When you stop chasing, what’s meant for you finds its way easily.",
  "2025-11-14": "The most beautiful growth often happens quietly.",
  "2025-11-15": "Choose thoughts that water your peace, not your worry.",
  "2025-11-16": "Let silence teach you what noise never could.",
  "2025-11-17": "You are allowed to move slowly—progress is still progress.",
  "2025-11-18": "Calm minds create strong decisions.",
  "2025-11-19": "Energy flows where your attention goes—protect it.",
  "2025-11-20": "The best answers often arrive after you stop searching.",
  "2025-11-21": "Kindness is wisdom in motion.",
  "2025-11-22": "A peaceful mind sees possibilities where a restless one sees problems.",
  "2025-11-23": "Healing happens when you stop rushing your own becoming.",
  "2025-11-24": "You’re not lost—you’re learning your way forward.",
  "2025-11-25": "True strength is staying gentle in a harsh world.",
  "2025-11-26": "Every moment is a mirror—see what it’s trying to show you.",
  "2025-11-27": "Don’t confuse movement with progress—stillness can be powerful too.",
  "2025-11-28": "Peace grows when you stop needing to be right.",
  "2025-11-29": "Your calm is contagious—carry it with quiet confidence.",
  "2025-11-30": "You are the sky—everything else is just passing weather."

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