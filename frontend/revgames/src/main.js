// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import './axios'
//
// createApp(App).use(router).mount('#app')
//
// new Vue({
//     el: '#app',
//     store,
//     render: h => h(App)
// })
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'


createApp(App).use(router).use(store).mount('#app')
