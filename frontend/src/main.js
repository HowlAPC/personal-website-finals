import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// 1. Import your components
import ThemeToggle from './components/ThemeToggle.vue'
import UserBio from './components/Bio.vue'
import AdminLock from './components/adminlock.vue'
import ProjectGallery from './components/ProjectGallery.vue'
import InfoBlock from './components/InfoBlock.vue'
import DistrictBlock from './components/DistrictBlock.vue'
import Guestbook from './components/Guestbook.vue'

const app = createApp(App)

// 2. Register them globally
app.component('ThemeToggle', ThemeToggle)
app.component('UserBio', UserBio)
app.component('AdminLock', AdminLock)
app.component('ProjectGallery', ProjectGallery)
app.component('InfoBlock', InfoBlock)
app.component('DistrictBlock', DistrictBlock)
app.component('Guestbook', Guestbook)

app.mount('#app')