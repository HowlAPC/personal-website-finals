<script setup>
import { ref } from 'vue'
import AdminLock from './components/adminlock.vue';

const isExpanded = ref(false)
</script>

<template>
  <div class="app-container">
    <div 
      class="drawer-wrapper" 
      :class="{ 'is-open': isExpanded }"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
    >
      <div class="drawer-handle">
        <span class="handle-icon">⟪</span>
      </div>

      <div class="drawer-content">
        <AdminLock />
      </div>
    </div>

    <main>
      <UserBio />
      <info-block />
      <ProjectGallery />
    </main>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  padding: 20px;
}

/* 1. THE DRAWER CONTAINER */
.drawer-wrapper {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%) translateX(calc(100% - 30px)); /* Hide most of it */
  display: flex;
  align-items: center;
  z-index: 10000;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 2. THE EXPANDED STATE */
.drawer-wrapper.is-open {
  transform: translateY(-50%) translateX(0); /* Slide fully into view */
}

/* 3. THE VISIBLE TAB (Handle) */
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
  transform: rotate(180deg); /* Flip the arrow when open */
}

/* 4. THE HIDDEN PANEL */
.drawer-content {
  background: var(--bg-color);
  border: 1px solid var(--text-color);
  border-right: none;
  padding: 15px;
  min-width: 200px;
  box-shadow: -5px 0 15px rgba(0,0,0,0.2);
  border-radius: 0 0 0 8px;
}

/* Responsive adjustment */
@media (max-width: 768px) {
  .drawer-wrapper {
    /* On mobile, keep it at the top right instead of middle */
    top: 20%;
  }
}
</style>