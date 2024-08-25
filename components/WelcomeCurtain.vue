<template>
  <div v-if="forceButton.firstClick">
    <div :class="['welcome-container left-curtain justify-end left-0 z-20', forceButton.clicked ? 'slide-left' : '']">
      <p class="welcome-text zoom">Hello</p>
    </div>
    <div :class="['welcome-container right-curtain justify-start right-0 z-20', forceButton.clicked ? 'slide-right' : '']">
      <p class="welcome-text zoom">There</p>
    </div>
    <div :class="['button-wrapper appear', forceButton.clicked ? 'vanish' : '']">
      <button @click="forceButtonClicked" class="force-button">Use the force</button>
    </div>
  </div>
</template>

<script setup>
/* Constants */
const forceButton = useState("forceButton", () => ({ clicked: false, firstClick: true }));

/* Functions */
const forceButtonClicked = () => {
  forceButton.value.clicked = true;

  const homeWrapper = document.getElementById("home-wrapper");
  if (homeWrapper) {
    homeWrapper.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    forceButton.value.firstClick = false;
  }, 2000);
};
</script>

<style scoped>
.welcome-container {
  position: fixed;
  display: flex;
  align-items: center;
  width: 50%;
  height: 100vh;
  background-color: var(--text-col);
  background-color: black;
}

.left-curtain::before,
.right-curtain::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -1;
  animation: fade-in 5s ease-in-out forwards;
}

.left-curtain::before {
  background-image: url("/left-curtain.webp");
  background-position: left center;
}

.right-curtain::before {
  background-image: url("/right-curtain.webp");
  background-position: right center;
}

.welcome-text {
  font-family: "star-jedi";
  color: var(--star-wars-yellow);
  font-size: clamp(1rem, 10dvw, 2.5rem);
  padding: 0.5rem;
}

.button-wrapper {
  position: fixed;
  bottom: 10%;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 30;
  transition: visibility 1s, opacity 1s;
}

.force-button {
  font-size: 1.5rem;
  color: var(--bg-col);
  font-weight: bold;
  background-color: var(--imperial-gray);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: background-color 0.5s;
  animation: tempt 1s ease-in-out infinite;
}

.zoom {
  animation: zoom 2s ease-in-out forwards;
}

.appear {
  animation: appear 2.5s ease-in-out forwards;
}

.vanish {
  animation: fade-out 0.4s ease-in-out forwards;
}

.slide-left {
  animation: slide-left 2s ease-in-out forwards;
}

.slide-right {
  animation: slide-right 2s ease-in-out forwards;
}

/* Animations */

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes zoom {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0;
    transform: rotateX(900deg);
  }

  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}

@keyframes vibrate {
  0% {
    transform: translateX(0);
    transform: rotate(1deg);
  }
  25% {
    transform: translateX(-1px);
    transform: rotate(-1deg);
  }
  50% {
    transform: translateX(1px);
    transform: rotate(1deg);
  }
  75% {
    transform: translateX(-1px);
    transform: rotate(-1deg);
  }
  100% {
    transform: translateX(0);
    transform: rotate(1deg);
  }
}

@keyframes tempt {
  0% {
    transform: rotateX(0deg);
  }

  50% {
    transform: rotateX(25deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

@keyframes slide-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-right {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}

/* Web */
@media (min-width: 600px) {
  .welcome-text {
    padding: 1rem;
    font-size: clamp(2rem, 15dvw, 4rem);
  }

  .button-wrapper {
    bottom: 30%;
  }

  .force-button {
    &:hover,
    &:focus {
      background-color: var(--rebel-blue);
      animation: vibrate 0.5s linear infinite;
      outline: none;
    }
  }
}
</style>
