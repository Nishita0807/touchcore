<template>
  <div>
    <h2>Subtitle Distribution</h2>
    <div class="chart">
      <div
        v-for="(count, timestamp) in subtitleCounts"
        :key="timestamp"
        class="bar"
        :style="{ height: (count * 10) + 'px' }"
        @click="jumpToTimestamp(timestamp)"
      >
        {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { formatTime } from '../utils';

const props = defineProps(['subtitles']);
const subtitleCounts = ref({});

// Calculate subtitle distribution
const calculateSubtitleDistribution = () => {
  const counts = {};
  props.subtitles.forEach(subtitle => {
    const formattedTimestamp = formatTime(subtitle.timestamp);
    if (!counts[formattedTimestamp]) {
      counts[formattedTimestamp] = 0;
    }
    counts[formattedTimestamp]++;
  });
  subtitleCounts.value = counts;
};

// Update distribution when subtitles change
watch(() => props.subtitles, () => {
  calculateSubtitleDistribution();
});

// Initial calculation
calculateSubtitleDistribution();

const emits = defineEmits();

const jumpToTimestamp = (timestamp) => {
  emits('jump-to-timestamp', timestamp);
};
</script>

<style scoped>
.chart {
  display: flex;
  cursor: pointer;
}

.bar {
  flex: 1;
  background-color: #3498db;
  margin: 0 1px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
}
</style>
