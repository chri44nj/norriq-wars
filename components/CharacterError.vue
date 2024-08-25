<template>
  <div class="error-container">
    <h2>Blasted!</h2>
    <p class="error-text">The character you're looking for has gone missing</p>
    <NuxtLink class="back-button" to="/">Help us find them</NuxtLink>
  </div>
</template>

<script setup></script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100dvh - 75px - 1rem);

  & h2 {
    color: var(--dark-side-red);
    font-family: "star-jedi";
    font-size: clamp(1.25rem, 3dvw, 3rem);
  }
}

.error-text {
  color: var(--bg-col);
  text-align: center;
  font-size: clamp(1.25rem, 3dvw, 3rem);
}

.error-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/crying-yoda.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: -1;
  opacity: 0.75;
}

.back-button {
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--imperial-gray);
  color: var(--bg-col);
  border: none;
  border-radius: 5px;
  font-size: clamp(1rem, 5dvw, 1.5rem);
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  animation: tempt 1s ease-in-out infinite;
}

/* Animations */
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

@media (min-width: 600px) {
  .error-container {
    height: calc(100dvh - 100px - 1rem);
  }

  .back-button {
    max-width: 20%;
    &:hover {
      background-color: var(--rebel-blue);
    }
  }
}
</style>
