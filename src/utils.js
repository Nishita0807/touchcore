// utils.js

// Format time in HH:MM:SS format
export const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
  };
  
  // Pad single digits with leading zero
  const padZero = (num) => {
    return num.toString().padStart(2, '0');
  };
  