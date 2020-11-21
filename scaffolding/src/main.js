import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment';
Vue.prototype.moment = moment;
Vue.prototype.qs=qs;
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.min.css';
Vue.use(MintUI);
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.axios = axios;
Vue.prototype.limitWords=function(value){
  // value=value.replace(/^<img src="[a-z]+:\/\/[a-zA-Z0-9./]+[\da-zA-Z\-]+[.a-z]"+\/src>+$/g,'');
  // value=value.replace(/^[a-zA-Z0-9_u4e00-u9fa5]+$/g,'');
  value=value.replace(/<br>+/,'');
  if (!value) return "";
      if (value.length > 50) {
        return value.slice(0, 170) + "···";
      }
      return value;

}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
