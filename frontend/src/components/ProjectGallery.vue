<template>
  <section class="gallery-container">
    <h2 class="gallery-title">{{ isDark ? 'DARKER SONGS' : 'SONGS' }}</h2>
    
    <div class="project-grid">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <div class="image-wrapper">
          <img 
            :src="isDark && project.darkImage ? project.darkImage : project.image" 
            :alt="project.title"
            :class="{ 'is-active-theme': isDark }"
          />
        </div>
        <div class="card-content">
          <h3>{{ isDark ? project.darkTitle : project.title }}</h3>
          <p>{{ isDark ? project.darkDescription : project.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

const projects = ref([
  {
    title: 'Guess featuring billie eilish',
    darkTitle: 'Drown in Your Love',
    description: 'Charli XCX & Billie Eilish',
    darkDescription: 'ORGAVSM',
    image: getImageUrl('bratb.jpg'),
    darkImage: getImageUrl('dro.png')
  },
  {
    title: 'BIRDS OF A FEATHER',
    darkTitle: 'BABYDOLL',
    description: 'Billie Eilish',
    darkDescription: 'Ari Abdul',
    image: getImageUrl('billie.jpg'),
    darkImage: getImageUrl('doll.webp') 
  },
  {
    title: 'WILDFLOWER', 
    darkTitle: "I'll Do It",
    description: 'Billie Eilish',
    darkDescription: 'Heidi Montag',
    image: getImageUrl('billie.jpg'),
    darkImage: getImageUrl('heidi.png')
  },
  {
    title: 'No One Noticed',
    darkTitle: 'Love POtions',
    description: 'The Marias',
    darkDescription: 'BJ Lips & princess paparazzi',
    image: getImageUrl('maria.webp'),
    darkImage: getImageUrl('potion.jpg')
  },
  {
    title: 'So High',
    darkTitle: 'ecstacy',
    description: 'Doja Cat',
    darkDescription: 'SUICIDAL-IDOL',
    image: getImageUrl('doja.png'),
    darkImage: getImageUrl('idol.png')
  }
])


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
.gallery-container {
  width: 100%;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-title {
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 2rem;
  letter-spacing: 5px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--bg-color);
  border: 1px solid var(--text-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 15px var(--text-color);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 2 / 3; 
  overflow: hidden;
  border-bottom: 1px solid var(--text-color);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.image-wrapper img.is-active-theme {
  filter: grayscale(0%);
}

.project-card:hover img {
  filter: grayscale(0%);
}

.card-content {
  padding: 1rem;
  flex-grow: 1;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1rem;
  text-transform: uppercase;
}

.card-content p {
  font-size: 0.8rem;
  line-height: 1.3;
  margin: 0;
  opacity: 0.8;
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>