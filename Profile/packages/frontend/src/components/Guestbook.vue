<script setup>
import { ref, onMounted } from 'vue';

const name = ref('');
const content = ref('');
const comments = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');

// Fetch comments from NestJS
const fetchComments = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('/api/guestbook');
    if (!response.ok) throw new Error('Failed to fetch comments');
    comments.value = await response.json();
  } catch (err) {
    errorMessage.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Send new comment to NestJS
const submitComment = async () => {
  if (!name.value || !content.value) return;

  try {
    const response = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: name.value, 
        content: content.value 
      }),
    });

    if (response.ok) {
      name.value = '';
      content.value = '';
      await fetchComments(); // Refresh the list
    }
  } catch (err) {
    errorMessage.value = "Couldn't post comment.";
  }
};

onMounted(fetchComments);
</script>

<template>
  <div class="guestbook">
    <h2>Guestbook</h2>
    
    <form @submit.prevent="submitComment" class="form-container">
      <input v-model="name" placeholder="Your Name" required />
      <textarea v-model="content" placeholder="Leave a message..." required></textarea>
      <button type="submit">Post Comment</button>
    </form>

    <div v-if="isLoading">Loading messages...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <div class="comments-list">
      <div v-for="c in comments" :key="c.id" class="comment-item">
        <strong>{{ c.name }}</strong>
        <p>{{ c.content }}</p>
        <small>{{ new Date(c.created_at).toLocaleDateString() }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.guestbook { max-width: 600px; margin: 0 auto; padding: 2rem; }
.form-container { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
input, textarea { padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
button { background: #42b883; color: white; border: none; padding: 0.7rem; cursor: pointer; border-radius: 4px; }
.comment-item { border-bottom: 1px solid #eee; padding: 1rem 0; }
.error { color: red; }
</style>