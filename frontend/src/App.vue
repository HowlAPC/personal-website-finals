<script setup>
// No imports needed here anymore!
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <ThemeToggle />
    </nav>

    <main>
      <UserBio />
    </main>
  </div>
</template>

<style>
.app-container {
  min-height: 100vh;
  padding: 20px;
}
.navbar {
  display: flex;
  justify-content: flex-end;
}
</style>