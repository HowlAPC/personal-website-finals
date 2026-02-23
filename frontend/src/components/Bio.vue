<template>
  <section class="bio-card" :class="{ 'dark-mode': isDark }">
    <header class="bio-header">
      <h2>{{ isDark ? 'You found me~' : 'About Me' }}</h2>
      <span class="subtitle">{{ isDark ? 'STILL RESTLESS // VOID' : 'Silent and restless' }}</span>
    </header>
    <div class="bio-content">
      <p v-if="!isDark">
        Hey, I'm Mj Aragon. I'm a 2nd year college student under BSIT studying in
        Asia Pacific College. I live in Las Pinas City. I'm the eldest of 5.

        
      </p>
      <p v-else class="glitch-text">
        Hoo, the more fun stuff ahuhuhu~

        Aside from the quiet usual look I have, I can also be a little mischievous too. 
        I just keep it under wraps to those I'm not close to. 
      </p>
    </div>
    
    <div class="mint-decoration"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

let observer = null
onMounted(() => {
  // Initial check
  isDark.value = document.body.classList.contains('dark-theme')
  
  observer = new MutationObserver(() => {
    isDark.value = document.body.classList.contains('dark-theme')
  })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.bio-card {
  width: 90%; 
  max-width: 1000px; 
  margin: 2rem auto;
  padding: 3rem;
  border-radius: 16px;
  background-color: var(--bg-color);
  border: 1px solid var(--text-color);
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  position: relative; /* Needed for absolute line positioning */
  overflow: hidden;
}

.bio-header h2 {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2.5rem; 
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.subtitle {
  font-family: 'Courier New', Courier, monospace;
  opacity: 0.7;
  letter-spacing: 2px;
}

.bio-content p {
  font-size: 1.2rem; 
  line-height: 1.8;
  color: var(--text-color);
}

/* --- MINT DECORATION LINE --- */
.mint-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  /* Faded mint green */
  background: linear-gradient(90deg, transparent, #98ff98, transparent);
  background-size: 200% 100%;
  animation: pulse-flow 4s ease-in-out infinite;
  opacity: 0.6;
}

/* --- DARK MODE OVERRIDES --- */
.dark-mode {
  border-color: #9932CC;
  box-shadow: 0 0 20px rgba(153, 50, 204, 0.2);
}

.dark-mode .mint-decoration {
  /* Stronger glow in dark mode */
  background: linear-gradient(90deg, transparent, #00ff9f, #9932CC, transparent);
  height: 2px;
  animation: glitch-line 0.2s infinite;
  opacity: 0.9;
}

.glitch-text {
  font-family: 'Courier New', Courier, monospace;
  color: var(--text-color);
}

/* --- ANIMATIONS --- */
@keyframes pulse-flow {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes glitch-line {
  0% { transform: translateX(-1%) skewX(0deg); opacity: 0.8; }
  50% { transform: translateX(1%) skewX(10deg); opacity: 1; }
  100% { transform: translateX(0) skewX(-10deg); opacity: 0.8; }
}
</style>