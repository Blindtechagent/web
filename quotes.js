const thoughts = {
  
    "2025-03-10": "Believe in yourself and all that you are—know that there is something inside you that is greater than any obstacle.",
    "2025-03-11": "Every small act of kindness is a step toward a more compassionate world.",
    "2025-03-12": "The future belongs to those who believe in the beauty of their dreams.",
    "2025-03-13": "Embrace change, for it is the catalyst for growth and new opportunities.",
    "2025-03-14": "Your mind is a powerful thing; when you fill it with positive thoughts, your life will start to change.",
    "2025-03-15": "Keep pushing forward, even when the going gets tough—your perseverance will pay off.",
    "2025-03-16": "Happiness is not something ready-made; it comes from your own actions.",
    "2025-03-17": "The only limit to your impact is your imagination and commitment.",
    "2025-03-18": "Your greatest strength lies within you—trust yourself and keep moving forward.",
    "2025-03-19": "Challenges are what make life interesting; overcoming them is what makes life meaningful.",
    "2025-03-20": "The power of positivity can transform your life—embrace it wholeheartedly.",
    "2025-03-21": "You have the ability to create the life you desire—start today and never look back.",
    "2025-03-22": "Every day is a new opportunity to make a positive difference in your life and the lives of others.",
    "2025-03-23": "The best way to predict your future is to create it.",
    "2025-03-24": "Your journey is unique, and so are you—celebrate your individuality.",
    "2025-03-25": "Focus on the present moment, for it is the only time you truly have.",
    "2025-03-26": "Success is not the key to happiness; happiness is the key to success.",
    "2025-03-27": "Your potential is limitless—believe in yourself and take bold steps toward your dreams.",
    "2025-03-28": "The best time to start was yesterday; the next best time is now.",
    "2025-03-29": "Your inner strength is greater than any challenge you face.",
    "2025-03-30": "The journey may be long, but the destination is worth every step.",
    "2025-03-31": "You are the architect of your own destiny—design it with purpose and passion."


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