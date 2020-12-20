<template>
  <div>
    <div v-if="loadingPage === true" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <a-spin tip="Loading..."/>
    </div>
    <div v-else>
      <a-row type="flex" justify="space-around">
        <a-col :span="7">
          <a-card hoverable>
            <img
              slot="cover"
              alt="example"
              :src="avatar_url"
            />
            <a-card-meta :title="name" :description="login">
              <a-icon type="shop"/>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="15">
          <a-card hoverable>
            <h2>Personal Details:</h2>
            <br/>
            <div v-for="(value, name) in items" v-bind:key="name">
              <a-timeline-item> <strong> {{name}} </strong> : {{value}} </a-timeline-item>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueRouter from 'vue-router'

// Will be used for redirection.
const router = new VueRouter()


export default {
  name: 'PersonalDetails',
  components: {    
  },
  props: {
      login: String,
  },
  data: () => ({
      loadingPage: true,
      name: "null",
      avatar_url: "null",
      items:{
        // following: "null",
        // created_at: "null",
        // updated_at: "null",
      },
  }),
  methods: {
      // Requesting the Commit details from the Github API
      requester: function() {
            var api = "https://api.github.com/users/" + this.login.toString();
            axios.get(api).then((response) => {
                console.log(response.data);
                this.name = response.data.name;
                this.avatar_url = response.data.avatar_url;
                this.items = response.data;
                this.loadingPage = false;
        });
      },
  },
  // Upon Mounting
  beforeMount(){
    this.requester()
  },
}
</script>
<style>
@import '../../node_modules/ant-design-vue/dist/antd.css';
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
