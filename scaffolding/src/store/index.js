import Axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {MessageBox} from 'mint-ui'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined:localStorage.getItem('isLogined') || 0,
    userInfo:JSON.parse(localStorage.getItem('userInfo')) || {},
    username:'tom',
    age:23,
    sex:true,
    products:[
      {
        productName:'AA1',
        salePrice:100
      },
      {
        productName:'BB2',
        salePrice:200
      },
      {
        productName:'CCCC',
        salePrice:300
      },
      {
        productName:'DDD',
        salePrice:400
      }
    ]
  },
  mutations: {
    changeAge(state){
      state.age++;
    },
    addProduct(state,payload){
      console.log(state);
      console.log(payload);
      state.products.push(payload);

    },
    //登录
    login_mutations(state,payload){
      state.isLogined=1;
      state.userInfo=payload;
    },
    // 注销
    logout_mutations(state){
      state.isLogined=0;
      state.userInfo={};
      localStorage.clear();
    }
  },
  actions: {
    getServerDate(context){
      axios.get('/data').then(res=>{
        console.log(res.data.results);
      })
    },
    login_actions(context,payload){
      axios.post('/login',payload).then(res=>{
        if(res.data.code==1){
          context.commit('login_mutations',res.data.userInfo);
          localStorage.setItem('isLogined',1);
          localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
          router.push('/');
        }else {
          MessageBox('登录提示','用户名或者密码错误');
        }
      })
    }
  },
  modules: {
  }
})
