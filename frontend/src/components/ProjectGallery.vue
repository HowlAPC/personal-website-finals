<template>
  <section class="gallery-container">
    <h2 class="gallery-title">Songs</h2>
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

const projects = ref([
  {
    title: 'Cyber Deck',
    description: 'A custom frontend build.',
    image: 'https://picsum.photos/seed/tech/400/600'
  },
  {
    title: 'Neon Vault',
    description: 'Secure protection interface.',
    image: 'https://picsum.photos/seed/cyber/400/600'
  },
  {
    title: 'Bio-Link',
    description: 'Minimalist bio component.',
    image: 'https://picsum.photos/seed/code/400/600'
  },
  {
    title: 'Data Stream',
    description: 'Real-time analytics feed.',
    image: 'https://picsum.photos/seed/data/400/600'
  },
  {
    title: 'Void Shell',
    description: 'Terminal-based UI kit.',
    image: 'https://picsum.photos/seed/terminal/400/600'
  }
])
</script>

<style scoped>
.gallery-container {
  width: 100%;
  padding: 2rem 0;
  max-width: 1200px; /* Optional: keeps the 5-wide grid from getting too stretched */
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
  /* Changes: 
     1. Lowered minmax to 180px so 5 cards can fit side-by-side. 
     2. Forces 5 columns on desktop while staying responsive.
  */
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--bg-color);
  border: 1px solid var(--text-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* Ensure the card itself is tall */
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 15px var(--text-color);
}

.image-wrapper {
  width: 100%;
  /* Change: Increased height relative to width. 
     Using aspect-ratio ensures it stays taller than wide.
  */
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
  font-size: 1rem; /* Smaller font to fit smaller cards */
  text-transform: uppercase;
}

.card-content p {
  font-size: 0.8rem; /* Smaller font to fit smaller cards */
  line-height: 1.3;
  margin: 0;
  opacity: 0.8;
}

/* Force 5 columns on larger screens specifically */
@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>