<script setup>
import { ref } from 'vue'
import Guestbook from './components/Guestbook.vue'
import GlitchTitle from './components/GlitchTitle.vue'

const isHovered = ref(false)
const isPermanentlyOpen = ref(false)


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
      <GlitchTitle lightText="Mj Aragon" darkText="Howl!" />
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


.content-row {
  display: grid;
  /* Creates two equal columns */
  grid-template-columns: 1fr 1fr; 
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  align-items: stretch;
}




@media (max-width: 1024px) {
  .content-row {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }
}


.drawer-wrapper {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(calc(100% - 40px));
  display: flex;
  align-items: center;
  z-index: 10000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.drawer-wrapper.is-open {
  transform: translateY(-50%) translateX(0);
}

.drawer-handle {
  width: 40px;
  height: 80px;
  background: var(--text-color);
  color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px 0 0 12px;
  cursor: pointer;
  box-shadow: -2px 0 15px rgba(0,0,0,0.3);
}

.handle-icon {
  font-size: 1.2rem;
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
  padding: 30px; 
  min-width: 350px; 
  min-height: 160px;
  box-shadow: -10px 0 25px rgba(0,0,0,0.3);
  border-radius: 0 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .drawer-wrapper {
    top: 20%;
  }
  .drawer-content {
    min-width: 280px;
    padding: 20px;
  }
}
</style>