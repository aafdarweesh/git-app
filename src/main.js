import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import VueRouter from 'vue-router'
import PersonalDetails from "./components/PersonalDetails"
import CommitDetails from "./components/CommitDetails" 
import CommitsList from "./components/CommitsList" 

//import axios from 'axios'
Vue.use(VueRouter)
Vue.use(Antd);

const routes = [
  {
    path: '/',
    name: 'commits-list',
    component: CommitsList,
    props: true
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
   data: () => ({
      login: "",
      repo: "facebook/react",
   }),
   render: h => h(App),
  }).$mount('#app')


Vue.config.productionTip = false

