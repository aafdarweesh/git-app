<template>
    <div>
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view/> 
      </transition> 
    </div>    
</template>

<script>
import VueRouter from 'vue-router'

export default {
  name: 'App',
  components: {
  },
  props: {
      routes: Array,
      router: VueRouter,
      login: String
  },
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
</style>
