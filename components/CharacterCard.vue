<template>
  <NuxtLink :to="characterData.name">
    <NuxtImg :src="characterImage" />
    <div class="p-4">
      <h2>{{ characterData.name }}</h2>

      <div class="flex-spread">
        <p class="category">Gender</p>
        <p>{{ characterData.gender != "n/a" ? characterData.gender : "robot" }}</p>
      </div>
      <div class="flex-spread">
        <p class="category">Born</p>
        <p>{{ characterData.birth_year }}</p>
      </div>
      <div class="flex-spread">
        <p class="category">Height</p>
        <p>{{ characterData.height }}cm</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
/* Constants */
const { characterData } = defineProps(["characterData"]);
let characterImage = "/male-character.webp";

if (characterData.name != "Yoda") {
  characterImage = computed(() => {
    switch (characterData.gender) {
      case "male":
        return "/male-character.webp";
      case "female":
        return "/female-character.webp";
      case "hermaphrodite":
        return "/hermaphrodite-character.webp";
      default:
        return "/robot-character.webp";
    }
  });
} else {
  characterImage = "/yoda-character.webp";
}
</script>

<style scoped>
img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  object-fit: cover;
}

a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-col);
  border-radius: 10px;
  transition: 0.3s;
  box-shadow: 2px 2px 2px var(--light-gray);

  & * {
    color: var(--text-col);
  }

  &:hover {
    background-color: var(--star-wars-yellow);
  }

  &:hover img {
    opacity: 0.9;
  }

  &:hover .category {
    color: var(--bg-col);
  }

  &:hover h2 {
    color: var(--text-col);
  }
}

.flex-spread {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

h2 {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--rebel-blue);
  transition: 0.3s;
}

.category {
  color: var(--light-gray);
  transition: 0.3s;
}
</style>
