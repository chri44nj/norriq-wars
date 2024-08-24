<template>
  <section>
    <div v-if="character">
      <h1>{{ character.name }}</h1>
    </div>
    <div v-else>
      <p>Character not found :(</p>
    </div>
  </section>
</template>

<script setup>
const characterList = useState("characterList");
const route = useRoute();
const characterId = computed(() => route.query.url);
const character = computed(() => {
  if (!characterList.value || !characterId.value) {
    return null;
  }
  return characterList.value.find((c) => c.url.endsWith(`/${characterId.value}/`)) || null;
});
</script>

<style scoped>
section {
  min-height: 100dvh;
}
div {
  padding: 1rem;
  padding-top: calc(75px + 1rem);
}
@media (min-width: 600px) {
  div {
    padding-top: calc(100px + 1rem);
  }
}
</style>
