<template>
  <div class="resources-wrapper" :class="{ 'chaotic-mode': isDark }">
    <h2 class="section-main-title">{{ isDark ? 'DATA_CLUSTERS' : 'Resource Directory' }}</h2>
    
    <div v-for="(category, catIndex) in groupedResources" :key="catIndex" class="category-group">
      <h3 class="category-header">
        <span class="category-decor">//</span> {{ isDark ? category.id : category.name }}
      </h3>

      <div class="resource-grid">
        <div 
          v-for="(item, index) in category.items" 
          :key="index"
          class="resource-node"
          :class="{ 'is-active': activeId === `${catIndex}-${index}` }"
          @click="toggleNode(catIndex, index)"
        >
          <div class="node-header">
            <span class="node-status"></span>
            <span class="node-label">{{ item.title }}</span>
            <span class="node-toggle">{{ activeId === `${catIndex}-${index}` ? '−' : '+' }}</span>
          </div>

          <Transition name="expand">
            <div v-if="activeId === `${catIndex}-${index}`" class="node-content">
              <p>{{ item.description }}</p>
              <a :href="item.link" target="_blank" class="node-link">
                {{ isDark ? 'ESTABLISH_CONNECTION >' : 'Open Link →' }}
              </a>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)
const activeId = ref(null)

// Organized Data Structure
const groupedResources = [
  {
    name: 'Inspirations',
    id: 'Inspirations',
    items: [
      { title: 'Arknights: Endfield', description: 'Theme and visuals', link: '#' },
      { title: 'XXL WOOFIA', description: 'The switching to a different theme...Access code "HOWL"', link: '#' }
    ]
  },
  {
    name: 'Development Tools',
    id: 'TECH_STACK',
    items: [
      { title: 'Vue', description: 'The progressive framework for building interfaces.', link: '#' },
      { title: 'NestJS', description: 'Used for connecting to Supabase', link: '#' },
      { title: 'Supabase', description: 'Database for storing comments', link: '#' },
      { title: 'Gemini', description: 'Coding assistance', link: '#' },


    ]
  }
]

const toggleNode = (catIndex, index) => {
  const id = `${catIndex}-${index}`
  activeId.value = activeId.value === id ? null : id
}

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
.resources-wrapper {
  width: 100%;
  max-width: 800px;
  margin: 4rem auto;
  font-family: 'Courier New', Courier, monospace;
}

.section-main-title {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  letter-spacing: 6px;
  color: var(--text-color);
  text-align: center;
  text-transform: uppercase;
}

/* --- CATEGORY STYLING --- */
.category-group {
  margin-bottom: 2.5rem;
}

.category-header {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1rem;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.category-decor {
  color: var(--accent-color);
  font-weight: bold;
}

/* --- GRID & NODES --- */
.resource-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resource-node {
  border: 1px solid rgba(var(--text-color-rgb), 0.2);
  background: rgba(var(--text-color-rgb), 0.02);
  cursor: pointer;
  transition: all 0.2s ease;
}

.node-header {
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.node-status {
  width: 6px;
  height: 6px;
  background: var(--text-color);
  border-radius: 50%;
  opacity: 0.4;
}

.node-label {
  flex-grow: 1;
  font-weight: bold;
  font-size: 0.9rem;
}

.node-content {
  padding: 0 18px 18px 36px;
  border-top: 1px solid rgba(var(--text-color-rgb), 0.05);
  padding-top: 15px;
}

.node-content p {
  font-size: 0.85rem;
  margin-bottom: 12px;
  opacity: 0.7;
}

.node-link {
  color: var(--accent-color);
  text-decoration: none;
  font-size: 0.75rem;
  border: 1px solid var(--accent-color);
  padding: 4px 8px;
}

.chaotic-mode .category-header {
  text-shadow: 2px 2px 0px rgba(var(--text-color-rgb), 0.1);
  animation: jitter-mini 4s infinite;
}

.chaotic-mode .resource-node.is-active {
  border-color: var(--text-color);
  background: rgba(var(--text-color-rgb), 0.05);
}

@keyframes jitter-mini {
  0%, 98%, 100% { transform: none; }
  99% { transform: translateX(2px) skewX(2deg); }
}

.expand-enter-active, .expand-leave-active {
  transition: all 0.25s ease;
  max-height: 200px;
}
.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>