// Ocean guardian intro

const intro = document.querySelector(".intro");
const bubbleContainer = document.querySelector(".bubble-container");

const welcome = document.querySelector(".welcome-content");
const enterBtn = document.querySelector(".enter-btn");
const skipBtn = document.querySelector(".skip-btn");

let finished = false;

// Bubble

function createBubble(){

    const bubble = document.createElement("span");

    bubble.className = "bubble";

    const size = Math.random() * 6 + 5;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = Math.random() * 100 + "%";

    bubble.style.opacity = Math.random() * 0.5 + 0.2;

    bubble.style.animationDuration =
        (Math.random() * 4 + 5) + "s";

    bubbleContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 9000);

}

setInterval(createBubble, 180);

for(let i = 0; i < 18; i++){

    setTimeout(createBubble, i * 120);

}

// Welcome content

const params = new URLSearchParams(window.location.search);

if (params.get("skipIntro") === "true") {

    welcome.classList.add("show");

} else {

    setTimeout(() => {
        welcome.classList.add("show");
    }, 8000);

}

// Finish intro

function finishIntro(){

    if(finished) return;

    finished = true;

    intro.classList.add("fade");

    setTimeout(() => {

        window.location.href = "home.html";

    }, 1200);

}

// buttons
setTimeout(() => {

    welcome.classList.add("show");

    skipBtn.style.display = "none";

}, 8000);

enterBtn.addEventListener("click", finishIntro);

skipBtn.addEventListener("click", skipAnimation);

function skipAnimation(){

    welcome.classList.add("show");

    document.querySelector(".ocean").style.animation = "none";
    document.querySelector(".light-rays").style.animation = "none";
    document.querySelector(".caustics").style.animation = "none";

    skipBtn.style.display = "none";

}

// Shortcuts

document.addEventListener("keydown", (e)=>{

    if(
        e.code === "Enter" ||
        e.code === "Escape"
    ){

        finishIntro();

    }

});

// Brightnuss pulse
let t = 0;

function pulse(){

    if(finished) return;

    t += 0.01;

    document.querySelector(".ocean").style.filter =
        `brightness(${0.95 + Math.sin(t) * 0.03})`;

    requestAnimationFrame(pulse);

}

pulse();

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