<script setup>
import { ref } from 'vue'
import Guestbook from './components/Guestbook.vue'

const isHovered = ref(false)
const isPermanentlyOpen = ref(false)

// Logic to keep the drawer out after the password is correct
const handleUnlock = () => {
  isPermanentlyOpen.value = true
}
</script>

<template>
  <div class="app-container">
    <div 
      class="drawer-wrapper" 
      :class="{ 'is-open': isHovered || isPermanentlyOpen }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="drawer-handle">
        <span class="handle-icon">⟪</span>
      </div>

      <div class="drawer-content">
        <AdminLock @unlocked="handleUnlock" />
      </div>
    </div>

    <main>
      <UserBio />
      <ProjectGallery />
      <div class="content-row">
        <InfoBlock /> 
        <DistrictBlock />
        
      </div>
      <Guestbook />
      

      
    </main>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  padding: 20px;
}

/* --- GRID SYSTEM --- */
.content-row {
  display: grid;
  /* Creates two equal columns */
  grid-template-columns: 1fr 1fr; 
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  align-items: stretch;
}



/* Stacks blocks vertically on small screens */
@media (max-width: 1024px) {
  .content-row {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}

/* --- DRAWER STYLES --- */
.drawer-wrapper {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(calc(100% - 30px));
  display: flex;
  align-items: center;
  z-index: 10000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.drawer-wrapper.is-open {
  transform: translateY(-50%) translateX(0);
}

.drawer-handle {
  width: 30px;
  height: 60px;
  background: var(--text-color);
  color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  box-shadow: -2px 0 10px rgba(0,0,0,0.3);
}

.handle-icon {
  font-weight: bold;
  transition: transform 0.3s;
}

.drawer-wrapper.is-open .handle-icon {
  transform: rotate(180deg);
}

.drawer-content {
  background: var(--bg-color);
  border: 1px solid var(--text-color);
  border-right: none;
  padding: 20px;
  min-width: 280px; /* Fixed width to prevent jumping */
  min-height: 120px;
  box-shadow: -5px 0 15px rgba(0,0,0,0.2);
  border-radius: 0 0 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .drawer-wrapper {
    top: 20%;
  }
}
</style>