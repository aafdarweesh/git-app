<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <!-- <h2  style="color:#ffffff; padding-left:15%;"><strong> Git commit </strong></h2> -->
      </div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1">
          <div @click="goToCommitsList">
            <a-icon type="github"/>
            <span>Home</span>
          </div>
        </a-menu-item>
        <a-menu-item key="2">
          <span>
            <a-input v-model="login" v-on:change="()=> repo = ''" placeholder="login...">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </span>
        </a-menu-item>
        <a-menu-item key="3">
          <span>
            <a-button v-on:click="goTo">
              Submit
            </a-button>
          </span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <div v-if="no_data === false">
          <transition
          name="fade"
          mode="out-in"
          >
            <router-view/> 
          </transition> 
        </div>
        <div v-else style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          <a-spin tip="Loading..."/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import VueRouter from 'vue-router'

import PersonalDetails from "./components/PersonalDetails.vue"
import CommitDetails from "./components/CommitDetails.vue"
import CommitsList from "./components/CommitsList.vue"

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

export default {
  name: 'App',
  components: {
  },
  props: {
      routes: Array,
      router: VueRouter,
  },
  data: () => ({
    no_data: false,
    collapsed: false,
    login: "",
    repo: "",
  }),
  methods: {
    goToPersonalDetails(login){
      router.push('/personal_details/'+login)
      router.go('/personal_details/'+login)
    },
     goToCommitsList(){
        router.push('/')
        router.go('/')
     },
    goTo(){
      this.no_data = false;
      if(this.login != null && this.login != ""){
        this.$root.$data.login = this.login;
        this.goToPersonalDetails(this.login);
      }
      // else{
      //    this.$root.$data.repo = this.repo;
      // //   console.log(this.$root.$data.repo);
      //    this.goToCommitsList(this.repo);
      // }
    }
  },
  // beforeCreate(){
  //   this.goToCommitsList("facebook/react");
  // },
}
</script>

<style>
@import '../node_modules/ant-design-vue/dist/antd.css';
/* .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
} */
.fade-enter, .fade-leave-to{
  transition: translateX(3em);
  opacity: 0;
}
.fade-enter-active, .fade-leave-active{
  transition: all .3s ease;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
