document.addEventListener("DOMContentLoaded", () => {
  const pokemon = document.getElementById("pokemon");
  const walkingArea = document.getElementById("walking-area");
  let leftPosition = 0;
  let direction = 1;
  let spriteIndex = 0;
  let animationCounter = 0;
  let isPaused = false;
  let isIdle = false;
  let nextIdleThreshold = 0;
  let movementCount = 0;
  const MIN_MOVES_BEFORE_IDLE = 50;
  const MAX_MOVES_BEFORE_IDLE = 300;
  const MIN_IDLE_DURATION = 1000;
  const MAX_IDLE_DURATION = 3000;
  let maxWidth = 0;

  const walkingSprites = ["../assets/walking1.gif", "../assets/walking2.gif"];
  const idleSprite = "../assets/idle.gif";

  // Calcola la larghezza massima in base all'area di movimento
  function calculateMaxWidth() {
    if (walkingArea) {
      maxWidth = walkingArea.offsetWidth - pokemon.offsetWidth;
    } else {
      maxWidth = window.innerWidth / 2 - pokemon.offsetWidth;
    }
  }

  // Gestione audio nel DOM
  const audio = document.getElementById("ost");
  const playButton = document.getElementById("play-button");
  const volumeControl = document.getElementById("volume-control");
  const volumeValue = document.getElementById("volume-value");
  
  // Inizializza audio in muto
  if (audio && playButton && volumeControl && volumeValue) {
    audio.volume = 0;
    
    playButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playButton.textContent = "🔊";
      } else {
        audio.pause();
        playButton.textContent = "🔇";
      }
    });
    
    volumeControl.addEventListener("input", () => {
      const volume = volumeControl.value / 100;
      audio.volume = volume;
      volumeValue.textContent = `${volumeControl.value}%`;
      
      if (volume > 0 && audio.paused) {
        audio.play();
        playButton.textContent = "🔊";
      }
    });
  }

  function changeSprite() {
    if (pokemon && !isPaused && !isIdle) {
      pokemon.src = walkingSprites[spriteIndex];
      spriteIndex = (spriteIndex + 1) % walkingSprites.length;
    }
  }

  function startIdle() {
    if (pokemon && !isPaused) {
      isIdle = true;
      pokemon.src = idleSprite;

      const idleDuration =
        MIN_IDLE_DURATION +
        Math.random() * (MAX_IDLE_DURATION - MIN_IDLE_DURATION);

      setTimeout(() => {
        isIdle = false;
        nextIdleThreshold =
          movementCount +
          MIN_MOVES_BEFORE_IDLE +
          Math.random() * (MAX_MOVES_BEFORE_IDLE - MIN_MOVES_BEFORE_IDLE);
      }, idleDuration);
    }
  }

  function movePokemon() {
    if (!pokemon || isPaused) return;

    if (isIdle) return;

    movementCount++;

    if (movementCount >= nextIdleThreshold && Math.random() > 0.5) {
      startIdle();
      return;
    }

    leftPosition += 1 * direction;

    if (leftPosition >= maxWidth || leftPosition <= 0) {
      isPaused = true;
      direction = -direction;
      pokemon.style.transform = direction === 1 ? "scaleX(1)" : "scaleX(-1)";

      setTimeout(() => {
        isPaused = false;
        changeSprite();
      }, 500);
      return;
    }

    animationCounter++;
    if (animationCounter % 20 === 0) {
      changeSprite();
    }

    pokemon.style.left = `${leftPosition}px`;
  }

  if (pokemon) {
    calculateMaxWidth();
    window.addEventListener('resize', calculateMaxWidth);
    
    nextIdleThreshold =
      MIN_MOVES_BEFORE_IDLE +
      Math.random() * (MAX_MOVES_BEFORE_IDLE - MIN_MOVES_BEFORE_IDLE);

    intervalId = setInterval(movePokemon, 50);
    changeSprite();
  } else {
    console.error("Pokemon element not found in DOM");
  }
});