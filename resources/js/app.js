
require('./bootstrap');
window.Vue = require('vue').default;


Vue.component('app-component', require('./components/App.vue').default);
Vue.component('navbar-component', require('./components/parts/Navbar.vue').default);
Vue.component('posts-component', require('./components/pages/posts/Index.vue').default);

const app = new Vue({
    el: '#app',
});
