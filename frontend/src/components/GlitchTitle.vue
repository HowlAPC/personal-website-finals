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
  /* Tighter spacing as requested */
  letter-spacing: 2px; 
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* --- LIGHT MODE: INDUSTRIAL --- */
.title-container:not(.chaotic-mode) .glitch-text {
  animation: occasional-snap 8s infinite;
}

.industrial-line {
  width: 80px;
  height: 1px;
  background: var(--text-color);
  margin-top: 5px;
  opacity: 0.4;
}

/* --- DARK MODE: CHAOTIC FUTURISTIC --- */
.chaotic-mode .glitch-text {
  font-family: 'Syncopate', 'Orbitron', sans-serif;
  font-weight: 900;
  letter-spacing: 4px;
  /* Occasional but intense jitter */
  animation: intense-burst 5s infinite;
  text-shadow: 0 0 2px rgba(var(--text-color-rgb), 0.3);
}

/* SUBTLE CHROMATIC ABERRATION */
.chaotic-mode .glitch-text::before,
.chaotic-mode .glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none; /* Hidden until the burst animation triggers */
}

.chaotic-mode .glitch-text::before {
  color: #ff003c; /* Red shift */
  z-index: -1;
}

.chaotic-mode .glitch-text::after {
  color: #00ff41; /* Green shift */
  z-index: -2;
}

/* Trigger pseudo-elements during the burst */
.chaotic-mode .glitch-text {
  animation: intense-burst 6s infinite;
}

/* --- ANIMATIONS --- */

/* Intense occasional burst for Dark Mode */
@keyframes intense-burst {
  0%, 90%, 100% { transform: none; text-shadow: none; }
  /* The "Seizure" phase (91% to 95%) */
  91% { transform: translate(4px, -2px) skewX(5deg); text-shadow: 2px 0 #ff003c; }
  92% { transform: translate(-4px, 2px) skewX(-5deg); text-shadow: -2px 0 #00ff41; }
  93% { transform: translate(2px, 1px); clip-path: inset(20% 0 40% 0); }
  94% { transform: translate(-2px, -1px); clip-path: inset(60% 0 10% 0); }
  95% { transform: none; clip-path: none; }
}

/* Subtle snap for Light Mode */
@keyframes occasional-snap {
  0%, 97%, 100% { transform: none; opacity: 1; }
  98% { transform: translateX(2px); opacity: 0.8; }
  99% { transform: translateX(-2px); }
}

/* Industrial mode clip-glitch */
.title-container:not(.chaotic-mode) .glitch-text::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  clip-path: inset(45% 0 45% 0);
  animation: industrial-snap 8s infinite;
  opacity: 0;
}

@keyframes industrial-snap {
  0%, 97%, 100% { opacity: 0; transform: none; }
  98% { opacity: 1; transform: translateX(5px); color: var(--accent-color); }
}
</style>