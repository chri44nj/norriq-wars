<template>
  <section>
    <NuxtImg src="/yoda-background.webp" alt="Yoda sassy background" />
    <h1>Wouldn't you like to know?</h1>
    <p>(A.K.A. under construction)</p>
  </section>
</template>

<script setup>
/* Metadata */
useHead({
  title: "Who wins?",
  meta: [{ name: "description", content: "The question every one has always wanted to know: who would win in a 1v1 fight to the death, Luke Skywalker or Darth Vader? With our state-of-the-art technology, you can now find out!" }],
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100dvh;
  background-color: var(--light-gray);
  padding-top: calc(75px + 1rem);
}

img {
  width: 90%;
  border-radius: 10px;
}

h1 {
  font-size: clamp(1.25rem, 5dvw, 3rem);
  font-family: "star jedi";
  text-align: center;
}

@media (min-width: 600px) {
  section {
    padding-top: calc(100px + 1rem);
  }

  img {
    width: 50%;
    min-width: 600px;
  }
}
</style>
