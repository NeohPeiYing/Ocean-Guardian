// NOTE: This JS file is for the pages: Home, Endangered Marine Animals - filter, Ocean Map, & About page - FAQ.

// Firebase
import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// Ocean Filter

const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            document.querySelectorAll(".animal-row").forEach(card => {

                const oceans = (card.dataset.ocean || "").split(" ");

                if (filter === "all" || oceans.includes(filter)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }

            });

            document.querySelectorAll(".zone-section").forEach(section => {
                const heading = section.querySelector(".zone-text");
                const description = section.querySelector(".zone-description");

                const hasVisibleAnimal = [...section.querySelectorAll(".animal-row")]
                .some(card => card.style.display !== "none");

                if (heading) heading.style.display = hasVisibleAnimal ? "block" : "none";
                if (description) description.style.display = hasVisibleAnimal ? "block" : "none";
            });

            // Left & Right cards
            document.querySelectorAll(".zone-section").forEach(section => {

                const visibleCards = [...section.querySelectorAll(".animal-row")]
                .filter(card => card.style.display !== "none");

                visibleCards.forEach((card, index) => {

                    if (index % 2 === 0) {
                        card.classList.remove("reverse");
                    } else {
                        card.classList.add("reverse");
                    }
                });
            });

            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
            }, 50);

        });

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

document.querySelectorAll(".nav-menu-links a:not(.dynamic-trigger)").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("show");
            if (dropdown) dropdown.classList.remove("open");
        }
    });
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
            initFAQAccordion();
            initSmoothNavigation();
        });

        function initFAQAccordion() {
            const faqTriggers = document.querySelectorAll('.faq-trigger');
            
            faqTriggers.forEach(trigger => {
                trigger.addEventListener('click', () => {
                    const activeItem = trigger.parentElement;
                    const contentPanel = activeItem.querySelector('.faq-content');
                    const isAlreadyActive = activeItem.classList.contains('active');
                    
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                        item.querySelector('.faq-content').style.maxHeight = null;
                    });
                    
                    if (!isAlreadyActive) {
                        activeItem.classList.add('active');
                        contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
                    }
                });
            });
        }
        function initSmoothNavigation() {
            const links = document.querySelectorAll('.main-navbar a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
                    if (this.classList.contains('menu-item')) {
                        this.classList.add('active');
                    }
                });
            });
        }

const ocean = new URLSearchParams(window.location.search).get("ocean");

if (ocean) {
    document.querySelector(`[data-filter="${ocean}"]`)?.click();
}

// Topic page - Hamburger side menu for mobile

const toggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("topicsSidebar");

if (toggle && sidebar) {

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("show");
    });

    document.querySelectorAll(".topics-sidebar a").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("show");
        });
    });

}

// Replay btn
const replayBtn = document.getElementById("replayIntroBtn");

if (replayBtn) {

    replayBtn.addEventListener("click", () => {
            window.location.href = "index.html";
    });
}

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