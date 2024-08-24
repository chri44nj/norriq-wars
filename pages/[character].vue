<template>
  <section>
    <div class="character-container" v-if="character">
      <div class="portrait">
        <NuxtImg src="/portrait.png" />
      </div>
      <div class="details">
        <h1>{{ character.name + characterId }}</h1>
        <button class="navigate-button previous" @click="previousCharacter">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f9f9f9" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
        </button>
        <button class="navigate-button next" @click="nextCharacter">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f9f9f9" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </button>
      </div>
    </div>
    <CharacterError v-else />
  </section>
</template>

<script setup>
/* Imports */
import { slugify } from "/utils/slugify";

/* Constants */
const characterList = useState("characterList");
const route = useRoute();
const router = useRouter();
const characterId = computed(() => route.query.url);

/* Functions */
const character = computed(() => {
  if (!characterList.value || !characterId.value) {
    return null;
  }
  return characterList.value.find((c) => c.url.endsWith(`/${characterId.value}/`)) || null;
});

const navigateToCharacter = (id) => {
  const newCharacter = characterList.value.find((c) => c.url.endsWith(`/${id}/`));
  if (newCharacter) {
    const slug = slugify(newCharacter.name);
    router.push({ path: `/${slug}`, query: { url: id.toString() } });
  }
};

const previousCharacter = () => {
  const idNumber = parseInt(characterId.value);
  const nextId = idNumber - 1;
  navigateToCharacter(nextId);
};

const nextCharacter = () => {
  const idNumber = parseInt(characterId.value);
  const nextId = idNumber + 1;
  navigateToCharacter(nextId);
};
</script>

<style scoped>
section {
  min-height: 100dvh;
  padding: 1rem;
  padding-top: calc(75px + 1rem);
  background-color: var(--imperial-gray);
  position: relative;
}

.character-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

img {
  filter: drop-shadow(5px 5px 25px black);
}

.navigate-button {
  display: flex;
  position: fixed;
  z-index: 10;
  transform: translateY(-50%);
  top: 60%;
}

.previous {
  left: 1rem;
}

.next {
  right: 1rem;
}

.portrait {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--rebel-blue);
  padding: 1rem;
  border-top-left-radius: 10px;
}

@media (min-width: 600px) {
  section {
    padding-top: calc(100px + 1rem);
  }

  .character-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
