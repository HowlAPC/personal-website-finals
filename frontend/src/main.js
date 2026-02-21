import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 1. Import your components
import ThemeToggle from './components/ThemeToggle.vue'
import UserBio from './components/Bio.vue'

const app = createApp(App)

// 2. Register them globally
// The first argument is the 'name' you use in your HTML tags
app.component('ThemeToggle', ThemeToggle)
app.component('UserBio', UserBio)

app.mount('#app')