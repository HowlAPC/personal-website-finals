<template>
  <div class="title-container" :class="{ 'chaotic-mode': isDark }">
    <h1 class="glitch-text" :data-text="currentText">
      {{ currentText }}
    </h1>
    <div class="industrial-line" v-if="!isDark"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  lightText: { type: String, default: 'SYSTEM_READY' },
  darkText: { type: String, default: 'VOID_PROTOCOL' }
})

const isDark = ref(false)
const currentText = computed(() => isDark.value ? props.darkText : props.lightText)

let observer = null
onMounted(() => {
  isDark.value = document.body.classList.contains('dark-theme')
  observer = new MutationObserver(() => {
    isDark.value = document.body.classList.contains('dark-theme')
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0;
  perspective: 1000px;
}

.glitch-text {
  /* Forced Sleek Courier New */
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  position: relative;
  color: var(--text-color);
  letter-spacing: 8px;
  text-transform: uppercase;
  transition: color 0.3s ease;
  /* Jitter animation now active in both modes, but different intensities */
  animation: regular-jitter 6s infinite;
}

/* --- SHARED GLITCH PSEUDO-ELEMENTS --- */
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  display: block;
}

/* --- LIGHT MODE: INDUSTRIAL SLEEK --- */
.title-container:not(.chaotic-mode) .glitch-text::before {
  left: 2px;
  text-shadow: -1px 0 var(--accent-color);
  clip-path: inset(45% 0 45% 0);
  animation: industrial-glitch 4s infinite linear alternate-reverse;
  opacity: 0.7;
}

.industrial-line {
  width: 100px;
  height: 1px;
  background: var(--text-color);
  margin-top: -5px;
  opacity: 0.5;
}

/* --- DARK MODE: CHAOTIC --- */
.chaotic-mode .glitch-text {
  text-shadow: 2px 0 #ff003c, -2px 0 #00ff41;
  animation: heavy-jitter 3s infinite;
}

.chaotic-mode .glitch-text::before {
  left: 3px;
  text-shadow: -3px 0 #ff003c;
  clip-path: inset(10% 0 80% 0);
  animation: chaotic-glitch-1 2s infinite linear alternate-reverse;
}

.chaotic-mode .glitch-text::after {
  left: -3px;
  text-shadow: -3px 0 #00ff41;
  clip-path: inset(80% 0 10% 0);
  animation: chaotic-glitch-2 1.5s infinite linear alternate-reverse;
}

/* --- ANIMATIONS --- */

/* Subtle occasional shift for Light Mode */
@keyframes regular-jitter {
  0%, 95%, 100% { transform: none; }
  96% { transform: translate(2px, -1px); }
  97% { transform: translate(-1px, 1px); }
  98% { transform: skewX(2deg); }
}

/* More violent shift for Dark Mode */
@keyframes heavy-jitter {
  0%, 80%, 100% { transform: none; filter: blur(0); }
  82% { transform: skew(5deg) translate(5px); filter: blur(1px); }
  84% { transform: skew(-8deg) translate(-5px); }
  86% { transform: none; }
}

/* Horizontal slicing for Industrial mode */
@keyframes industrial-glitch {
  0%, 80%, 100% { opacity: 0; }
  81% { opacity: 1; clip-path: inset(10% 0 80% 0); }
  85% { opacity: 1; clip-path: inset(40% 0 40% 0); }
  90% { opacity: 0; }
}

/* Random chaotic slicing for Dark Mode */
@keyframes chaotic-glitch-1 {
  0% { clip-path: inset(20% 0 50% 0); transform: translate(-5px); }
  20% { clip-path: inset(80% 0 1% 0); transform: translate(5px); }
  100% { clip-path: inset(30% 0 20% 0); transform: translate(0); }
}

@keyframes chaotic-glitch-2 {
  0% { clip-path: inset(10% 0 80% 0); transform: translate(5px); }
  50% { clip-path: inset(50% 0 20% 0); transform: translate(-5px); }
  100% { clip-path: inset(0% 0 90% 0); transform: translate(0); }
}
</style>