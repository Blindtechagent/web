const thoughts = {
  "2024-12-01": "Every day is a new opportunity to start fresh and make a difference.",
"2024-12-02": "Success isn't measured by what you accomplish, but by how you grow through the process.",
"2024-12-03": "The world is full of beauty; sometimes, you just need to stop and notice it.",
"2024-12-04": "Believe in the power of kindness; it has the ability to change the world.",
"2024-12-05": "The best way to predict the future is to create it, one step at a time.",
"2024-12-06": "You are stronger than you think, and more capable than you know.",
"2024-12-07": "Every setback is a setup for a greater comeback.",
"2024-12-08": "Let your passion be the fuel that drives you towards your goals.",
"2024-12-09": "The road to success is paved with perseverance, not perfection.",
"2024-12-10": "Take time to appreciate the small victories; they often lead to the greatest triumphs.",
"2024-12-11": "The journey may be long, but every step forward is a step toward your dreams.",
"2024-12-12": "Sometimes, the hardest thing is to believe in yourself, but it’s always worth it.",
"2024-12-13": "It’s not about being the best, but about being your best.",
"2024-12-14": "Embrace the challenges, for they are the stepping stones to your success.",
"2024-12-15": "Life is a series of moments; make each one count.",
"2024-12-16": "The secret to happiness lies in the ability to appreciate what you have, not in chasing what you want.",
"2024-12-17": "Your potential is endless, so never limit your dreams.",
"2024-12-18": "Don’t wait for opportunities to knock; create them yourself.",
"2024-12-19": "Each new day is a blank page—make it a story worth telling.",
"2024-12-20": "It’s the small things that make life extraordinary.",
"2024-12-21": "Courage is not the absence of fear, but the willingness to move forward despite it.",
"2024-12-22": "Your uniqueness is your superpower; embrace it fully.",
"2024-12-23": "No dream is too big if you believe in yourself and take the first step.",
"2024-12-24": "Be kind to yourself; you are doing the best you can.",
"2024-12-25": "The best gifts in life are often the ones we give ourselves—like time and self-compassion.",
"2024-12-26": "Change begins within; be the change you wish to see in the world.",
"2024-12-27": "Take risks; the greatest rewards often come from stepping out of your comfort zone.",
"2024-12-28": "Growth is a journey, not a destination—enjoy the process.",
"2024-12-29": "You are worthy of all the good things life has to offer.",
"2024-12-30": "Keep pushing forward, even when things seem tough; brighter days are ahead.",
"2024-12-31": "End this year with gratitude and optimism, knowing that tomorrow is a new beginning."
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