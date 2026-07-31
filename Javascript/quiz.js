import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCW5NUpP4XQnPL4ZIlLdl3zQbK5rq-X21I",
    authDomain: "ocean-guardian---sign-up-login.firebaseapp.com",
    projectId: "ocean-guardian---sign-up-login",
    storageBucket: "ocean-guardian---sign-up-login.firebasestorage.app",
    messagingSenderId: "705894712786",
    appId: "1:705894712786:web:7e9388cb837aab5433740b",
    measurementId: "G-D3WS8GL5R2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

if (typeof AOS !== "undefined") {
    AOS.init({
        once: true,
        offset: 100,
        duration: 800
    });
}

const profileBtn = document.getElementById("profile-btn");
const authBtn = document.getElementById("auth-btn");
const mobileAuthBtn = document.getElementById("mobile-auth-btn");
const loginPopup = document.getElementById("loginPopup");

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (authBtn) {
            authBtn.textContent = "Log Out";
            authBtn.onclick = async (e) => {
                e.preventDefault();
                await signOut(auth);
                location.reload();
            };
        }
        if (mobileAuthBtn) {
            mobileAuthBtn.textContent = "Log Out";
            mobileAuthBtn.onclick = async (e) => {
                e.preventDefault();
                await signOut(auth);
                location.reload();
            };
        }
    } else {
        if (authBtn) {
            authBtn.textContent = "Log In";
            authBtn.href = "signupandlogin/login.html";
            authBtn.onclick = null;
        }
        if (mobileAuthBtn) {
            mobileAuthBtn.textContent = "Log In";
            mobileAuthBtn.href = "signupandlogin/login.html";
            mobileAuthBtn.onclick = null;
        }
    }
});

if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (auth.currentUser) {
            window.location.href = "signupandlogin/dashboard.html";
        } else {
            if (loginPopup) loginPopup.classList.remove("hidden");
            else alert("Please log in first.");
        }
    });
}


const badgeNames = {
    animal: "🐢 Endangered Species Expert",
    ecosystem: "🪸 Ecosystem Explorer",
    threats: "⚠️ Threat Defender",
    action: "🌍 Ocean Action Champion"
};

