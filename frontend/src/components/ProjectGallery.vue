<template>
  <section class="gallery-container">
    <h2 class="gallery-title">SONGS</h2>
    <div class="project-grid">
      <div v-for="(project, index) in displayProjects" :key="index" class="project-card">
        <div class="image-wrapper">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="card-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

// 1. Define your Light Mode Content
const lightProjects = [
  { title: 'Guess', description: 'Charli XCX & Billie Eilish', image: getImageUrl('bratb.jpg') },
  { title: 'BIRDS OF A FEATHER', description: 'Billie Eilish', image: getImageUrl('billie.jpg') },
  { title: 'WILDFLOWER', description: 'Billie Eilish', image: getImageUrl('billie.jpg') },
  { title: 'No One Noticed', description: 'The Marias', image: getImageUrl('maria.webp') },
  { title: 'So High', description: 'Doja Cat', image: getImageUrl('doja.png') }
]

// 2. Define your Dark Mode Content
const darkProjects = [
  { title: 'Nightcall', description: 'Kavinsky', image: getImageUrl('nightcall.jpg') },
  { title: 'Starboy', description: 'The Weeknd', image: getImageUrl('starboy.jpg') },
  { title: 'After Hours', description: 'The Weeknd', image: getImageUrl('afterhours.jpg') },
  { title: 'Dark Necessities', description: 'Red Hot Chili Peppers', image: getImageUrl('rhcp.webp') },
  { title: 'Midnight City', description: 'M83', image: getImageUrl('m83.png') }
]

// 3. Track Theme State
const isDark = ref(false)

// Logic to check if <body> has the "dark" class
const updateTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark') || 
                 document.body.classList.contains('dark')
}

// 4. Computed property that switches the content
const displayProjects = computed(() => {
  return isDark.value ? darkProjects : lightProjects
})

// 5. Watch for class changes on the body/html
onMounted(() => {
  updateTheme()
  const observer = new MutationObserver(updateTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  
  // Cleanup observer on unmount
  onUnmounted(() => observer.disconnect())
})
</script>