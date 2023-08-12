<template>
  <div>
    <UploadVideo @video-uploaded="onVideoUploaded" />
    <AddSubtitle :videoFileName="videoFileName" @subtitle-added="onSubtitleAdded" />

    <VideoPlayer :videoSrc="videoSrc" @time-updated="updateCurrentTime" />
    <SubtitleList :subtitles="currentSubtitles" />
     <SubtitleChart :subtitles="currentSubtitles" @jump-to-timestamp="onJumpToTimestamp" />
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import UploadVideo from './components/UploadVideo.vue';
import AddSubtitle from './components/AddSubtitle.vue';
import SubtitleChart from './components/SubtitleChart.vue';
import VideoPlayer from './components/VideoPlayer.vue';
import SubtitleList from './components/SubtitleList.vue';

const videoSrc = ref('');
const subtitles = ref({});
const videoFileName = ref('');
const currentTime = ref(0);
const currentSubtitles = ref([]);

const onVideoUploaded = async (filename) => {
  videoFileName.value = filename;
  videoSrc.value = `http://localhost:5000/uploads/${filename}`;
  await fetchSubtitles(filename);
};

const onSubtitleAdded = (subtitle) => {
  axios
    .post('http://localhost:5000/add_subtitle', {
      videoSrc: videoFileName.value,
      timestamp: formatTime(currentTime.value),
      subtitle_text: subtitle
    })
    .then(() => {
      fetchSubtitles(videoFileName.value);
    })
    .catch(error => {
      console.error('Error adding subtitle:', error);
    });
};

const updateCurrentTime = (newTime) => {
  currentTime.value = newTime;
  updateCurrentSubtitles();
};
const onJumpToTimestamp = (timestamp) => {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    const seconds = calculateSecondsFromTimestamp(timestamp);
    videoElement.currentTime = seconds;
  }
};

const calculateSecondsFromTimestamp = (timestamp) => {
  const [hours, minutes, seconds] = timestamp.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const fetchSubtitles = async (filename) => {
  try {
    const response = await axios.get(`http://localhost:5000/get_subtitles/${filename}`);
    subtitles.value = response.data.subtitles;
    updateCurrentSubtitles();
  } catch (error) {
    console.error('Error fetching subtitles:', error);
  }
};

const updateCurrentSubtitles = () => {
  const formattedTimestamp = formatTime(currentTime.value);
  currentSubtitles.value = Object.values(subtitles.value).flat().filter(subtitle => subtitle.timestamp === formattedTimestamp);
};

// Format time in HH:MM:SS format
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
};

// Pad single digits with leading zero
const padZero = (num) => {
  return num.toString().padStart(2, '0');
};
</script>
