<template>
  <div class="relative">
    <header class="fixed top-0 w-full z-10">
      <nav>
        <NuxtLink to="/">Characters</NuxtLink>
        <NuxtLink to="/whowins">Who wins?</NuxtLink>
      </nav>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <h2>May the force be with you</h2>
      <p>Data source</p>
      <a class="source-link" href="https://swapi.dev/api/people" target="_blank">swapi</a>
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--rebel-blue);
  gap: 1rem;
  height: 75px;
}

a {
  font-size: clamp(1.25rem, 5dvw, 2rem);
  font-weight: bold;
  font-family: "star-jedi";
  border-bottom: solid 5px transparent;
  transition: 0.2s ease-out;
  color: var(--bg-col);

  &:hover {
    color: var(--star-wars-yellow);
    outline: none;
  }
}

.router-link-exact-active {
  border-bottom-color: var(--bg-col);

  &:hover {
    border-bottom-color: var(--star-wars-yellow);
  }
}

footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-color: var(--imperial-gray);
}

h2 {
  font-size: clamp(1rem, 5dvw, 3rem);
  color: var(--star-wars-yellow);
  font-family: "star-jedi";
  text-align: center;
  padding-inline: 1rem;
}

p {
  font-weight: bold;
  color: var(--bg-col);
}

.source-link {
  font-family: "Montserrat";
  font-size: 1rem;
  text-decoration: underline;
  font-weight: normal;
}

@media (min-width: 600px) {
  nav {
    gap: 2rem;
    height: 100px;
  }

  h2 {
    font-size: clamp(1rem, 10dvw, 3.5rem);
  }
}
</style>
