const thoughts = {
      "2025-01-30": "Your dreams are within reach—keep believing and keep moving forward.",
    "2025-01-31": "Every ending is the beginning of something new and wonderful.",
    "2025-02-01": "A single act of kindness can spark a chain reaction of positivity.",
    "2025-02-02": "The journey of a thousand miles begins with a single step—take that step today.",
    "2025-02-03": "Great things take time, so trust the process and keep going.",
    "2025-02-04": "Your attitude determines your direction—choose optimism and determination.",
    "2025-02-05": "The best way to inspire others is to live as your most authentic self.",
    "2025-02-06": "Mistakes are proof that you are trying—learn from them and grow.",
    "2025-02-07": "The more you appreciate life, the more life gives you to appreciate.",
    "2025-02-08": "Happiness isn’t found in perfection, but in embracing the imperfections.",
    "2025-02-09": "Don’t let the fear of failure stop you—let the excitement of success drive you.",
    "2025-02-10": "You are capable of more than you ever imagined—keep striving forward.",
    "2025-02-11": "Be patient with yourself; progress is progress, no matter how small.",
    "2025-02-12": "The world needs your light—shine brightly and fearlessly.",
    "2025-02-13": "Challenges make you stronger; embrace them as stepping stones to greatness.",
    "2025-02-14": "Love is the most powerful force—spread it freely and abundantly.",
    "2025-02-15": "You are not behind; you are on your own unique path—trust the timing of your life.",
    "2025-02-16": "Success isn’t about speed; it’s about persistence and dedication.",
    "2025-02-17": "Small daily improvements lead to stunning long-term results.",
    "2025-02-18": "Let go of what no longer serves you, and make space for what truly matters.",
    "2025-02-19": "Your story is still being written—make it one worth telling.",
    "2025-02-20": "Kindness costs nothing but means everything—be generous with it.",
    "2025-02-21": "Every challenge carries the seed of an even greater opportunity.",
    "2025-02-22": "Don’t compare your journey to others—your path is uniquely yours.",
    "2025-02-23": "The energy you put into the world is the energy that comes back to you.",
    "2025-02-24": "You don’t have to be perfect to be amazing—just be you.",
    "2025-02-25": "The simplest moments often hold the greatest joy—take time to notice them.",
    "2025-02-26": "Your dreams matter—take steps every day to make them a reality.",
    "2025-02-27": "Sometimes, the best way forward is to pause, breathe, and refocus.",
    "2025-02-28": "Believe in the magic of new beginnings—they hold endless possibilities."

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