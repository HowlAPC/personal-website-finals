<template>
  <div class="info-block">
    <h2 class="main-title passive-glitch" :data-text="title">{{ title }}</h2>
    
    <div class="sub-sections">
      <div v-for="(section, index) in sections" :key="index" class="section">
        <h3 class="sub-header">{{ section.header }}</h3>
        <p class="paragraph">{{ section.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Interests and Hobbies')

const sections = ref([
  {
    header: 'Photography',
    content: 'Whenever I go out and find a good sight, I preserve the view by taking a photo on my phone.'
  },
  {
    header: 'Traveling | Roaming',
    content: 'The interface utilizes a custom CSS variable architecture, allowing for seamless global theme transitions.'
  },
  {
    header: 'Gaming',
    content: "I don't play as often as I used to, nor do I play as hard as before, but I still enjoy gaming. I enjoy Pokemon, but I mostly play gacha games now"
  }
])
</script>

<style scoped>
.info-block {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.05);
  border-left: 4px solid var(--text-color);
  font-family: 'Courier New', Courier, monospace;
}

.main-title {
  position: relative;
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 2rem;
  letter-spacing: 4px;
  text-transform: uppercase;
}

/* --- PASSIVE GLITCH ANIMATION --- */
.passive-glitch::before,
.passive-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  clip: rect(0, 0, 0, 0); 
}

/* Red shift */
.passive-glitch::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  animation: glitch-anim-1 5s infinite linear alternate-reverse;
}

/* Blue shift */
.passive-glitch::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

.sub-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section {
  border-bottom: 1px solid rgba(var(--text-color), 0.1);
  padding-bottom: 1rem;
  transition: background 0.3s;
}

.sub-header {
  color: var(--text-color);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.paragraph {
  line-height: 1.6;
  font-size: 0.95rem;
  opacity: 0.8;
  padding-left: 1.5rem;
}

/* Passive flicker on sub-headers */
.section:nth-child(even) .sub-header {
  animation: subtle-flicker 4s infinite;
}

/* Animations */
@keyframes glitch-anim-1 {
  0% { clip: rect(20px, 9999px, 21px, 0); }
  2% { clip: rect(80px, 9999px, 85px, 0); }
  4% { clip: rect(0, 0, 0, 0); } /* Stay hidden most of the time */
  100% { clip: rect(0, 0, 0, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(0, 0, 0, 0); }
  90% { clip: rect(0, 0, 0, 0); }
  92% { clip: rect(10px, 9999px, 15px, 0); }
  94% { clip: rect(50px, 9999px, 55px, 0); }
  100% { clip: rect(0, 0, 0, 0); }
}

@keyframes subtle-flicker {
  0%, 90%, 100% { opacity: 1; }
  92% { opacity: 0.5; transform: translateX(2px); }
  94% { opacity: 0.8; transform: translateX(-1px); }
}
</style>