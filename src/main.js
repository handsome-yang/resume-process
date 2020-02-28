import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'normalize.css'
import $ from 'jquery'
window.jQuery = $;
Vue.prototype.$ = $;
import qs from 'qs';
Vue.prototype.$qs = qs;
import plugins from './plugins'
import '../public/plugins/webuploader-0.1.5/webuploader.css'

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
