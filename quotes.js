const thoughts = {
  "2025-06-20": "Each new day brings a fresh opportunity to move closer to your dreams.",
  "2025-06-21": "You grow through what you go through—keep growing.",
  "2025-06-22": "Your journey is unique; don’t compare your chapter one to someone else’s chapter ten.",
  "2025-06-23": "Let your courage rise higher than your fear.",
  "2025-06-24": "Even slow progress is progress—celebrate every step.",
  "2025-06-25": "You are stronger than you think and braver than you feel.",
  "2025-06-26": "One act of kindness can change someone’s entire day.",
  "2025-06-27": "Mistakes are proof that you’re trying—keep learning.",
  "2025-06-28": "Hope is the quiet strength that keeps you going when everything else says stop.",
  "2025-06-29": "Push past your doubts and trust your inner strength.",
  "2025-06-30": "Small daily actions can lead to big, lasting change.",
  "2025-07-01": "The light you seek is already within you—let it shine.",
  "2025-07-02": "When it feels hard, remember why you started.",
  "2025-07-03": "You are not behind—you are on your own timeline.",
  "2025-07-04": "Your potential is endless when you believe in yourself.",
  "2025-07-05": "Focus on progress, not perfection.",
  "2025-07-06": "Don’t wait for motivation—create it through action.",
  "2025-07-07": "What you do today can change all your tomorrows.",
  "2025-07-08": "Keep showing up. You’re closer than you think.",
  "2025-07-09": "You have survived every hard day—this one is no different.",
  "2025-07-10": "Let go of fear and step into the power of possibility.",
  "2025-07-11": "Be the reason someone believes in the goodness of people.",
  "2025-07-12": "Progress may be quiet, but its impact is loud.",
  "2025-07-13": "Be proud of how far you’ve come and excited for what’s next.",
  "2025-07-14": "Confidence is built by doing the things that scare you.",
  "2025-07-15": "Your story matters—keep writing it with courage.",
  "2025-07-16": "Strength is found in persistence, not ease.",
  "2025-07-17": "Every day is a fresh chance to begin again.",
  "2025-07-18": "Keep hope in your heart and determination in your steps.",
  "2025-07-19": "Your mindset shapes your reality—choose thoughts that uplift.",
  "2025-07-20": "Believe in your dreams, even on the days they feel far away."
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