<template>
  <div class="dropdown-menu">
    <label :for="dropdownData.id">{{ dropdownData.label }}</label>
    <select :class="defaultOption !== selectedValue ? 'filter-active' : ''" :id="dropdownData.id" :name="dropdownData.name" @change="dropdownChanged" :value="selectedValue">
      <option v-for="option in dropdownData.options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import resetEventBus from "/utils/resetEventBus";

const { dropdownData } = defineProps(["dropdownData"]);
const emit = defineEmits(["change"]);
const defaultOption = dropdownData.options[0].value;
const selectedValue = ref(defaultOption);
const dropdownChanged = (event) => {
  selectedValue.value = event.target.value;
  emit("change", selectedValue.value);
};
const resetHandler = () => {
  selectedValue.value = defaultOption;
};

onMounted(() => {
  resetEventBus.on("reset", resetHandler);
});

onUnmounted(() => {
  resetEventBus.off("reset", resetHandler);
});
</script>

<style scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: var(--imperial-gray);
  padding: 0.25rem;
}

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--dark-gray);
  border-radius: 5px;
  font-size: 1rem;
  text-transform: capitalize;
  background-color: var(--bg-col);
  color: var(--dark-gray);

  &:focus {
    outline: none;
    color: var(--bg-col);
    background-color: var(--rebel-blue);
    border-color: var(--rebel-blue);
  }
}

.filter-active {
  color: var(--bg-col);
  background-color: var(--imperial-gray);
  border-color: var(--imperial-gray);
}

option {
  color: var(--bg-col);
}

@media (min-width: 600px) {
}
</style>
