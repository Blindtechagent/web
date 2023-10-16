const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const year = time.getFullYear();

  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (timeEl && dateEl) {
    timeEl.innerHTML = `${hoursForClock.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    dateEl.innerHTML = `${days[day]}, ${months[month]} ${date}, ${year}`;
  }
}

setTime();
setInterval(setTime, 1000);

firebase.auth().onAuthStateChanged(async (user) => {
  const emailId = user ? user.email : null;
  const greetEl = document.getElementById("greet");
  let name = "User";

  if (emailId) {
    try {
      const snapshot = await firebase.database().ref("users/" + emailId.replace('.', ',') + "/name").once("value");
      name = snapshot.val() || "User";
    } catch (error) {
      console.error("Database read error:", error);
      alert("An error occurred while retrieving data. Please try again.");
    }
  }

  const greeting = getGreeting(name);

  if (greetEl) {
    greetEl.innerHTML = greeting;
  }
});

function getGreeting(name) {
  const time = new Date().getHours();

  if (time < 7) {
    return `Very Good morning ${name}! We're delighted to see you here so early.`;
  } else if (time < 12) {
    return `Good morning ${name}! It's a beautiful morning and we're thrilled to have you join us on our website.`;
  } else if (time < 14) {
    return `Good afternoon ${name}! It's time to have lunch.`;
  } else if (time < 16) {
    return `Good afternoon ${name}! We're so happy to have you join us on our website.`;
  } else if (time < 20) {
    return `Good evening ${name}! How are you doing today?`;
  } else if (time < 22) {
    return `Good night ${name}! Thanks for stopping by at night! We hope you find what you're looking for.`;
  } else {
    return `Good night ${name}! It's time to sleep. We are so glad to see you at late night.`;
  }
}
