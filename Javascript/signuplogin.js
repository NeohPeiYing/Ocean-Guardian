// This JS File is for sign up, login and dashboard

import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Sign up validation
const signupForm = document.getElementById("signup-form");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        const confirmError = document.getElementById("confirm-error");

        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmError.textContent = "";

        let valid = true;

        if (name === "") {
            nameError.textContent = "Please enter your full name.";
            valid = false;
        }

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            valid = false;
        }

        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            valid = false;
        }

        if (password !== confirmPassword) {
            confirmError.textContent = "Passwords do not match.";
            valid = false;
        }

        if (!valid) return;

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: name,
                email: email,
                createdAt: new Date()
            });

            alert("Account created successfully!");
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 350);
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
                emailError.textContent = "This email is already registered.";
            } else {
                alert(error.message);
            }
        });
    });
}

// Login validation

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        const emailError = document.getElementById("login-email-error");
        const passwordError = document.getElementById("login-password-error");

        emailError.textContent = "";
        passwordError.textContent = "";

        let valid = true;

        if (email === "") {
            emailError.textContent = "Please enter your email.";
            valid = false;
        }

        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            valid = false;
        }

        if (password === "") {
            passwordError.textContent = "Please enter your password.";
            valid = false;
        }

        if (!valid) return;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 350);
        })
        .catch((error) => {
          if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            passwordError.textContent = "Invalid email or password.";
          } else {
            alert(error.message);
          }
        });
      });
    }

// Log out

  
// dashboard

const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");

if (userName && userEmail) {

    onAuthStateChanged(auth, (user) => {

        if (user) {

            userName.textContent = "Ocean Guardian Member";
            userEmail.textContent = user.email;

        }
    });

}

// Navbar - Mobile navbar
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu-links");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("show");
        
        if (!navMenu.classList.contains("show")) {
            document.querySelectorAll(".nav-dropdown-wrapper").forEach(el => {
                el.classList.remove("open");
            });
        }
    });
}

// Navbar - Dropdown
const trigger = document.querySelector(".dynamic-trigger");
const dropdown = document.querySelector(".nav-dropdown-wrapper");

if (trigger && dropdown) {
    trigger.addEventListener("click", (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle("open");
        }
    });
}

const animalBadge = document.getElementById("animalBadge");
const ecosystemBadge = document.getElementById("ecosystemBadge");
const threatBadge = document.getElementById("threatBadge");
const actionBadge = document.getElementById("actionBadge");
const masterBadge = document.getElementById("masterBadge");

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const quizzes = [
        "animal",
        "ecosystem",
        "threats",
        "action"
    ];

    let completed = 0;

    for (const quiz of quizzes) {

        const snap = await getDoc(
            doc(db, "users", user.uid, "progress", quiz)
        );

        if (snap.exists()) {

            const data = snap.data();

            if (data.perfectScore) {

                completed++;

                if (quiz === "animal")
                    animalBadge?.classList.replace("locked", "unlocked");

                if (quiz === "ecosystem")
                    ecosystemBadge?.classList.replace("locked", "unlocked");

                if (quiz === "threats")
                    threatBadge?.classList.replace("locked", "unlocked");

                if (quiz === "action")
                    actionBadge?.classList.replace("locked", "unlocked");
            }
        }
    }

    if (completed === 4) {
        masterBadge?.classList.replace("locked", "unlocked");
    }
});

const progressText = document.getElementById("quizProgress");
const progressFill = document.getElementById("progressFill");

onAuthStateChanged(auth, async (user) => {

    if (!user || !progressText || !progressFill) return;

    const quizzes = [
        "animal",
        "ecosystem",
        "threats",
        "action"
    ];

    let completed = 0;

    for (const quiz of quizzes) {
        const snap = await getDoc(
            doc(db, "users", user.uid, "progress", quiz)
        );

        if (snap.exists()) {
            completed++;
        }
    }

    const quizCard = progressText.closest(".dashboard-card");
    const quizHeading = quizCard ? quizCard.querySelector("h3") : null;
    const quizButton = quizCard ? quizCard.querySelector(".quiz-btn") : null;

    if (completed === quizzes.length) {
        if (quizHeading) {
            quizHeading.innerHTML = " 🎉 Congratulations! You've Mastered All Quizzes!";
            quizHeading.classList.add("quiz-congrats-active");
        }

        progressText.style.display = "none";
        if (quizButton) {
            quizButton.style.display = "none";
        }

        const congratsPopup = document.getElementById("congratsPopup");
        const closeCongratsBtn = document.getElementById("closeCongrats");

        const userDoc = await getDoc(doc(db, "users", user.uid));
        const alreadyShown =
        userDoc.exists() && userDoc.data().congratsShown === true;

        if (congratsPopup && !alreadyShown) {
            congratsPopup.classList.remove("hidden");
            closeCongratsBtn.addEventListener("click", async () => {
                congratsPopup.classList.add("hidden");

                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        congratsShown: true
                    },
                    {
                        merge: true
                    }
                );
            });
        }

    } else {
        if (quizHeading) {
            quizHeading.innerHTML = "<i class='bx bx-book-open'></i> Quiz Progress";
            quizHeading.classList.remove("quiz-congrats-active");
        }
        
        progressText.style.display = "block";
        progressText.textContent = `${completed} / ${quizzes.length} Quizzes Completed`;

        if (quizButton) {
            quizButton.style.display = "inline-block";
        }
    }

    progressFill.style.width = `${(completed / quizzes.length) * 100}%`;
});

// Fade page transition

document.querySelectorAll("a[href]").forEach(link => {

    const href = link.getAttribute("href");

    if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
    ) return;

    link.addEventListener("click", function (e) {

        e.preventDefault();

        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = this.href;
        }, 350);

    });

});

window.addEventListener("pageshow", () => {
    document.body.classList.remove("fade-out");
});

// Bubble cursor trail

let lastBubble = 0;

document.addEventListener("mousemove", (e)=>{

    const now = Date.now();

    if(now - lastBubble < 35) return;

    lastBubble = now;

    createBubble(e.clientX, e.clientY);

});

function createBubble(x,y){

    const bubble = document.createElement("div");

    bubble.className = "cursor-bubble";

    const size = Math.random() * 10 + 8;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = x + "px";
    bubble.style.top = y + "px";

    bubble.style.setProperty(
        "--x",
        (Math.random()*30-15)+"px"
    );

    document.body.appendChild(bubble);

    setTimeout(()=>{
        bubble.remove();
    },1200);

}

document.addEventListener("click",(e)=>{

    for(let i=0;i<10;i++){

        setTimeout(()=>{

            createBubble(
                e.clientX + Math.random()*30-15,
                e.clientY + Math.random()*30-15
            );

        },i*20);

    }

});