// Quiz Data
const quizzes = {
    ecosystem: [
        {
            question: "1. Which marine ecosystem is known as the 'rainforest of the sea' because it supports many different species?",
            answers: [
                { text: "Coral reefs", correct: true },
                { text: "Open ocean", correct: false },
                { text: "Deep sea", correct: false },
                { text: "Arctic sea ice", correct: false }
            ],
            explanation: "Coral reefs are called the 'rainforests of the sea' because they are home to an incredible variety of marine life."
        },
        {
            question: "2. Why are mangrove forests important to marine animals?",
            answers: [
                { text: "They only grow in deep oceans.", correct: false },
                { text: "They make ocean water salty.", correct: false },
                { text: "They provide shelter and nursery areas for young marine life.", correct: true },
                { text: "They produce coral.", correct: false }
            ],
            explanation: "Mangrove forests protect young fish and other marine animals by providing food and shelter."
        },
        {
            question: "3. Which ecosystem is the main food source for dugongs?",
            answers: [
                { text: "Mangrove forests", correct: false },
                { text: "Coral reefs", correct: false },
                { text: "Kelp forests", correct: false },
                { text: "Seagrass meadows", correct: true }
            ],
            explanation: "Dugongs depend almost entirely on seagrass meadows for food."
        },
        {
            question: "4. What would most likely happen if coral reefs disappeared?",
            answers: [
                { text: "The ocean would become freshwater.", correct: false },
                { text: "Many marine species would lose their habitat.", correct: true },
                { text: "Fish would grow larger.", correct: false },
                { text: "Sea levels would immediately fall.", correct: false }
            ],
            explanation: "Many fish and other marine animals rely on coral reefs for food, shelter, and breeding."
        },
        {
            question: "5. Which ecosystem helps protect coastlines from strong waves and storms?",
            answers: [
                { text: "Mangrove forests", correct: true },
                { text: "Open ocean", correct: false },
                { text: "Deep sea", correct: false },
                { text: "Polar sea ice", correct: false }
            ],
            explanation: "Mangrove roots reduce wave energy and help prevent coastal erosion."
        },
        {
            question: "6. Why are seagrass meadows important to the ocean?",
            answers: [
                { text: "They replace coral reefs.", correct: false },
                { text: "They make seawater warmer.", correct: false },
                { text: "They only support sharks.", correct: false },
                { text: "They provide food, shelter, and help improve water quality.", correct: true }
            ],
            explanation: "Seagrass meadows support many marine animals while also helping keep the water clean."
        },
        {
            question: "7. Which marine ecosystem supports the greatest variety of marine life?",
            answers: [
                { text: "Deep sea", correct: false },
                { text: "Coral reefs", correct: true },
                { text: "Open ocean", correct: false },
                { text: "Arctic waters", correct: false }
            ],
            explanation: "Coral reefs are among the most biodiverse ecosystems on Earth."
        },
        {
            question: "8. A young fish needs a safe place to grow before swimming into the open ocean. Which ecosystem is most suitable?",
            answers: [
                { text: "Open sea", correct: false },
                { text: "Deep ocean", correct: false },
                { text: "Mangrove forests", correct: true },
                { text: "Polar waters", correct: false }
            ],
            explanation: "Mangroves act as nursery habitats where young marine animals can grow safely."
        },
        {
            question: "9. Which ecosystem is directly connected to the survival of dugongs?",
            answers: [
                { text: "Seagrass meadows", correct: true },
                { text: "Rocky shores", correct: false },
                { text: "Coral reefs", correct: false },
                { text: "Open ocean", correct: false }
            ],
            explanation: "Without healthy seagrass meadows, dugongs would lose their main source of food."
        },
        {
            question: "10. Why is protecting marine ecosystems important?",
            answers: [
                { text: "They only benefit people who live near the sea.", correct: false },
                { text: "They make the ocean deeper.", correct: false },
                { text: "They reduce the number of marine animals.", correct: false },
                { text: "Healthy ecosystems support marine life and keep the ocean balanced.", correct: true }
            ],
            explanation: "Healthy marine ecosystems provide food, shelter, breeding grounds, and many other benefits for ocean life."
        }
    ],
    animal: [
        {
            question: "1. What does it mean if a marine animal is endangered?",
            answers: [
                { text: "It is the largest animal in the ocean", correct: false },
                { text: "It can only live in freshwater", correct: false },
                { text: "It is at risk of becoming extinct", correct: true },
                { text: "It is dangerous to humans", correct: false }
            ],
            explanation: "An endangered marine animal is one that is at risk of becoming extinct if it is not protected."
        },
        {
            question: "2. Which is the world's most endangered marine mammal?",
            answers: [
                { text: "Blue Whale", correct: false },
                { text: "Vaquita", correct: true },
                { text: "Bottlenose Dolphin", correct: false },
                { text: "Orca", correct: false }
            ],
            explanation: "The Vaquita is the world's rarest marine mammal. It is a small porpoise found only in the northern Gulf of California, Mexico."
        },
        {
            question: "3. Which endangered marine animal is the largest animal on Earth?",
            answers: [
                { text: "Blue Whale", correct: true },
                { text: "Whale Shark", correct: false },
                { text: "Sperm Whale", correct: false },
                { text: "Giant Squid", correct: false }
            ],
            explanation: "The Blue Whale is the largest animal ever known to have lived on Earth. It can grow up to 30 metres long and weigh over 180 tonnes."
        },
        {
            question: "4. Which of these animals is <strong>NOT</strong> an endangered marine animal?",
            answers: [
                { text: "Whale Shark", correct: false },
                { text: "Hawksbill Sea Turtle", correct: false },
                { text: "Clownfish", correct: true },
                { text: "Vaquita", correct: false }
            ],
            explanation: "Clownfish are not classified as endangered. Whale Sharks, Green Sea Turtles, and Vaquitas are all endangered or critically endangered marine species."
        },
        {
            question: "5. Which endangered marine fish is the largest fish in the world?",
            answers: [
                { text: "Tuna", correct: false },
                { text: "Whale Shark", correct: true },
                { text: "Great White Shark", correct: false },
                { text: "Swordfish", correct: false }
            ],
            explanation: "The Whale Shark is the largest fish in the world. Although it can grow over 12 metres long, it feeds mainly on tiny plankton and is harmless to humans."
        },
        {
            question: "6. Which endangered marine animal mainly eats seagrass?",
            answers: [
                { text: "Dugong", correct: true },
                { text: "Blue Whale", correct: false },
                { text: "Whale Shark", correct: false },
                { text: "Vaquita", correct: false }
            ],
            explanation: "Dugongs are herbivores that mainly feed on seagrass meadows."
        },
        {
            question: "7. Which ocean is home to polar bears?",
            answers: [
                { text: "Southern Ocean", correct: false },
                { text: "Pacific Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: true }
            ],
            explanation: "Polar bears live in the Arctic region and depend on sea ice to survive."
        },
        {
            question: "8. Which conservation status means a species faces an extremely high risk of extinction?",
            answers: [
                { text: "Vulnerable", correct: false },
                { text: "Critically Endangered", correct: true },
                { text: "Near Threatened", correct: false },
                { text: "Least Concern", correct: false }
            ],
            explanation: "Critically Endangered is one of the highest risk categories before extinction in the wild."
        },
        {
            question: "9. Which endangered marine animal is a type of shark?",
            answers: [
                { text: "Blue Whale", correct: false },
                { text: "Whale Shark", correct: true },
                { text: "Dugong", correct: false },
                { text: "Vaquita", correct: false }
            ],
            explanation: "Despite its name, the Whale Shark is a shark, not a whale."
        },
        {
            question: "10. Why are endangered marine animals important?",
            answers: [
                { text: "They make the ocean warmer", correct: false },
                { text: "They only live in aquariums", correct: false },
                { text: "They help keep ocean ecosystems healthy", correct: true },
                { text: "They are not important", correct: false }
            ],
            explanation: "Every marine species plays a role in keeping ocean ecosystems balanced and healthy."
        }
    ],
    threats: [
        {
            question: "1. What is one major effect of plastic pollution on sea turtles?",
            answers: [
                { text: "Plastic helps them swim faster", correct: false },
                { text: "Plastic provides them with shelter", correct: false },
                { text: "They mistake plastic for food", correct: true },
                { text: "Plastic increases their food supply", correct: false }
            ],
            explanation: "Sea turtles often mistake floating plastic bags for jellyfish, which can make them sick or even cause death."
        },
        {
            question: "2. Which human activity is the main cause of overfishing?",
            answers: [
                { text: "Catching fish faster than they can reproduce", correct: true },
                { text: "Planting mangroves", correct: false },
                { text: "Cleaning beaches", correct: false },
                { text: "Recycling plastic", correct: false }
            ],
            explanation: "Overfishing happens when fish are caught faster than they can reproduce."
        },
        {
            question: "3. Rising ocean temperatures are mainly caused by...",
            answers: [
                { text: "Strong ocean currents", correct: false },
                { text: "Volcanic eruptions", correct: false },
                { text: "The Moon's gravity", correct: false },
                { text: "Climate change", correct: true }
            ],
            explanation: "Climate change caused by greenhouse gas emissions is increasing ocean temperatures."
        },
        {
            question: "4. Which marine ecosystem is most affected by coral bleaching?",
            answers: [
                { text: "Mangrove forests", correct: false },
                { text: "Coral reefs", correct: true },
                { text: "Open ocean", correct: false },
                { text: "Seagrass meadows", correct: false }
            ],
            explanation: "Coral bleaching occurs when corals become stressed by warmer water."
        },
        {
            question: "5. Why is ghost fishing dangerous?",
            answers: [
                { text: "It creates underwater earthquakes", correct: false },
                { text: "It makes fish invisible", correct: false },
                { text: "Lost fishing nets continue trapping marine animals", correct: true },
                { text: "It causes coral reefs to grow faster", correct: false }
            ],
            explanation: "Abandoned fishing gear can continue trapping marine animals for years."
        },
        {
            question: "6. Oil spills can harm marine animals because they...",
            answers: [
                { text: "Coat animals and pollute their habitat", correct: true },
                { text: "Increase the amount of oxygen in water", correct: false },
                { text: "Make the ocean deeper", correct: false },
                { text: "Help coral reefs grow", correct: false }
            ],
            explanation: "Oil coats marine animals and damages their habitats."
        },
        {
            question: "7. Why is bycatch a problem?",
            answers: [
                { text: "It catches only large fish", correct: false },
                { text: "It only happens in freshwater", correct: false },
                { text: "It helps endangered animals survive", correct: false },
                { text: "Animals that were not meant to be caught are accidentally captured", correct: true }
            ],
            explanation: "Bycatch is the accidental capture of non-target marine animals."
        },
        {
            question: "8. Which threat can damage seagrass meadows by reducing the amount of sunlight reaching them?",
            answers: [
                { text: "Plastic pollution", correct: false },
                { text: "Water pollution", correct: true },
                { text: "Moonlight", correct: false },
                { text: "Sea breeze", correct: false }
            ],
            explanation: "Polluted water becomes cloudy, blocking sunlight needed for seagrass."
        },
        {
            question: "9. Which of these is NOT a major threat to marine life?",
            answers: [
                { text: "Overfishing", correct: false },
                { text: "Plastic pollution", correct: false },
                { text: "Climate change", correct: false },
                { text: "Beach clean-up activities", correct: true }
            ],
            explanation: "Beach clean-ups help reduce pollution instead of harming marine life."
        },
        {
            question: "10. If too many predators disappear from an ocean ecosystem, what is most likely to happen?",
            answers: [
                { text: "Nothing will change", correct: false },
                { text: "The ocean will become freshwater", correct: false },
                { text: "The ecosystem may become unbalanced", correct: true },
                { text: "All fish will become endangered immediately", correct: false }
            ],
            explanation: "Predators help keep marine ecosystems balanced."
        }
    ],
    action: [
        {
            question: "1. You are visiting the beach. Which action best helps protect marine life?",
            answers: [
                { text: "Leave your rubbish behind", correct: false },
                { text: "Collect your rubbish and recycle when possible", correct: true },
                { text: "Feed wild marine animals", correct: false },
                { text: "Take coral home as a souvenir", correct: false }
            ],
            explanation: "Properly disposing of waste helps prevent plastic and other rubbish from entering the ocean."
        },
        {
            question: "2. Which choice can help reduce plastic pollution in the ocean?",
            answers: [
                { text: "Use reusable bottles and bags", correct: true },
                { text: "Throw plastic into rivers", correct: false },
                { text: "Use more single-use plastics", correct: false },
                { text: "Burn plastic on the beach", correct: false }
            ],
            explanation: "Using reusable items reduces the amount of plastic that can end up in the ocean."
        },
        {
            question: "3. Why is choosing sustainably caught seafood important?",
            answers: [
                { text: "It makes fish swim faster", correct: false },
                { text: "It makes fish grow faster", correct: false },
                { text: "It only benefits fishermen", correct: false },
                { text: "It helps protect fish populations for the future", correct: true }
            ],
            explanation: "Sustainable seafood helps ensure fish populations remain healthy for future generations."
        },
        {
            question: "4. A friend wants to buy a product made from turtle shell. What should you do?",
            answers: [
                { text: "Encourage them to buy it", correct: false },
                { text: "Suggest choosing a wildlife-friendly alternative", correct: true },
                { text: "Ignore the situation", correct: false },
                { text: "Buy one too", correct: false }
            ],
            explanation: "Avoiding products made from endangered animals helps reduce demand and protects wildlife."
        },
        {
            question: "5. Which activity can directly help protect marine ecosystems?",
            answers: [
                { text: "Leaving rubbish on the beach", correct: false },
                { text: "Throwing food into the sea", correct: false },
                { text: "Joining a beach clean-up", correct: true },
                { text: "Walking on coral reefs", correct: false }
            ],
            explanation: "Beach clean-ups remove rubbish before it enters or remains in the ocean."
        },
        {
            question: "6. Why should people avoid touching coral reefs while diving or snorkelling?",
            answers: [
                { text: "Corals can be easily damaged", correct: true },
                { text: "Corals are made of plastic", correct: false },
                { text: "Touching corals helps them grow", correct: false },
                { text: "Corals always sting people", correct: false }
            ],
            explanation: "Corals are living animals and can be harmed by even gentle contact."
        },
        {
            question: "7. Which action helps reduce climate change and also benefits marine life?",
            answers: [
                { text: "Leaving lights on all day", correct: false },
                { text: "Using more fossil fuels", correct: false },
                { text: "Saving energy whenever possible", correct: true },
                { text: "Driving short distances instead of walking", correct: false }
            ],
            explanation: "Saving energy reduces greenhouse gas emissions, helping slow climate change."
        },
        {
            question: "8. If you see someone littering near a beach, what is the best response?",
            answers: [
                { text: "Throw your rubbish there too", correct: false },
                { text: "Tell others to litter as well", correct: false },
                { text: "Ignore it", correct: false },
                { text: "Politely encourage them to use a bin", correct: true }
            ],
            explanation: "Encouraging responsible behaviour helps keep beaches and oceans clean."
        },
        {
            question: "9. Which of these actions has the greatest positive impact on protecting marine life?",
            answers: [
                { text: "Using reusable items and reducing waste", correct: true },
                { text: "Buying products made from coral", correct: false },
                { text: "Releasing balloons outdoors", correct: false },
                { text: "Leaving fishing lines on the beach", correct: false }
            ],
            explanation: "Reducing waste lowers the amount of pollution entering marine environments."
        },
        {
            question: "10. Which statement best explains why everyone should help protect the ocean?",
            answers: [
                { text: "Only people living near the sea benefit from healthy oceans", correct: false },
                { text: "Protecting the ocean is only important for marine animals", correct: false },
                { text: "Healthy oceans support marine life, people, and the planet", correct: true },
                { text: "Protecting the ocean is only the government's responsibility", correct: false }
            ],
            explanation: "Healthy oceans provide food, oxygen, livelihoods, and habitats that benefit everyone."
        },
        {
            question: "11. Which action is the best example of protecting marine life every day?",
            answers: [
                { text: "Using reusable items and disposing of waste properly", correct: true },
                { text: "Buying souvenirs made from endangered animals", correct: false },
                { text: "Throwing unwanted fishing lines into the sea", correct: false },
                { text: "Walking on coral reefs while snorkelling", correct: false }
            ],
            explanation: "Simple daily actions, such as using reusable items and disposing of waste responsibly, help reduce pollution and protect marine life."
        },
        {
            question: "12. While visiting the beach, you see a sea turtle tangled in plastic waste. What should you do?",
            answers: [
                { text: "Leave it because nature will solve the problem", correct: false },
                { text: "Take a photo and walk away", correct: false },
                { text: "Report it to the local wildlife authorities or rescue team", correct: true },
                { text: "Throw more rubbish into the sea", correct: false }
            ],
            explanation: "Reporting the turtle to trained wildlife authorities or rescue teams gives it the best chance of being rescued safely."
        }
    ]
};

let currentQuiz = [];
let currentQuizType = "";
let currentQuestion = 0;
let score = 0;
let answered = false;

// Start Quiz Logic
window.startQuiz = function(type) {
    if (!auth.currentUser) {
        if (loginPopup) loginPopup.classList.remove("hidden");
        return;
    }

    currentQuiz = quizzes[type];
    currentQuizType = type;
    currentQuestion = 0;
    score = 0;

    const hero = document.querySelector(".quiz-hero");
    const cards = document.querySelector(".quiz-section");
    const quiz = document.getElementById("quizBox");

    hero.style.transition = "opacity .5s ease";
    cards.style.transition = "opacity .5s ease";

    hero.style.opacity = "0";
    cards.style.opacity = "0";

    setTimeout(() => {
        hero.style.display = "none";
        cards.style.display = "none";
        quiz.classList.remove("hidden");

        window.scrollTo({ top: 0, behavior: "smooth" });

        quiz.style.opacity = "0";
        quiz.style.transform = "translateY(40px)";

        setTimeout(() => {
            quiz.style.transition = ".5s";
            quiz.style.opacity = "1";
            quiz.style.transform = "translateY(0)";
        }, 100);

        showQuestion();
    }, 500);
};

function showQuestion() {
    answered = false;
    const q = currentQuiz[currentQuestion];

    document.getElementById("question").innerHTML = q.question;
    document.getElementById("questionCounter").innerHTML = `Question ${currentQuestion + 1} / ${currentQuiz.length}`;
    document.getElementById("progressBar").style.width = `${((currentQuestion + 1) / currentQuiz.length) * 100}%`;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    const explanation = document.getElementById("explanation");
    explanation.classList.add("hidden");
    explanation.innerHTML = "";

    const nextBtn = document.getElementById("nextBtn");
    if (currentQuestion === currentQuiz.length - 1) {
        nextBtn.innerHTML = "Finish <i class='fa-solid fa-flag-checkered'></i>";
    } else {
        nextBtn.innerHTML = "Next Question <i class='fa-solid fa-arrow-right'></i>";
    }
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.className = "answerBtn";
        btn.innerHTML = answer.text;

        btn.onclick = function () {
            document.querySelectorAll(".answerBtn").forEach(button => {
                button.disabled = true;
            });

            answered = true;
            nextBtn.disabled = false;
            nextBtn.style.opacity = "1";
            nextBtn.style.cursor = "pointer";

            if (answer.correct) {
                btn.classList.add("correct");
                score++;
            } else {
                btn.classList.add("wrong");
                document.querySelectorAll(".answerBtn").forEach((button, index) => {
                    if (q.answers[index].correct) {
                        button.classList.add("correct");
                    }
                });
            }

            if (q.explanation) {
                explanation.innerHTML = "<strong>💡 Explanation:</strong><br>" + q.explanation;
                explanation.classList.remove("hidden");
            }
        };
        answers.appendChild(btn);
    });
}

