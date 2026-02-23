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
  padding: 2rem 0;
  perspective: 1000px;
}

.glitch-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  position: relative;
  color: var(--text-color);
  letter-spacing: 10px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

/* --- LIGHT MODE: INDUSTRIAL --- */
.glitch-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  clip-path: inset(45% 0 45% 0);
  opacity: 0;
}

.title-container:not(.chaotic-mode) .glitch-text:hover::before {
  opacity: 1;
  transform: translateX(4px);
  border-top: 2px solid var(--text-color);
  border-bottom: 2px solid var(--text-color);
  background: var(--bg-color);
}

.industrial-line {
  width: 150px;
  height: 2px;
  background: var(--text-color);
  margin-top: 10px;
  box-shadow: 0 0 10px var(--text-color);
}

/* --- DARK MODE: CHAOTIC --- */
.chaotic-mode .glitch-text {
  text-shadow: 2px 0 #ff003c, -2px 0 #00ff41;
  animation: jitter 4s infinite;
}

.chaotic-mode .glitch-text::before,
.chaotic-mode .glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: var(--bg-color);
}

.chaotic-mode .glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff003c;
  clip-path: inset(10% 0 80% 0);
  animation: glitch-anim-1 2s infinite linear alternate-reverse;
}

.chaotic-mode .glitch-text::after {
  left: -2px;
  text-shadow: -2px 0 #00ff41;
  clip-path: inset(80% 0 10% 0);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

@keyframes jitter {
  0%, 90%, 100% { transform: none; opacity: 1; }
  92% { transform: skew(10deg); opacity: 0.8; }
  95% { transform: skew(-10deg); }
}

@keyframes glitch-anim-1 {
  0% { clip-path: inset(20% 0 50% 0); }
  20% { clip-path: inset(80% 0 1% 0); }
  40% { clip-path: inset(10% 0 70% 0); }
  100% { clip-path: inset(30% 0 20% 0); }
}

@keyframes glitch-anim-2 {
  0% { clip-path: inset(10% 0 80% 0); }
  30% { clip-path: inset(50% 0 20% 0); }
  70% { clip-path: inset(80% 0 5% 0); }
  100% { clip-path: inset(0% 0 90% 0); }
}
</style>