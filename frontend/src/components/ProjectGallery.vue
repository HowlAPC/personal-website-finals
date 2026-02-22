<template>
  <section class="gallery-container">
    <h2 class="gallery-title">SONGS</h2>
    <div class="project-grid">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
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
import { ref } from 'vue'


const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

const projects = ref([
  {
    title: 'Guess featuring billie eilish',
    description: 'Charli XCX & Billie Eilish',
    image: getImageUrl('bratb.jpg') 
  },
  {
    title: 'BIRDS OF A FEATHER',
    description: 'Billie Eilish',
    image: getImageUrl('billie.jpg') 
  },
  {
    header: 'WILDFLOWER',
    description: 'Billie Eilish',
    image: getImageUrl('billie.jpg')
  },
  {
    title: 'No One Noticed',
    description: 'The Marias',
    image: getImageUrl('maria.webp')
  },
  {
    title: 'So High',
    description: 'Doja Cat',
    image: getImageUrl('song5.jpg')
  }
])
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