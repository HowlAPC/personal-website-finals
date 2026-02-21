<template>
  <div class="district-block">
    <h2 class="district-header" :data-text="title">{{ title }}</h2>
    
    <div class="district-content">
      <div v-for="(section, index) in sections" :key="index" class="district-section">
        <h3 class="district-subheader">{{ section.header }}</h3>
        <p class="district-paragraph">{{ section.content }}</p>
      </div>
    </div>

    <div class="hazard-bar"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('ENCRYPTED_ZONE')

const sections = ref([
  {
    header: 'VOID_PROTOCOL',
    content: 'The digital landscape shifts under the weight of encrypted streams. Every byte is a story, and every glitch is a signature.'
  },
  {
    header: 'NEON_OVERRIDE',
    content: 'Bypassing standard restrictions allows for total UI control. Stability is sacrificed for raw visual intensity.'
  }
])
</script>

<style scoped>
.district-block {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2.5rem;
  /* Adaptive Background */
  background: var(--bg-color);
  border: 1px solid var(--text-color);
  box-shadow: 0 0 15px rgba(var(--text-color), 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  font-family: 'Courier New', Courier, monospace;
}

/* Dark Mode Specific Tweaks */
:global(.dark-theme) .district-block {
  background: linear-gradient(135deg, rgba(20, 0, 30, 0.95) 0%, rgba(5, 0, 10, 1) 100%);
  box-shadow: 0 0 25px rgba(153, 50, 204, 0.2);
}

/* Scanlines only visible in Dark Mode for that CRT feel */
.district-block::after {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(153, 50, 204, 0.03) 0px,
    rgba(153, 50, 204, 0.03) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s;
}

:global(.dark-theme) .district-block::after {
  opacity: 1;
}

.district-header {
  position: relative;
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 4px;
}

/* Passive Purple Glitch */
.district-header::before,
.district-header::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  clip: rect(0, 0, 0, 0);
}

.district-header::before {
  left: 3px;
  text-shadow: -2px 0 #ff00ff;
  animation: glitch-loop-1 4s infinite linear alternate-reverse;
}

.district-header::after {
  left: -3px;
  text-shadow: 2px 0 #00ffff;
  animation: glitch-loop-2 3s infinite linear alternate-reverse;
}

.district-section {
  margin-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.district-subheader {
  color: var(--text-color);
  font-size: 1.2rem;
  letter-spacing: 2px;
  margin-bottom: 0.8rem;
  font-weight: bold;
}

.district-paragraph {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 0.95rem;
  border-left: 3px solid var(--text-color);
  padding-left: 1.5rem;
  opacity: 0.85;
}

/* Hazard Bar - Purple and Black/White */
.hazard-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: repeating-linear-gradient(
    45deg,
    var(--text-color),
    var(--text-color) 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.6;
}

/* Animations */
@keyframes glitch-loop-1 {
  0%, 100% { clip: rect(0, 0, 0, 0); }
  1% { clip: rect(20px, 9999px, 40px, 0); }
  2% { clip: rect(70px, 9999px, 75px, 0); }
}

@keyframes glitch-loop-2 {
  0%, 100% { clip: rect(0, 0, 0, 0); }
  98% { clip: rect(10px, 9999px, 15px, 0); }
  99% { clip: rect(50px, 9999px, 80px, 0); }
}
</style>