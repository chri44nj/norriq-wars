<template>
  <div id="home-wrapper" class="home-wrapper">
    <WelcomeCurtain />
    <div class="dropdown-wrapper">
      <input v-model="searchQuery" @input="handleSearch" placeholder="Search characters..." class="search-input" />
      <Dropdown :dropdownData="sortDropdownData" @change="filterSort" />
      <Dropdown :dropdownData="genderDropdownData" @change="filterGender" />
      <Dropdown :dropdownData="heightDropdownData" @change="filterHeight" />
      <Dropdown :dropdownData="bornDropdownData" @change="filterBorn" />
      <div class="flex justify-center items-center flex-col w-full">
        <button @click="resetFilters" class="reset-button">Reset Filters</button>
        <p>Showing {{ allFilteredCharacters.length }} of {{ characterList.length }}</p>
      </div>
    </div>
    <section v-if="filteredCharacterList.length != 0" class="character-grid">
      <CharacterCard v-for="character in filteredCharacterList" :key="character.url" :characterData="character" />
    </section>
    <section class="no-characters" v-else>
      <h2>No characters found</h2>
      <p>Try again, using different search criterias!</p>
    </section>
  </div>
</template>

<script setup>
/* Metadata */
useHead({
  title: "Characters",
  meta: [{ name: "description", content: "Search through (not even clsoe to) all of your favorite characters from the Star Wars universe." }],
});

/* Imports */
import { sortDropdownData, genderDropdownData, bornDropdownData, heightDropdownData } from "/constants/dropdownData";
import { selectedSort, selectedGender, selectedBorn, selectedHeight } from "/constants/filterData";
import { parseBBY, matchBornRange, matchHeightRange } from "/utils/filterUtils";
import resetEventBus from "/utils/resetEventBus";

/* Constants */
const firstFetch = useState("firstFetch", () => true);
const characterList = useState("characterList", () => []);
const searchQuery = ref("");
const isSearching = ref(false);

const filteredCharacterList = computed(() => {
  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[-\s]/g, "");
  };

  let filteredList = characterList.value.filter((character) => {
    const normalizedCharacterName = normalizeString(character.name);
    const normalizedSearchQuery = normalizeString(searchQuery.value);

    const genderMatch = selectedGender.value === "all" || character.gender === selectedGender.value;
    const bornMatch = selectedBorn.value === "all" || matchBornRange(character.birth_year, selectedBorn.value);
    const heightMatch = selectedHeight.value === "all" || matchHeightRange(character.height, selectedHeight.value);
    const searchMatch = !isSearching.value || normalizedCharacterName.includes(normalizedSearchQuery);

    return genderMatch && bornMatch && heightMatch && searchMatch;
  });

  switch (selectedSort.value) {
    case "alphabetical":
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "reverse-alphabetical":
      filteredList.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "age":
      filteredList.sort((a, b) => parseBBY(a.birth_year, "age") - parseBBY(b.birth_year, "age"));
      break;
    case "reverse-age":
      filteredList.sort((a, b) => parseBBY(b.birth_year, "reverse-age") - parseBBY(a.birth_year, "reverse-age"));
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

const allFilteredCharacters = filteredCharacterList;

/* Functions */
const fetchAllCharacters = async () => {
  const cacheKey = "starWarsCharacters";
  const cacheTimestampKey = "starWarsCharactersTimestamp";
  const cacheDuration = 1000 * 60 * 60;
  let apiUrl = "https://swapi.dev/api/people";
  let charactersFetched = [];

  try {
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);
    const currentTime = new Date().getTime();

    if (cachedData && cachedTimestamp && currentTime - cachedTimestamp < cacheDuration) {
      console.log("Using cached data");
      charactersFetched = JSON.parse(cachedData);
    } else {
      console.log("Fetching new data");
      while (apiUrl) {
        const characterBatch = await $fetch(apiUrl);
        charactersFetched = [...charactersFetched, ...characterBatch.results];
        apiUrl = characterBatch.next;
      }
      localStorage.setItem(cacheKey, JSON.stringify(charactersFetched));
      localStorage.setItem(cacheTimestampKey, currentTime.toString());
    }

    characterList.value = charactersFetched;
    firstFetch.value = false;
  } catch (error) {
    if (error.response) {
      console.error("HTTP Error:", error.response.status);
    } else {
      console.error("Network Error:", error.message);
    }
  }
};

onMounted(() => {
  if (firstFetch.value) {
    fetchAllCharacters();
  }
});

const handleSearch = () => {
  if (searchQuery.value.length >= 2) {
    isSearching.value = true;
  } else {
    isSearching.value = false;
  }
};

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

const resetFilters = () => {
  resetEventBus.emit("reset");
  searchQuery.value = "";
  isSearching.value = false;
  selectedSort.value = "alphabetical";
  selectedGender.value = "all";
  selectedBorn.value = "all";
  selectedHeight.value = "all";
  console.log("All filters reset");
};

onMounted(() => {
  resetFilters();
});
</script>

<style scoped>
.home-wrapper {
  background-color: var(--light-gray);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 100dvh;
}

.dropdown-wrapper {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  padding-top: calc(75px + 1rem);
  flex-wrap: wrap;
}

.search-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--dark-gray);
  border-radius: 5px;
  font-size: 1rem;
  text-transform: capitalize;
  color: var(--dark-gray);

  &:focus {
    outline: none;
    border-color: var(--rebel-blue);
  }
}

.reset-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: var(--imperial-gray);
  color: var(--bg-col);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-auto-rows: min-content;
  padding: 1rem;
  gap: 1rem;
  overflow: scroll;
  width: 100%;
}

.no-characters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  & h2 {
    color: var(--dark-side-red);
    font-family: "star-jedi";
    font-size: clamp(1rem, 3dvh, 1.5rem);
  }
}

@media (min-width: 600px) {
  .home-wrapper {
    flex-direction: row;
  }

  .dropdown-wrapper {
    flex-direction: column;
    padding-top: calc(100px + 1rem);
  }

  .character-grid {
    padding-top: calc(100px + 1rem);
    height: 100dvh;
  }

  .search-input,
  .reset-button {
    width: 100%;
  }

  .reset-button {
    &:hover {
      background-color: var(--rebel-blue);
    }
  }

  .no-characters {
    margin: auto;

    & h2 {
      font-size: clamp(2rem, 5dvh, 3rem);
    }
  }
}
</style>
