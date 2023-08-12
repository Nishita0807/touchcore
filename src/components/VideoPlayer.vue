<template>
  <div>
    <video :src="videoSrc" @timeupdate="updateCurrentTime" @loadedmetadata="checkVideoSize" controls></video>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['videoSrc']);
const emits = defineEmits();
const currentTime = ref(0);
const maxWidth = 500; // Maximum width for the video

const updateCurrentTime = (event) => {
  currentTime.value = event.target.currentTime;
  emits('time-updated', currentTime.value);
};

const checkVideoSize = (event) => {
  const videoElement = event.target;
  if (videoElement.videoWidth > maxWidth) {
    // Resize the video if it's larger than the maximum width
    videoElement.style.width = `${maxWidth}px`;
  }
};
</script>

