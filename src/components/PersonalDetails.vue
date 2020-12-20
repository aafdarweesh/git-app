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
import PersonalDetails from "./PersonalDetails.vue"
import CommitDetails from "./CommitDetails.vue"
import App from "../App.vue"

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
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
  name: 'PersonalDetails',
  components: {
    PersonalDetails
    
  },
  props: {
      login: String,
  },
  data: () => ({
      loadingPage: true,
      // collapsed: false,
      name: "null",
      // company: "null",
      avatar_url: "null",
      // email: "null",
      // location: "null",
      // public_repos_counter: "null",
      // followers: "null",
      // following: "null",
      // created_at: "null",
      // updated_at: "null",
      items:{
        // following: "null",
        // created_at: "null",
        // updated_at: "null",
      },
  }),
  methods: {
      requester: function() {
            var api = "https://api.github.com/users/" + this.login.toString();
            axios.get(api).then((response) => {
                console.log(response.data);
                this.name = response.data.name;
                // this.company = response.data.company;
                this.avatar_url = response.data.avatar_url;
                // this.public_repos_counter = response.data.public_repos_counter;
                // this.followers = response.data.followers  === null ? "null" : response.data.location;
                // this.following = response.data.following  === null ? "null" : response.data.location;
                // this.created_at = response.data.created_at  === null ? "null" : response.data.location;
                // this.updated_at = response.data.updated_at  === null ? "null" : response.data.location;
                // this.location = response.data.location === null ? "null" : response.data.location;

                this.items = response.data;
                this.loadingPage = false;
        });
      },
  },
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
