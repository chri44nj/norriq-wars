<template>
  <section :style="{ backgroundColor: character ? 'var(--light-gray)' : 'transparent' }">
    <div class="breadcrumbs">
      <NuxtLink class="font-bold" to="/">Characters</NuxtLink>
      <span>/</span>
      <p class="font-bold">{{ character ? character.name : "Missing Character" }}</p>
    </div>
    <div class="character-container" v-if="character">
      <div class="portrait">
        <NuxtImg preload @load="imgLoaded" src="portrait1.png" alt="Character portrait" />
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
      <div class="details">
        <div>
          <h1>{{ character.name }}</h1>
        </div>
        <p class="lorem">Wookie ipsum dolor, sit amet consectetur Jedi elit. Culpa Sith similique facilis droid officia. Iste Force perspicacious, lightsaber iusto vel, Tatooine doloribus itaque Jedi nesciunt nobis Hutt alias expedita reiciendis quisquam accusamus Yoda illum Ewok voluptatum incidunt consequuntur, sint commodi culpa sed Sith!</p>
        <div class="traits">
          <p>{{ character.gender != "n/a" ? character.gender : "Robot" }}</p>
          <p>{{ character.height != "unknown" ? character.height + "cm" : "Unknown Height" }}</p>
          <p>{{ character.mass != "unknown" ? character.mass + "kg" : "Unknown Weight" }}</p>
          <p>{{ character.hair_color === "unknown" ? "Unknown Hair Color" : character.hair_color === "none" || "n/a" ? "No Hair" : character.hair_color + " Hair" }}</p>
          <p>{{ character.skin_color != "unknown" ? character.skin_color + " Skin" : "Unknown Skin Color" }}</p>
          <p>{{ character.eye_color != "unknown" ? character.eye_color + " Eyes" : "Unknown Eye Color" }}</p>
          <p>{{ character.films.length != 0 ? character.films.length + "x Movies" : "0 Movies" }}</p>
          <p>{{ character.vehicles.length != 0 ? character.vehicles.length + "x Vehicles" : "0 Vehicles" }}</p>
          <p>{{ character.starships.length != 0 ? character.starships.length + "x Starships" : "0 Starships" }}</p>
          <p>{{ character.birth_year != "unknown" ? "Born " + character.birth_year : "Unknown birth year" }}</p>
          <a target="_blank" :href="character.url">More Info</a>
        </div>
      </div>
    </div>
    <CharacterError v-else />

    <div v-if="character" class="flex justify-center"><button class="random-button" @click="randomCharacter">Random Character</button></div>
  </section>
</template>

<script setup>
/* Metadata */
useHead({
  title: "Character Details",
  meta: [{ name: "description", content: "All you need to know (and more) about your favorite (or least favorite) character from the Star Wars universe." }],
});

/* Imports */
import { slugify } from "/utils/slugify";

/* Constants */
const characterList = useState("characterList");
const route = useRoute();
const router = useRouter();
const characterId = computed(() => route.query.url);
/* const validCharacterImg = [1, 2, 3, 4, 5, 10, 11, 13, 14, 20, 21, 22, 44, 67]; */
const imgLoaded = () => {
  console.log("Image loaded!");
};

/* Functions */
const character = computed(() => {
  if (!characterList.value || !characterId.value) {
    return null;
  }
  return characterList.value.find((c) => c.url.endsWith(`/${characterId.value}/`)) || null;
});

/* 
const getImageSrc = computed(() => {
  if (validCharacterImg.includes(parseInt(characterId.value))) {
    return `/portrait${characterId.value}.png`;
  } else {
    return "/portrait1.png";
  }
}); */

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

const randomCharacter = () => {
  const randomId = Math.floor(Math.random() * characterList.value.length);
  const newCharacter = characterList.value.find((c) => c.url.endsWith(`/${randomId}/`));
  if (newCharacter) {
    const slug = slugify(newCharacter.name);
    router.push({ path: `/${slug}`, query: { url: randomId.toString() } });
  }
};
</script>

<style scoped>
section {
  min-height: 100dvh;
  padding: 1rem;
  padding-top: calc(75px + 1rem);
  background-color: var(--light-gray);
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  & :last-child {
    color: var(--rebel-blue);
  }
}

.character-container {
  display: flex;
  flex-direction: column;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--imperial-gray);
  gap: 0.5rem;
  padding: 1rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.lorem {
  color: var(--bg-col);
}

.traits {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;

  & * {
    font-weight: bold;
    background-color: var(--light-gray);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    text-transform: capitalize;
    transition: 0.3s;
    background-color: var(--rebel-blue);
    color: var(--bg-col);
  }

  & a {
    background-color: var(--imperial-gray);
  }
}

h1 {
  font-size: clamp(2rem, 5dvw, 3rem);
  font-family: "star-jedi";
  color: var(--bg-col);
  text-transform: lowercase;
}

.birth-year {
  font-size: clamp(1.25rem, 5dvw, 1.5rem);
  color: var(--bg-col);
  margin-top: 0.5rem;
}

img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  filter: drop-shadow(5px 5px 25px black);
}

.navigate-button {
  display: flex;
  position: absolute;
  z-index: 10;
  transform: translateY(-50%);
  top: 50%;
  opacity: 0.5;
  transition: 0.3s;
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
  background-color: var(--imperial-gray);
  padding: 1rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
}

.random-button {
  width: 100%;
  font-size: 1.5rem;
  color: var(--bg-col);
  font-weight: bold;
  background-color: var(--imperial-gray);
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: background-color 0.5s;
  animation: tempt 1s ease-in-out infinite;
  margin-top: 1rem;
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
  section {
    padding-top: calc(100px + 1rem);
  }

  .breadcrumbs {
    margin-left: 1rem;
    margin-bottom: 0;

    & a:hover {
      color: var(--rebel-blue);
    }
  }

  .traits {
    & a {
      &:hover {
        color: var(--text-col);
        background-color: var(--star-wars-yellow);
      }
    }
  }

  .character-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem;
  }

  .portrait {
    border-top-right-radius: 0;
    border-bottom-left-radius: 10px;
  }

  img {
    width: 80%;
  }

  .details {
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }

  .birth-year {
    margin-top: -0.5rem;
  }

  .navigate-button {
    &:hover {
      opacity: 1;
    }
  }

  .random-button {
    width: auto;
    margin-top: 0;
    &:hover,
    &:focus {
      background-color: var(--rebel-blue);
      animation: vibrate 0.5s linear infinite;
      outline: none;
    }
  }
}
</style>
