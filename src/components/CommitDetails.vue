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
              @click="goToPersonalDetails(login)"
            />
            <a-card-meta :title="name" :description="login">
              <a-icon type="shop"/>
            </a-card-meta>
          </a-card>
        </a-col>
        <a-col :span="15">
          <a-card>
            <div>
              <h2><strong>{{title}}</strong> </h2>
              <h3>{{message}}</h3>
              <a-icon type="github"></a-icon> <a :href="rep_url">commit link</a>
            </div>
          </a-card>
          <br />
          <a-card>
            <div>
            <h3> 
              Showing  <strong>{{list_of_files.length}} Changed</strong> files with 
              <strong>{{stats.additions}}</strong> additions and <strong>{{stats.deletions}}</strong> deletions.
            </h3>
            
              <h2><strong>List of Modified files: </strong></h2>
            </div>
            <div v-for="(file, index) in list_of_files" v-bind:key="index">
              <a-timeline-item>
                <strong> {{file.filename}} </strong>
                <a-icon type="plus-circle"></a-icon> {{file.additions}}
                <a-icon type="minus-circle"></a-icon> {{file.deletions}}
              </a-timeline-item>
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
  name: 'CommitDetails',
  components: {
    CommitDetails
    
  },
  props: {
      sha: String,
  },
  data: () => ({
      loadingPage: true,
      name: "null",
      message: "",
      title: "",
      avatar_url: "",
      rep_url: "",
      login: "",
      stats:{
      },
      list_of_files: [],
  }),
  methods: {
      requester: function() {
            var api = "https://api.github.com/repos/facebook/react/commits/" + this.sha.toString();
            axios.get(api).then((response) => {
                console.log(response.data);
                this.name = response.data.commit.author.name;
                this.stats = response.data.stats;
                this.avatar_url = response.data.author.avatar_url;
                this.rep_url = response.data.html_url;
                this.login = response.data.author.login;
                this.title= response.data.commit.message.split("\n\n")[0]
                this.message = response.data.commit.message.substr(this.title.length, response.data.commit.message.length);
                var files = [];
                for(var file in response.data.files){
                  files.push({
                    filename: response.data.files[file].filename,
                    additions: response.data.files[file].additions,
                    deletions: response.data.files[file].deletions,
                  });
                };
                console.log(files);
                this.list_of_files = files;
                this.loadingPage = false;
        });
      },
      goToPersonalDetails(login){
        router.push('/personal_details/'+login)
        router.go('/personal_details/'+login)
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
