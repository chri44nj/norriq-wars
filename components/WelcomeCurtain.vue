<template>
  <div v-if="forceButton.firstClick">
    <div :class="['welcome-container justify-end left-0 z-20', forceButton.clicked ? 'slide-left' : '']">
      <p class="welcome-text">Hello</p>
    </div>
    <div :class="['welcome-container justify-start right-0 z-20', forceButton.clicked ? 'slide-right' : '']">
      <p class="welcome-text">There</p>
    </div>
    <div :class="['button-wrapper', forceButton.clicked ? 'vanish' : '']">
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

  setTimeout(() => {
    forceButton.value.firstClick = false;
  }, 2000);
};
</script>

<style scoped>
.welcome-container {
  position: absolute;
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: var(--text-col);
  padding: 1rem;
}

.welcome-text {
  font-family: "star-jedi";
  color: var(--star-wars-yellow);
  font-size: 4rem;
}

.button-wrapper {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  transition: visibility 1s, opacity 1s;
}

.force-button {
  color: var(--bg-col);
  font-weight: bold;
  background-color: var(--imperial-gray);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: background-color 0.5s;
  &:hover {
    background-color: var(--rebel-blue);
    animation: vibrate 0.5s linear infinite;
  }
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
</style>
