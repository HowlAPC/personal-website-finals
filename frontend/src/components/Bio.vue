<template>
  <section class="bio-card">
    <header class="bio-header">
      <h2>About Me</h2>
      <span class="subtitle">Frontend Developer & Creator</span>
    </header>
    <div class="bio-content">
      <p>
        Hi! I'm building this site using Vue 3 and Vite, hosted on Vercel. 
        I'm passionate about clean code, dark mode toggles, and learning 
        new web technologies in GitHub Codespaces.
      </p>
    </div>
  </section>
</template>

<style scoped>
.bio-card {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  /* This uses the variables from your global CSS */
  background-color: var(--bg-color);
  border: 1px solid var(--text-color);
  transition: all 0.3s ease;
}

.bio-header h2 {
  margin-top: 0;
  color: var(--accent-color, #42b883); /* Falls back to green if accent isn't defined */
}

.subtitle {
  font-weight: bold;
  opacity: 0.8;
  display: block;
  margin-bottom: 1rem;
}

.bio-content p {
  line-height: 1.6;
  margin-bottom: 0;
}
</style>