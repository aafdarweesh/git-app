<template>
    <div>
        <div v-if="loadingPage === true" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <a-spin tip="Loading..."/>
        </div>
        <div v-else>
            <a-list item-layout="horizontal" v-bind:data-source="items">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-list-item-meta
                    :description="item.message"
                >
                <a slot="title" @click="goToCommitDetails(item.hash)">{{ item.title }}</a>
                
                <a-avatar
                    size="large"
                    slot="avatar"
                    :src="item.author.avatar_url"
                    icon="user"
                    @click="goToPersonalDetails(item.author.login)"
                >
                
                </a-avatar>
                </a-list-item-meta>
                <div>
                <a-button v-on:click="goToCommitDetails(item.hash)">{{item.hash.substr(0,7)}}</a-button>
                <a-button v-on:click="goToCommitDetails(item.parent_hash)">{{item.parent_hash.substr(0,7)}}</a-button>
                </div>
            </a-list-item>
            </a-list>
            <a-row type="flex" justify="space-around">
                <a-col :span="20">
                <a-pagination v-model="page_number" v-on:change="requester" :total="total_nubmer_of_pages * 10" show-less-items />
                </a-col>
                <a-col :span="4">
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleNumberOfCommitsMenuClick">
                        <a-menu-item key="10"> <a-icon type="diff" />10 commits</a-menu-item>
                        <a-menu-item key="20"> <a-icon type="diff" />20 commits</a-menu-item>
                        <a-menu-item key="30"> <a-icon type="diff" />30 commits</a-menu-item>
                    </a-menu>
                    <a-button style="margin-left: 8px;"> {{commits_per_page}} commits <a-icon type="down" /> </a-button>
                </a-dropdown>
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

import { Pagination, List, Avatar} from 'ant-design-vue';

Vue.component(Pagination.name, Pagination);
Vue.component(List.name, List);
Vue.component(Avatar.name, Avatar);


const routes = [
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
    props: {login:String}
  }
];
const router = new VueRouter({
  routes
})
export default {
  name: 'CommitsList',
  components: {
    PersonalDetails,
    CommitDetails
  },
  props: {
      routes: Array,
      router: VueRouter,
  },
  data: () => ({
      loadingPage: true,
      items:[{
           id:0,
           author: {
             login: "",
             avatar_url: "",
           },
           message: "message",
           title: "",
           hash: "hash",
           parent_hash: "parent_hash",
      }],
      page_number: 1,
      commits_per_page: 30,
      total_nubmer_of_pages: 50,
  }),
  methods: {
      requester: function() {
            var pages_api = "https://api.github.com/repos/facebook/react/stats/commit_activity";
            axios.get(pages_api).then((response) =>{
                var total_pages = 0;
                for(var obj in response.data){
                    total_pages = total_pages + response.data[obj].total;
                }
                this.total_nubmer_of_pages = Math.ceil(total_pages/this.commits_per_page);
            });

            var api = "https://api.github.com/repos/facebook/react/commits?per_page=" + this.commits_per_page.toString() + "&page=" + this.page_number.toString();
            // console.log(api);
            axios.get(api).then((response) => {
                console.log(response.data);
                const restultArray = [];
                for (let obj in response.data) {
                    const commit_time = this.calculate_commit_time(response.data[obj].commit.committer.date);

                    restultArray.push({
                        id: obj,
                        author: { login: response.data[obj].author.login,
                          avatar_url: response.data[obj].author.avatar_url },
                        title: response.data[obj].commit.message.split("\n\n")[0],
                        message: response.data[obj].author.login + ": commited " + commit_time,
                        hash: response.data[obj].sha,
                        parent_hash: response.data[obj].parents[0].sha,
                        });
                }
                this.items = restultArray;
                console.log(this.items);
                this.loadingPage = false;
            });
      },
      calculate_commit_time: function(submitted_date){
        const date1 = Date.parse(submitted_date);
        const date2 = Date.now();
        let commit_time = "";
        const diffTime = Math.abs((date2 - date1)/ 1000);
        if (diffTime < 60 * 60 * 24){
          if (diffTime < 60 * 60){
            if (diffTime < 60){
            commit_time = diffTime.toString() + " secounds ago";
            }else{
            commit_time = Math.ceil(diffTime / (60)).toString() + " minutes ago";
            }
          }else{
            commit_time = Math.ceil(diffTime / (60 * 60)).toString() + " hours ago";
          }
        }else{
          commit_time = Math.ceil(diffTime / (60 * 60 * 24)).toString() + " days ago";
        }
        return commit_time
      },
      goToPersonalDetails(login){
        router.push('/personal_details/'+login)
        router.go('/personal_details/'+login)
      },
      goToCommitDetails(sha){
        router.push('/commit_details/'+sha)
        router.go('/commit_details/'+sha)
      },
      handleNumberOfCommitsMenuClick(e){
          console.log(e.key);
          this.commits_per_page = e.key;
          this.loadingPage = true;
          this.requester();
      }
  },
  beforeMount(){
    this.page_number = 1,
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
