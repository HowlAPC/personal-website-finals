<template>
  <div class="toggle-container">
    <div class="label-wrapper">
      <span 
        class="mode-label" 
        :class="{ 'glitching': isGlitching }" 
        :data-text="isDark ? 'AFTERDARK <3' : 'SYSTEM: LIGHT'"
      >
        {{ isDark ? 'AFTERDARK <3' : 'SYSTEM: LIGHT' }}
      </span>
      <div class="scan-line"></div>
    </div>
    
    <label class="switch">
      <input type="checkbox" v-model="isDark" @change="handleToggle">
      <span class="slider"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const isGlitching = ref(false)

const handleToggle = () => {
  isGlitching.value = true
  document.body.classList.add('global-flicker') 
  
  if (isDark.value) {
    document.body.classList.add('dark-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark-theme')
    localStorage.setItem('theme', 'light')
  }

  setTimeout(() => {
    isGlitching.value = false
    document.body.classList.remove('global-flicker')
  }, 400)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.body.classList.add('dark-theme')
  }
})
</script>

<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 1rem;
  font-family: 'Courier New', Courier, monospace;
}


.label-wrapper {
  position: relative;
  padding: 2px 5px;
  overflow: hidden; 
  border-radius: 2px;
}

.mode-label {
  font-weight: bold;
  position: relative;
  color: var(--text-color);
  z-index: 1;
}


.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px; 
  background: var(--text-color);
  opacity: 0.6;
  box-shadow: 0 0 10px var(--text-color);
  z-index: 2;
  pointer-events: none;
  animation: scan-move 3s linear infinite;
}


@keyframes scan-move {
  0% { top: -10%; }
  100% { top: 110%; }
}


.glitching {
  animation: text-flicker 0.1s infinite;
}

.glitching::before,
.glitching::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
}

.glitching::before {
  color: #0ff;
  z-index: -1;
  animation: shift-left 0.2s infinite;
}

.glitching::after {
  color: #f0f;
  z-index: -2;
  animation: shift-right 0.2s infinite;
}


.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 20px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #666;
  transition: 0.2s;
  border-radius: 4px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px; width: 14px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: 0.1s;
}

input:checked + .slider { background-color: var(--accent-color); }
input:checked + .slider:before { transform: translateX(24px); }

@keyframes text-flicker {
  0% { opacity: 0.1; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
@keyframes shift-left {
  0% { transform: translateX(-2px); }
  100% { transform: translateX(2px); }
}
@keyframes shift-right {
  0% { transform: translateX(2px); }
  100% { transform: translateX(-2px); }
}
</style>