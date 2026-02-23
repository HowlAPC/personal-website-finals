<template>
  <section class="bio-card">
    <header class="bio-header">
      <h2>About Me</h2>
      <span class="subtitle">Silent and restless</span>
    </header>
    <div class="bio-content">
      <p>
        Hey, I'm Mj Aragon. I'm a 2nd year college student under BSIT studying in
        Asia Pacific College.
      </p>
    </div>
  </section>
</template>

<style scoped>
.bio-card {
  
  width: 90%; 
  max-width: 1000px; 
  
  margin: 2rem auto;
  padding: 3rem; /* Increased padding for a more professional look */
  border-radius: 16px;
  background-color: var(--bg-color);
  border: 1px solid var(--text-color);
  transition: all 0.3s ease;
  
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.bio-header h2 {
  font-size: 2.5rem; 
  margin-bottom: 0.5rem;
}

.bio-content p {
  font-size: 1.2rem; 
  line-height: 1.8;
}
</style>