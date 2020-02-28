import Vue from 'vue';
import { Toast, Loading, Dialog } from 'vant';
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
Vue.prototype.$loading = Loading;