<template>
    <div>
      <router-view/>  
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
</style>
