<template>
  <div>
    <h2>Subtitles</h2>
    <ul>
      <li v-for="subtitle in subtitles" :key="subtitle.timestamp">
        {{ subtitle.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps(['subtitles']);
const localSubtitles = ref([]);

watch(props.subtitles, () => {
  localSubtitles.value = [...props.subtitles];
});
</script>
