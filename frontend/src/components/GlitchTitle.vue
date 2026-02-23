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
  lightText: { type: String, default: 'Mj Aragon' },
  darkText: { type: String, default: 'Howl!' }
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
  /* Default Industrial Font */
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  position: relative;
  color: var(--text-color);
  letter-spacing: 8px;
  text-transform: uppercase;
  transition: all 0.2s ease;
  animation: regular-jitter 6s infinite;
}

/* --- SHARED PSEUDO-ELEMENTS --- */
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

/* --- LIGHT MODE: INDUSTRIAL --- */
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

/* --- DARK MODE: CHAOTIC FUTURISTIC --- */
.chaotic-mode .glitch-text {
  /* Futuristic Font Stack: Wide and Geometric */
  font-family: 'Syncopate', 'Orbitron', 'Trebuchet MS', sans-serif;
  font-weight: 900;
  letter-spacing: 15px;
  /* Removed Red/Green text shadows for a cleaner, high-tech jitter */
  text-shadow: 0 0 5px var(--text-color);
  animation: aggressive-jitter 0.15s infinite;
}

/* Fragmentation layers for Dark Mode */
.chaotic-mode .glitch-text::before {
  left: -2px;
  clip-path: inset(20% 0 50% 0);
  opacity: 0.5;
  animation: frag-shift 0.2s infinite;
}

.chaotic-mode .glitch-text::after {
  left: 2px;
  clip-path: inset(60% 0 10% 0);
  opacity: 0.5;
  animation: frag-shift 0.2s infinite reverse;
}

/* --- ANIMATIONS --- */

/* Subtle shift for Industrial Mode */
@keyframes regular-jitter {
  0%, 95%, 100% { transform: none; }
  96% { transform: translate(2px, -1px); }
  98% { transform: skewX(2deg); }
}

/* Rapid vibration for Chaotic Mode */
@keyframes aggressive-jitter {
  0% { transform: translate(0); }
  25% { transform: translate(1px, -1px) skewX(1deg); }
  50% { transform: translate(-1px, 1px) skewX(-1deg); }
  75% { transform: translate(1px, 1px); }
  100% { transform: translate(0); }
}

/* Fragment slicing for Chaotic Mode */
@keyframes frag-shift {
  0% { transform: translateX(-5px); }
  100% { transform: translateX(5px); }
}

@keyframes industrial-glitch {
  0%, 80%, 100% { opacity: 0; }
  81% { opacity: 1; clip-path: inset(10% 0 80% 0); }
  85% { opacity: 1; clip-path: inset(40% 0 40% 0); }
  90% { opacity: 0; }
}
</style>