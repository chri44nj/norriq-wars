<template>
  <div class="home-wrapper flex h-dvh relative overflow-hidden">
    <WelcomeCurtain />
    <div class="dropdown-wrapper">
      <Dropdown :dropdownData="sortDropdownData" @change="filterSort" />
      <Dropdown :dropdownData="genderDropdownData" @change="filterGender" />
      <Dropdown :dropdownData="bornDropdownData" @change="filterBorn" />
      <Dropdown :dropdownData="heightDropdownData" @change="filterHeight" />
    </div>
    <section class="character-grid">
      <CharacterCard v-for="character in filteredCharacterList" :key="character.url" :characterData="character" />
    </section>
  </div>
</template>

<script setup>
/* Imports */
import { sortDropdownData, genderDropdownData, bornDropdownData, heightDropdownData } from "~/constants/dropdownData";
import { parseBBY, matchBornRange, matchHeightRange } from "~/utils/filterUtils";

/* Constants */
const firstFetch = useState("firstFetch", () => true);
const characterList = useState("characterList", () => []);
const selectedSort = ref("alphabetical");
const selectedGender = ref("all");
const selectedBorn = ref("all");
const selectedHeight = ref("all");

const filteredCharacterList = computed(() => {
  let filteredList = characterList.value.filter((character) => {
    const genderMatch = selectedGender.value === "all" || character.gender === selectedGender.value;
    const bornMatch = selectedBorn.value === "all" || matchBornRange(character.birth_year, selectedBorn.value);
    const heightMatch = selectedHeight.value === "all" || matchHeightRange(character.height, selectedHeight.value);

    return genderMatch && bornMatch && heightMatch;
  });

  switch (selectedSort.value) {
    case "alphabetical":
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "reverse-alphabetical":
      filteredList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "age":
      filteredList.sort((a, b) => parseBBY(b.birth_year) - parseBBY(a.birth_year));
      break;
    case "reverse-age":
      filteredList.sort((a, b) => parseBBY(a.birth_year) - parseBBY(b.birth_year));
      break;
    case "height":
      filteredList.sort((a, b) => parseFloat(a.height) - parseFloat(b.height));
      break;
    case "reverse-height":
      filteredList.sort((a, b) => parseFloat(b.height) - parseFloat(a.height));
      break;
  }

  return filteredList;
});

/* Functions */
const fetchAllCharacters = async () => {
  let apiUrl = "https://swapi.dev/api/people";
  let charactersFetched = [];

  while (apiUrl) {
    const { data: characterBatch } = await useFetch(apiUrl);
    charactersFetched = charactersFetched.concat(characterBatch.value.results);
    characterList.value = charactersFetched;
    console.log(characterList.value);
    apiUrl = characterBatch.value.next;
  }

  firstFetch.value = false;
};

if (firstFetch.value) {
  fetchAllCharacters();
}

const filterSort = (value) => {
  selectedSort.value = value;
  console.log("Sort applied:", value);
};

const filterGender = (value) => {
  selectedGender.value = value;
  console.log("Gender filter applied:", value);
};

const filterBorn = (value) => {
  selectedBorn.value = value;
  console.log("Born filter applied:", value);
};

const filterHeight = (value) => {
  selectedHeight.value = value;
  console.log("Height filter applied:", value);
};
</script>

<style scoped>
.home-wrapper {
  background-color: var(--light-gray);
}

.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-top: calc(100px + 1rem);
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-auto-rows: min-content;
  padding: 1rem;
  padding-top: calc(100px + 1rem);
  gap: 1rem;
  overflow: scroll;
  width: 100dvw;
}
</style>
