
        const userEmailId = document.getElementById("userEmail");
        const nameBtn = document.getElementById("UsersName");
        const changeBox = document.getElementById("changeBox");
        const input = document.querySelector("#changeBox input");

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const emailId = user.email;
                firebase.database().ref("users/" + emailId.replace('.', ',') + "/name").once("value")
                    .then((snapshot) => {
                        const storedName = snapshot.val() || "User";
                        nameBtn.textContent = `${storedName}, change your name`;
                        userEmailId.textContent = `Signed in as ${emailId}`;
                    })
                    .catch((error) => {
                        console.error("Database read error:", error);
                        announce("An error occurred while retrieving data. Please try again.");
                    });
            }
        });

        function changeName() {
            changeBox.style.display = "block";
            input.focus();
        }

        function saveNewName() {
            const newName = input.value.trim();
            if (newName !== "") {
                const emailId = firebase.auth().currentUser.email;
                firebase.database().ref("users/" + emailId.replace('.', ',')).update({ name: newName })
                    .then(() => {
                        nameBtn.textContent = `${newName}, change your name`;
                        announce("name changed successfully");
                    })
                    .catch((error) => {
                        console.error("Database write error:", error);
                        announce("An error occurred while saving the new name. Please try again.");
                    });
            }
            changeBox.style.display = "none";
            input.value = "";
        }

        function logOut() {
            if (confirm("Are you sure you want to log out?")) {
                firebase.auth().signOut()
                    .then(() => {
                        announce("log out successfully");
                        window.history.back();
                    })
                    .catch((error) => {
                        console.error("Logout error:", error);
                        announce("An error occurred while logging out. Please try again.");
                    });
            }
        }
