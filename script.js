// Elements for time and date
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Function to set time and date
function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const year = time.getFullYear();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    if (timeEl && dateEl) {
        timeEl.innerHTML = `${hoursForClock.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        dateEl.innerHTML = `${days[day]}, ${months[month]} ${date}, ${year}`;
    }
}

// Initialize time and set interval for updating every second
setTime();
setInterval(setTime, 1000);

// Firebase authentication and greeting setup
const authStateChanged = firebase.auth().onAuthStateChanged(async (user) => {
    const emailId = user ? user.email : null;
    const greetEl = document.getElementById("greet");
    let name = "User";

    if (emailId) {
        try {
            const snapshot = await firebase.database().ref(`users/${emailId.replace('.', ',')}/name`).once("value");
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

// Function to get the appropriate greeting based on the time of day
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

// Document ready function for jQuery
$(function () {
    const accountBtn = $("#accountBtn");
    const accountBox = $("#accountBox");
    const loginBtn = $("#loginBtn");
    const menuBtn = $(".menuBtn");
    const menuItems = $("#menuItems");

    authStateChanged(); // Call the authStateChanged function here

    accountBtn.click(function () {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                accountBtn.html("Manage Account");
                accountBtn.attr("href", "./menu/manageAccount.html");
                accountBox.css("display", "none");
                loginBtn.css("display", "none");
            } else {
                accountBtn.html("Create Account");
                accountBtn.attr("href", "./menu/createAccount.html");
                accountBox.css("display", "block");
                loginBtn.css("display", "block");
                loginBtn.attr("href", "./menu/login.html");
            }
        });
    });

    // Define the toggleDrawer function
    function toggleDrawer() {
        const isHidden = menuItems.css("display") === "none" || !menuItems.css("display");
        menuItems.css("display", isHidden ? "block" : "none");
        menuBtn.attr("aria-expanded", !isHidden);
        menuBtn.attr("aria-label", isHidden ? "Close Navigation Menu" : "Open Navigation Menu");
    }

    // Attach the toggleDrawer function to the menu button click event
    menuBtn.click(toggleDrawer);
});

// Function to announce messages
function announce(message) {
    const announcement = $("#announcement");
    announcement.text(message);
    setTimeout(function () {
        announcement.css("display", "none");
    }, 3000);
    announcement.css("display", "block");
}
