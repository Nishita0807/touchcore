<template>
  <div>
    <input type="file" @change="uploadVideo" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { defineEmits } from 'vue';

const emits = defineEmits();

const uploadVideo = async (event) => {
  const video = event.target.files[0];
  const formData = new FormData();
  formData.append('video', video);

  try {
   const response = await axios.post('http://localhost:5000/upload', formData);

    emits('video-uploaded', video.name);
  } catch (error) {
    console.error('Error uploading video:', error);
  }
};
</script>