function bindNextButton() {
    const nextBtn = document.getElementById("nextBtn");

    nextBtn.addEventListener("click", () => {

        console.log("Current:", currentQuestion);
        console.log("Total:", currentQuiz.length);

        if (currentQuestion === currentQuiz.length - 1) {
            showResult();
        } else {
            currentQuestion++;
            showQuestion();
        }

    });
}

bindNextButton();

// Show Result
async function showResult() {

    let medal = "🥈";

    if (score === currentQuiz.length) {
        medal = "🥇";
    } else if (score >= currentQuiz.length * 0.7) {
        medal = "🥉";
    }

    let firstPerfectScore = false;

    if (auth.currentUser) {

        try {

            const progressRef = doc(
                db,
                "users",
                auth.currentUser.uid,
                "progress",
                currentQuizType
            );

            const snap = await getDoc(progressRef);

            const alreadyPerfect =
                snap.exists() && snap.data().perfectScore === true;

            if (score === currentQuiz.length && !alreadyPerfect) {
                firstPerfectScore = true;
            }

            await setDoc(
                progressRef,
                {
                    completed: true,
                    score: score,
                    totalQuestions: currentQuiz.length,
                    perfectScore:
                        alreadyPerfect || score === currentQuiz.length,
                    completedAt: new Date()
                },
                { merge: true }
            );

        } catch (error) {
            console.error(error);
        }

    }

    if (firstPerfectScore) {

        document.getElementById("quizBox").innerHTML = `
            <div class="result perfect-result">

                <div class="perfect-icon">🏆</div>

                <h2>Perfect Score!</h2>

                <div class="result-score">
                    ${score}/${currentQuiz.length}
                </div>

                <div class="badge-earned">
                    🎉 NEW BADGE UNLOCKED!<br><br>
                    ${badgeNames[currentQuizType]}
                </div>

                <p>
                    Excellent work! You've mastered this quiz.
                </p>

                <button onclick="window.location.href='signupandlogin/dashboard.html'">
                    View Dashboard
                </button>

                <br><br>

                <button onclick="restartQuiz()">
                    Play Again
                </button>

                <button onclick="goBack()">
                    Back to Quiz Selection
                </button>

            </div>
        `;

    } else if (score === currentQuiz.length) {

        document.getElementById("quizBox").innerHTML = `
            <div class="result perfect-result">

                <div class="perfect-icon">🏆</div>

                <h2>Perfect Score!</h2>

                <div class="result-score">
                    ${score}/${currentQuiz.length}
                </div>

                <p>
                    You've already unlocked
                    <strong>${badgeNames[currentQuizType]}</strong>.
                </p>

                <button onclick="restartQuiz()">
                    Play Again
                </button>

                <br><br>

                <button onclick="goBack()">
                    Back to Quiz Selection
                </button>

            </div>
        `;

    } else {

        document.getElementById("quizBox").innerHTML = `
            <div class="result">

                <h2>${medal} Quiz Completed!</h2>

                <div class="result-score">
                    ${score}/${currentQuiz.length}
                </div>

                <p>
                     Great effort! Keep exploring the ocean and try again to earn the
                    <strong>${badgeNames[currentQuizType]}</strong> badge by getting a perfect score!
                </p>

                <button onclick="restartQuiz()">
                    Play Again
                </button>

                <br><br>

                <button onclick="goBack()">
                    Back to Quiz Selection
                </button>

            </div>
        `;

    }
}

window.restartQuiz = function() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quizBox").innerHTML = `
        <div class="quiz-header">
            <span id="questionCounter"></span>
            <div class="progress"><div id="progressBar"></div></div>
        </div>
        <div class="question-box">
            <h2 id="question"></h2>
            <div id="answers"></div>
            <div id="explanation" class="explanation hidden"></div>
            <button id="nextBtn">Next Question <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    `;
    bindNextButton();
    showQuestion();
};

window.goBack = function() { //new
    location.reload();
};

const quizCards = document.querySelectorAll(".quiz-card");
quizCards.forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.quiz;
        startQuiz(type);
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