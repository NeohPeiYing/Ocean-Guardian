import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCW5NUpP4XQnPL4ZIlLdl3zQbK5rq-X21I",
    authDomain: "ocean-guardian---sign-up-login.firebaseapp.com",
    projectId: "ocean-guardian---sign-up-login",
    storageBucket: "ocean-guardian---sign-up-login.firebasestorage.app",
    messagingSenderId: "705894712786",
    appId: "1:705894712786:web:7e9388cb837aab5433740b",
    measurementId: "G-D3WS8GL5R2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginPopup = document.getElementById("loginPopup");

const dashboardLinks = document.querySelectorAll('a[href="signupandlogin/dashboard.html"]');

dashboardLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        if (!auth.currentUser && loginPopup) {
            e.preventDefault();
            e.stopPropagation();
            loginPopup.classList.remove("hidden");
        }
    });
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