import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import Home from './pages/Home.vue'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import zhTW from './locales/zh-TW.json'

/* add icons to the library */
library.add(faUserSecret)

const routes = [
    { path: '/', component: Home },
    { path: '/zh-CN', component: Home },
    { path: '/zh-TW', component: Home },
]

export const createApp = ViteSSG(
    App,
    { routes },
    ({ app, router, routes, isClient, initialState }) => {
        const i18n = createI18n({
            legacy: false,
            locale: 'en', // Default locale
            messages: {
                en,
                'zh-CN': zhCN,
                'zh-TW': zhTW
            }
        })

        app.use(i18n)
        app.component('font-awesome-icon', FontAwesomeIcon)

        router.beforeEach((to, from, next) => {
            const path = to.path
            if (path.startsWith('/zh-CN')) {
                i18n.global.locale.value = 'zh-CN'
            } else if (path.startsWith('/zh-TW')) {
                i18n.global.locale.value = 'zh-TW'
            } else {
                i18n.global.locale.value = 'en'
            }
            next()
        })
    },
)
