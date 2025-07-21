// Game variables
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

// Map button ids to car sound filenames
const btnToSound = {
  btn1: "porsche-105500.mp3",
  btn2: "lambo-start-up-sound-26364.mp3",
  btn3: "bugatti-veyron-super-sport-sound-effect-361741.mp3",
  btn4: "bmw-i8-noise-252644.mp3"
};

const cars = Object.keys(btnToSound); // ["btn1", "btn2", "btn3", "btn4"]

const heading = document.querySelector("h1");
const subtitle = document.querySelector("h2");

// Play sound for a given button id
function playSound(btnId) {
  const audio = new Audio(`sounds/${btnToSound[btnId]}`);
  audio.play();
}

// Animate button press
function animateButton(btnId) {
  const btn = document.getElementById(btnId);
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 300);
}

// Generate next sequence step
function nextSequence() {
  userSequence = [];
  level++;
  heading.textContent = `🚦 Level ${level}`;
  subtitle.textContent = "Watch and repeat the sequence!";

  // Add random button id to sequence
  const randomBtn = cars[Math.floor(Math.random() * cars.length)];
  gameSequence.push(randomBtn);

  // Play sequence with delay
  let delay = 0;
  gameSequence.forEach((btnId, index) => {
    setTimeout(() => {
      playSound(btnId);
      animateButton(btnId);
    }, delay);
    delay += 800;
  });
}

// Check user input correctness
function checkUserInput(currentIndex) {
  if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
    gameOver();
    return false;
  }
  if (userSequence.length === gameSequence.length) {
    setTimeout(nextSequence, 1000);
  }
  return true;
}

// Game over handler
function gameOver() {
  // Optional: Add a "wrong" sound file named wrong.mp3 in sounds folder and uncomment below
  // new Audio('sounds/wrong.mp3').play();

  heading.textContent = "💥 Game Over! Press any key to restart.";
  subtitle.textContent = "";
  gameSequence = [];
  userSequence = [];
  level = 0;
  started = false;
}

// Start game on key press
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    nextSequence();
  }
});

// Add click listeners to buttons
cars.forEach(btnId => {
  const btn = document.getElementById(btnId);
  btn.addEventListener("click", () => {
    if (!started) return; // Ignore if game not started

    userSequence.push(btnId);
    playSound(btnId);
    animateButton(btnId);

    checkUserInput(userSequence.length - 1);
  });
});
