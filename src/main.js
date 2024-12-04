import { createApp } from 'vue';
import App from './App.vue';

// Import Main CSS
import './assets/main.css';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

// Use Plugin or Library

// Mount App
app.mount('#app')
