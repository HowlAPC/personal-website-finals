<template>
  <div class="toggle-container">
    <span>{{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}</span>
    <label class="switch">
      <input type="checkbox" v-model="isDark" @change="toggleTheme">
      <span class="slider round"></span>
    </label>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark-theme')
    localStorage.setItem('theme', 'light')
  }
}

// Check for saved preference on load
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark-theme')
  }
})
</script>

<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
}

/* Simple Toggle Switch Styling */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px; width: 18px;
  left: 3px; bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider { background-color: #42b883; }
input:checked + .slider:before { transform: translateX(26px); }
</style>