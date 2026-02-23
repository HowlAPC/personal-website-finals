<template>
  <div class="digital-container" :class="{ 'dark-mode': isDark }">
    <div class="glitch-wrapper">
      <h1 class="main-text" :data-text="text">{{ text }}</h1>
      <div class="scanlines"></div>
    </div>
    <div class="sub-line">
      <span class="status-dot"></span>
      <span class="breadcrumb">{{ isDark ? 'EXTERNAL_STORAGE_01' : 'LOCAL_HOST_8080' }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: 'SYSTEM_ERROR'
  }
})

const isDark = ref(false)
let observer = null

onMounted(() => {
  isDark.value = document.body.classList.contains('dark-theme')
  observer = new MutationObserver(() => {
    isDark.value = document.body.classList.contains('dark-theme')
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.digital-container {
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
}

.glitch-wrapper {
  position: relative;
  display: inline-block;
}

.main-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  color: var(--text-color);
  text-transform: uppercase;
  margin: 0;
  letter-spacing: -2px;
  position: relative;
}

/* The Glitch Layers */
.main-text::before,
.main-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.dark-mode .main-text::before {
  color: #0ff; /* Cyan glitch */
  z-index: -1;
  animation: glitch-anim 2s infinite linear alternate-reverse;
}

.dark-mode .main-text::after {
  color: #f0f; /* Magenta glitch */
  z-index: -2;
  animation: glitch-anim 3s infinite linear alternate;
}

.sub-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  opacity: 0.7;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--text-color);
  border-radius: 50%;
  animation: pulse 1s infinite;
}

.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
}

@keyframes glitch-anim {
  0% { clip-path: inset(80% 0 1% 0); transform: translate(-2px, -2px); }
  20% { clip-path: inset(20% 0 50% 0); transform: translate(2px, 2px); }
  40% { clip-path: inset(60% 0 10% 0); transform: translate(-1px, 1px); }
  60% { clip-path: inset(10% 0 70% 0); transform: translate(1px, -1px); }
  80% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 0); }
  100% { clip-path: inset(50% 0 40% 0); transform: translate(2px, 0); }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
</style>