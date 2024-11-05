const thoughts = {
  "2024-11-01": "Today is a blank canvas; paint it with your passion, dreams, and kindness.",

  "2024-11-02": "The only limits you have are the ones you place on yourself, so dream big and live bold.",

  "2024-11-03": "True strength comes not from avoiding challenges, but from facing them head-on with grace.",

  "2024-11-04": "Happiness is found in gratitude, not in perfection.",

  "2024-11-05": "The journey of self-discovery is the most beautiful adventure you’ll ever take.",

  "2024-11-06": "Your dreams don’t have an expiration date; take a deep breath and try again.",

  "2024-11-07": "Success is not about speed, but about perseverance and staying true to your path.",

  "2024-11-08": "Your actions today shape the foundation of your future—choose them wisely.",

  "2024-11-09": "When you believe in the goodness of life, life reveals its goodness to you.",

  "2024-11-10": "Be patient with your growth; every step forward is progress.",

  "2024-11-11": "Let go of the need for control and allow the magic of life to unfold.",

  "2024-11-12": "You are a work in progress, perfectly imperfect, and wonderfully unique.",

  "2024-11-13": "Sometimes, all it takes is one small step to change the course of your life.",

  "2024-11-14": "Hope is the seed of change; plant it daily in your thoughts and actions.",

  "2024-11-15": "Radiate positivity and watch the world around you mirror that energy back.",

  "2024-11-16": "Embrace the unknown; it’s often where the best surprises await.",

  "2024-11-17": "In every mistake lies a lesson, in every struggle lies growth.",

  "2024-11-18": "You have the power to inspire others just by being authentically you.",

  "2024-11-19": "Challenges are the stepping stones to greatness; embrace them with courage.",

  "2024-11-20": "Trust the process, for even the smallest steps lead to big destinations.",

  "2024-11-21": "Let kindness be your compass, and it will guide you through any storm.",

  "2024-11-22": "Remember, it’s okay to rest; even the strongest need time to recharge.",

  "2024-11-23": "Your heart knows the way, trust its whispers.",

  "2024-11-24": "You are capable of achieving remarkable things; believe and persevere.",

  "2024-11-25": "Keep moving forward, even when the path is unclear. Clarity will come.",

  "2024-11-26": "Joy is found in the little moments; savor each one.",

  "2024-11-27": "Don’t let the opinions of others drown out your inner voice.",

  "2024-11-28": "Growth begins where comfort ends. Dare to stretch beyond your limits.",

  "2024-11-29": "Stay curious; life has a way of surprising those who remain open.",

  "2024-11-30": "Your dreams are valid, your potential is limitless, and your time is now."

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