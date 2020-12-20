import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

import VueRouter from 'vue-router'
import PersonalDetails from "./components/PersonalDetails"
import CommitDetails from "./components/CommitDetails" 
import CommitsList from "./components/CommitsList" 

//import axios from 'axios'
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Antd);

const routes = [
  {
    path: '/',
    name: 'commits-list',
    component: CommitsList
  },
  {
    path: '/commit_details/:sha',
    name: 'commit_details',
    component: CommitDetails,
    props: true
  },
  {
    path: '/personal_details/:login',
    name: 'personal_details',
    component: PersonalDetails,
    props: true
  }
];
const router = new VueRouter({
  routes
})

 new Vue({
   router,
   render: h => h(App, {props: {routes: routes}, router: router}),
  }).$mount('#app')


Vue.config.productionTip = false

