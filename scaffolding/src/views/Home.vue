<template>
  <div>
    <!-- 顶部导航开始 -->
    <mt-header title="学前端，到学问">
      <div slot="right" class="shortcut" v-if="this.$store.state.isLogined==1">
        <span>您好 {{this.$store.state.userInfo.username}}</span>
        <mt-button @click="logout"> 注销</mt-button>
      </div>
      <div slot="right" v-else class="shortcut">
        <router-link to='/register'>注册</router-link>
        <router-link to='/login'>登录</router-link>
      </div>
    </mt-header>
    <!-- 顶部导航结束 -->
    <!-- 顶部选项卡开始 -->
    <mt-navbar v-model="active">
      <mt-tab-item 
      v-for="(item,index) of category"
      :key="index"
      :id="item.id.toString()">
    {{item.category_name}}
  </mt-tab-item>
    </mt-navbar>
    <!-- 顶部选项卡结束 -->
    <!-- 面版区域开始 -->
    <div class="main"
    infinite-scroll-distance="20"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    :infinite-scroll-immediate-check="true"
    >
      <mt-tab-container >
        <mt-tab-container-item >
          <!-- 单一文章信息开始 -->
          <div class="articleItem" 
          v-for="(article,index) of articles" 
          :key="index">
          <router-link :to="`/article/${article.id}`"></router-link>
            <!-- 文章标题开始 -->
            <div class="articleItem-header">
              {{article.subject}}{{article.id}}
            </div>
            <!-- 文章标题结束 -->
            <!-- 文章图文信息开始 -->
            <div class="articleItem-wrapper">
              <!-- 文章图像开始 -->
              <div class="articleImg" v-if='article.image!=null'>
                <img v-lazy="article.image" alt="">
              </div>
              <!-- 文章图像结束 -->
              <!-- 文章简介开始 -->
              <div class="articleDes">
              {{article.description}}
              </div>
            </div>
          </div>
        </mt-tab-container-item>
       
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="index">
        首页
        <img src="../assets/common/index_enabled.png" alt="" slot="icon" v-if="selectedTab=='index'">
        <img src="../assets/common/index_disabled.png" alt="" slot="icon" v-else>
      </mt-tab-item>
      <mt-tab-item id="index">
        我的
        <img src="../assets/common/me_enabled.png" alt="" slot="icon" v-if="selectedTab=='me'">
        <img src="../assets/common/me_disabled.png" alt="" slot="icon" v-else>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style scoped>
 .shortcut a {
  color: #fff;
  padding-left: 20px;
}
.main {
  margin-bottom: 55px;
}
.articleItem{
  padding:10px 0;
  margin:0 10px;
  border-bottom:1px solid #999;
}
.articleItem-header{
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper{
  display: flex;
  align-items: center;
  padding-top: 10px;
  width:100%;
}
.articleImg{
  margin-right:15px;
}
.articleImg img{
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes{
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return {
      active:"1",
      selectedTab:"index",
      category:[],
      articles:[],
      busy:false,
      page:1,
    };
  },
  methods:{
    

    loadData(cid,page){
      this.$indicator.open({
        text:'加载中·····',
        spinnerType:'fading-circle'
      });
      this.busy=true;
      this.axios.get('/articles?cid='+this.active +'&page=1').then(res=>{
      let data=res.data.results;
      data.forEach(item=>{
          //在文章的图片不为空的情况下才动态加载
          if(item.image != null){
            //属性重新赋值
            item.image = require('../assets/images/articles/' + item.image);      
                        
          }
          //现在在无论是否图片为空都添加到以articles数组中了
          this.articles.push(item);
        });
        // 关闭加载提示框
        this.$indicator.close();
        // 修改busy变量的值
        this.busy=false;
    });
    },
    loadMore(){
      this.$indicator.open('加载中·····');
      this.busy=true;
      this.page++;
      this.loadData(this.active,this.page);
    },
    logout(){
      this.$store.commit('logout_mutations');

    }
  },
  watch:{
    active(value){
      this.articles=[];
      this.page=1;
      this.loadData(this.active,this.page);


    }
  },
  mounted(){
    this.axios.get('/category').then(res=>{
      this.category=res.data.results;
    });
    this.loadData(this.active,this.page);

  }
}
</script>