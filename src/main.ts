import './assets/main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Terms from './pages/Terms.vue'
import Privacy from './pages/Privacy.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/terms', component: Terms },
    { path: '/privacy', component: Privacy },
]

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, router, routes, isClient, initialState }) => {
        // ...
    },
)
