<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

// Logic to check if dark mode is active
const checkTheme = () => {
  isDark.value = document.body.classList.contains('dark-theme')
}

onMounted(() => {
  checkTheme()
  // Listen for the toggle event from the other component
  window.addEventListener('theme-changed', checkTheme)
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', checkTheme)
})

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

const projects = ref([
  {
    title: 'Guess featuring billie eilish',
    darkTitle: 'IDENT: GUESS_REMIX',
    description: 'Charli XCX & Billie Eilish',
    darkDescription: 'V_BRAT_PROTOCOL_ACTIVE',
    image: getImageUrl('bratb.jpg') 
  },
  {
    title: 'BIRDS OF A FEATHER',
    darkTitle: 'AVIAN_FLIGHT_PATH',
    description: 'Billie Eilish',
    darkDescription: 'SYSTEM_EILISH_LINK',
    image: getImageUrl('billie.jpg') 
  },
  {
    title: 'WILDFLOWER',
    darkTitle: 'BOTANICAL_ENCRYPTION',
    description: 'Billie Eilish',
    darkDescription: 'DATA_STREAM_03',
    image: getImageUrl('billie.jpg')
  },
  {
    title: 'No One Noticed',
    darkTitle: 'GHOST_OBSERVATION',
    description: 'The Marias',
    darkDescription: 'MARIA_VOID_AUDIO',
    image: getImageUrl('maria.webp')
  },
  {
    title: 'So High',
    darkTitle: 'ALTITUDE_ERROR_404',
    description: 'Doja Cat',
    darkDescription: 'CAT_SIGNAL_LOST',
    image: getImageUrl('doja.png')
  }
])
</script>

<template>
  <section class="gallery-container">
    <h2 class="gallery-title">{{ isDark ? 'TERMINAL_DATA' : 'SONGS' }}</h2>
    
    <div class="project-grid">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <div class="image-wrapper">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="card-content">
          <h3>{{ isDark ? project.darkTitle : project.title }}</h3>
          <p>{{ isDark ? project.darkDescription : project.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>