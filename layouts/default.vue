<template>
  <div class="relative">
    <header class="fixed top-0 w-full z-10">
      <nav class="flex justify-center items-center gap-8 p-4">
        <NuxtLink to="/">Characters</NuxtLink>
        <NuxtLink to="/whowins">Who wins?</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer></footer>
  </div>
</template>

<script setup></script>

<style scoped>
nav {
  background-color: var(--rebel-blue);
  height: 100px;
}

a {
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "star-jedi";
  border-bottom: solid 5px transparent;
  transition: 0.2s ease-out;
  color: var(--bg-col);

  &:hover {
    color: var(--star-wars-yellow);
  }
}

.router-link-exact-active {
  border-bottom-color: var(--bg-col);

  &:hover {
    border-bottom-color: var(--star-wars-yellow);
  }
}
</style>
