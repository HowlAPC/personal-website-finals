<template>
  <div class="guestbook-container">
    <h2 class="guestbook-title">GUESTBOOK</h2>
    
    <form @submit.prevent="handleSubmit" class="sign-form">
      <input v-model="name" type="text" placeholder="NAME / ALIAS" required />
      
      <div class="textarea-wrapper">
        <textarea 
          v-model="message" 
          placeholder="LEAVE A MESSAGE..." 
          maxlength="200"
          required
        ></textarea>
        <div class="char-counter" :class="{ 'at-limit': message.length >= 200 }">
          {{ message.length }} / 200_BYTES
        </div>
      </div>

      <button type="submit">TRANSMIT_DATA</button>
    </form>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const name = ref('')
const message = ref('')

const entries = ref([]);
const loading = ref(false);
const form = ref({ name: '', message: '' });

const fetchEntries = async () => {
  try {
  
    const res = await fetch('/api/guestbook');
    if (!res.ok) throw new Error('Network response was not ok');
    entries.value = await res.json();
  } catch (e) {
    console.error("Fetch failed", e);
  }
};

const submitEntry = async () => {
  loading.value = true;
  try {
  
    const res = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });
    
    if (res.ok) {
      form.value = { name: '', message: '' };
      await fetchEntries();
    }
  } catch (e) {
    console.error("Transmission failed", e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchEntries);
</script>

<style scoped>
.guestbook-container {
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid var(--text-color);
  font-family: 'Courier New', Courier, monospace;
}

.guestbook-title {
  color: var(--text-color);
  letter-spacing: 5px;
  margin-bottom: 2rem;
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.sign-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

.textarea-wrapper {
  position: relative;
  width: 100%;
}

input, textarea {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--text-color);
  color: var(--text-color);
  padding: 12px;
  outline: none;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;
}

/* FIXED SIZE MESSAGE BOX */
textarea {
  min-height: 150px;
  max-height: 150px;
  resize: none;
  padding-bottom: 30px; /* Space for the counter */
}

.char-counter {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 0.7rem;
  opacity: 0.5;
  pointer-events: none;
}

.char-counter.at-limit {
  color: #ff0000;
  opacity: 1;
  animation: flicker 0.2s infinite;
}

button {
  background: var(--text-color);
  color: var(--bg-color);
  border: none;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  text-transform: uppercase;
  letter-spacing: 2px;
}

button:hover {
  filter: brightness(1.2);
  box-shadow: 0 0 15px var(--text-color);
}

.entry-card {
  border-left: 2px solid var(--text-color);
  background: rgba(128, 128, 128, 0.02);
  padding: 1rem;
  margin-bottom: 1.5rem;
  word-wrap: break-word;
}

.entry-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}

@keyframes flicker {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* MOBILE RESPONSIVENESS */
@media (max-width: 600px) {
  .guestbook-container {
    margin: 2rem 10px;
    padding: 1rem;
  }
  
  .entry-meta {
    flex-direction: column;
    gap: 5px;
  }
}
</style>