<template>
  <div class="lock-container">
    <div v-if="!isUnlocked && !isTransitioning" class="password-box">
      <input 
        type="password" 
        v-model="passwordInput" 
        placeholder="ENTER ACCESS CODE..." 
        @keyup.enter="checkPassword"
        :class="{ 'error-shake': loginError }"
      />
      <button @click="checkPassword">UNLOCK</button>
    </div>

    <div v-else-if="isTransitioning" class="decoding-text">
      <span class="glitch-flicker">That's right ;P</span>
    </div>

    <div v-else class="unlocked-content">
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const passwordInput = ref('')
const isUnlocked = ref(false)
const isTransitioning = ref(false)
const loginError = ref(false)

const SECRET_PASS = 'AD' 

const checkPassword = () => {
  if (passwordInput.value === SECRET_PASS) {
    // Start the brief text phase
    isTransitioning.value = true
    passwordInput.value = ''
    
    // After 1.5 seconds, show the actual toggle
    setTimeout(() => {
      isTransitioning.value = false
      isUnlocked.value = true
    }, 500)
    
  } else {
    loginError.value = true
    passwordInput.value = ''
    setTimeout(() => { loginError.value = false }, 500)
  }
}
</script>

<style scoped>
.lock-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-height: 50px;
}

.password-box {
  display: flex;
  gap: 10px;
}

input {
  background: #000;
  border: 1px solid var(--text-color);
  color: var(--text-color);
  padding: 5px 10px;
  font-family: 'Courier New', monospace;
  outline: none;
}

button {
  background: var(--text-color);
  color: var(--bg-color);
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: bold;
}

/* Decoding Text Styles */
.decoding-text {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: var(--text-color);
  letter-spacing: 2px;
}

.glitch-flicker {
  animation: flicker 0.15s infinite alternate;
}

.unlocked-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Animations */
@keyframes flicker {
  0% { opacity: 1; }
  100% { opacity: 0.4; transform: skewX(5deg); }
}

.error-shake {
  animation: shake 0.2s ease-in-out 0s 2;
  border-color: #ff003c !important;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}
</style>