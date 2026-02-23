<template>
  <section class="guestbook-container">
    <h2 class="guestbook-title" data-text="TERMINAL_GUESTBOOK">TERMINAL_GUESTBOOK</h2>

    <form @submit.prevent="submitEntry" class="sign-form">
      <div class="input-wrapper">
        <input v-model="form.name" placeholder="IDENT_NAME" required />
        <textarea v-model="form.message" placeholder="WRITE_MESSAGE..." required></textarea>
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'SENDING~' : 'ADD COMMENT' }}
      </button>
    </form>

    <div class="entries-list">
      <div v-for="entry in entries" :key="entry.id" class="entry-card">
        <div class="entry-meta">
          <span class="entry-author">USR: {{ entry.name }}</span>
          <span class="entry-date">{{ new Date(entry.created_at).toLocaleDateString() }}</span>
        </div>
        <p class="entry-msg">{{ entry.message }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
  background: rgba(var(--text-color), 0.05);
  border: 1px solid var(--text-color);
  font-family: 'Courier New', Courier, monospace;
}

.guestbook-title {
  color: var(--text-color);
  letter-spacing: 5px;
  margin-bottom: 2rem;
  text-align: center;
}

.sign-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
}

input, textarea {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--text-color), 0.3);
  color: var(--text-color);
  padding: 12px;
  outline: none;
}

button {
  background: var(--text-color);
  color: var(--bg-color);
  border: none;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  filter: brightness(1.2);
  box-shadow: 0 0 15px var(--text-color);
}

.entry-card {
  border-left: 2px solid var(--text-color);
  background: rgba(var(--text-color), 0.02);
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.entry-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.6;
  margin-bottom: 0.5rem;
}
</style>