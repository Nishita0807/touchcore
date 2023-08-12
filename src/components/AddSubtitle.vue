<template>
  <div>
    <textarea v-model="newSubtitle"></textarea>
    <button @click="addSubtitle">Add Subtitle</button>
    <div v-if="showSuccessAlert" class="alert-box">
      Subtitle added successfully!
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['videoFileName']);
const emits = defineEmits();
const newSubtitle = ref('');
const showSuccessAlert = ref(false);

const addSubtitle = () => {
  if (newSubtitle.value.trim() !== '') {
    emits('subtitle-added', newSubtitle.value);
    newSubtitle.value = ''; // Clear the input field
    showSuccessAlert.value = true; // Show the success alert
    setTimeout(() => {
      showSuccessAlert.value = false; // Hide the success alert after a delay
    }, 3000); // Hide after 3 seconds
  }
};
</script>

<style>
.alert-box {
  background-color: #dff0d8;
  border: 1px solid #d0e9c6;
  color: #3c763d;
  padding: 10px;
  margin-top: 10px;
}
</style>
