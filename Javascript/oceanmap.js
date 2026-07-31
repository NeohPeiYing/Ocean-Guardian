import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

// Ocean Info

const oceanData = {
    pacific: {
        title: "Pacific Ocean",
        description: "The Pacific Ocean is the largest and deepest ocean on Earth. It stretches from Asia and Australia to North and South America.",
        area: "165.25 million km²",
        depth: "4,280 m",
        borders: "Asia, Australia, North America, South America",
        fact: "The Mariana Trench, the deepest place on Earth, is located in the Pacific Ocean.",
        link: "endangeredmarineanimals.html?ocean=pacific"
    },

    atlantic: {
        title: "Atlantic Ocean",
        description: "The Atlantic Ocean is the second-largest ocean. It separates the Americas from Europe and Africa and is one of the world's busiest oceans.",
        area: "106.46 million km²",
        depth: "3,646 m",
        borders: "North America, South America, Europe, Africa",
        fact: "The Atlantic Ocean contains the Mid-Atlantic Ridge, the world's longest mountain range.",
        link: "endangeredmarineanimals.html?ocean=atlantic"
    },

    indian: {
        title: "Indian Ocean",
        description: "The Indian Ocean is the warmest of the five oceans and is surrounded by Africa, Asia and Australia.",
        area: "70.56 million km²",
        depth: "3,741 m",
        borders: "Africa, Asia, Australia",
        fact: "The Indian Ocean is known for its warm tropical waters.",
        link: "endangeredmarineanimals.html?ocean=indian"
    },

    arctic: {
        title: "Arctic Ocean",
        description: "The Arctic Ocean is the smallest and shallowest ocean. Much of it is covered by sea ice throughout the year.",
        area: "14.06 million km²",
        depth: "1,205 m",
        borders: "North America, Europe, Asia",
        fact: "It is the coldest ocean on Earth.",
        link: "endangeredmarineanimals.html?ocean=arctic"
    },

    southern: {
        title: "Southern Ocean",
        description: "The Southern Ocean surrounds Antarctica and connects the Pacific, Atlantic and Indian Oceans.",
        area: "20.33 million km²",
        depth: "3,270 m",
        borders: "Antarctica",
        fact: "It is the only ocean that completely surrounds a continent.",
        link: "endangeredmarineanimals.html?ocean=southern"
    }
};

// Elements

const modal = document.querySelector(".ocean-modal");
const closeBtn = document.querySelector(".close-modal");

const title = document.querySelector(".ocean-title");
const description = document.querySelector(".ocean-description");
const area = document.querySelector(".ocean-area");
const depth = document.querySelector(".ocean-depth");
const borders = document.querySelector(".ocean-borders");
const fact = document.querySelector(".ocean-fact");
const exploreBtn = document.querySelector(".explore-btn");

const oceanButtons = document.querySelectorAll(".ocean-btn");


// Open Modal
oceanButtons.forEach(button => {

    button.addEventListener("click", () => {

        const ocean = oceanData[button.dataset.ocean];

        title.textContent = ocean.title;
        description.textContent = ocean.description;
        area.textContent = ocean.area;
        depth.textContent = ocean.depth;
        borders.textContent = ocean.borders;
        fact.textContent = ocean.fact;
        exploreBtn.href = ocean.link;

        modal.classList.add("active");
    });
});

// Closing modal function

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

// Click outside the popup to close pop up

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("active");
    }

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