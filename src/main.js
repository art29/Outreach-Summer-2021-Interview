import { createApp } from 'vue';
import vueDebounce from 'vue-debounce';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(vueDebounce)
  .mount('#app');
