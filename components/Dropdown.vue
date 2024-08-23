<template>
  <div class="dropdown-menu">
    <label :for="dropdownData.id">{{ dropdownData.label }}</label>
    <select :id="dropdownData.id" :name="dropdownData.name" @change="dropdownChanged">
      <option v-for="option in dropdownData.options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script setup>
/* Constants */
const { dropdownData } = defineProps(["dropdownData"]);
const emit = defineEmits(["change"]);

/* Functions */
const dropdownChanged = (event) => {
  emit("change", event.target.value);
};
</script>

<style scoped>
.dropdown-menu {
  display: flex;
  flex-direction: column;
}
</style>
