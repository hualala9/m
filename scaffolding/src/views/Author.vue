<template>
    <div id="overbody">
        <!-- 头部边框开始 -->
        <div>
            <mt-header title="作者">
                <router-link to="/" slot="left">
                  <mt-button icon="back">返回</mt-button>
                </router-link>
                <mt-button icon="more" slot="right"></mt-button>
              </mt-header>
        </div>
        <!-- 头部边框结束 -->
        <!-- 作者信息开始 -->
        <div id="author-info">  
            <div class="author-info-left">
                <!-- 作者头像 -->
                <img :src="authorImage" class="author-info-avatar">
                <div class="author-isstar">是否关注♥</div>
            </div>
                <!-- 作者基本信息 -->
            <div class="author-info-right">
                <div class="author-info-nickname">{{author.nickname}}</div>
                <div class="author-info-id">作者id:{{author.author_id}}</div> 
                <div class="author-info-username">作者用户名为:{{author.username}}</div> 
                <div class="author-info-badge">
                    共发表<mt-badge type="primary" size="small">{{author.article_number}}</mt-badge>篇文章  
                </div>
                <div class="author-info-star">获取的⭐为</div>            
            </div>
            <!-- 作者信息结束 -->     
        </div>

        <!-- 文章信息开始 -->
        <div id="essayBox">
            <!-- 单一文章开始 -->
        <div v-for="(article,index) of articleInfo" :key="index" class="essay">
            <!-- 文章的作者信息 -->
            <div class="articleAuthor">
              <div class="articleAuthor-image">
                <img :src="authorImage">
              </div>
              <div class="articleAuthor-right">
                <div class="articleAuthor-nickname">{{author.nickname}}</div>
                 <div class="articleAuthor-created_at">{{moment.unix(article.created_at).format('Y年MM月DD日HH:mm')}}  发表了此文章</div>
            </div>
            </div>
            <!-- 文章栏的信息 -->
            <div class="essay-detail">
                <div class="essay-detail-subject">{{article.subject}}</div> 
                    <router-link :to="`/article/${article.article_id}`">
                    <div class="essay-detail-content" v-html="limitWords(article.content)"></div>
                </router-link>
   
                <div class="essay-detail-bottom">
                    <div class="essay-detail-id" >文章id：{{article.article_id}}</div>
                    <div class="essay-detail-star">点赞数：  ⭐</div>
                </div>
                <!-- 评论区域 -->
                <div class="essay-detail-discuss">
                    <div class="essay-discuss-title">我也来说两句</div>
                    <input type="text" class="essay-comment" placeholder="写下你的评论" v-model="discuss[index]" >
                    <button class="essay-detail-submit" @click="submit(index,it)">评论</button>
                    <div class="essay-discuss-list">
                        <div v-for="(discu,i) of article.disList" :key="i" class="discuss-list">
                            {{discu}}+{{i}}
                            <span  class="discuss-delete" @click="deleteList(article.article_id,discussList[i].num)">删除</span>
                            </div>
                        
                    </div>



                </div>
                
            </div>
            
        </div>
        
        <!-- 文章信息结束 -->
        
    </div>
</div>
</template>
<style scoped>
#overbody {
    background-color: whitesmoke;
}
 #author-info{
    display: flex;
    margin-bottom: 5px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
}
.author-info-left{
    width:35%;
}
.author-info-avatar{
    width:80px;
    height: 80px;
    border-radius: 100%;
    padding:20px;

}
.author-isstar{
    width:80px;
    padding-left:15px;
}
.author-info-right{
    width:65%;
}
.author-info-right div{
    padding-bottom:5px;
    font-size: 15px;
}
.author-info-detail{
    height:80px;
    width:200px;
    margin-left:15px;
}
#essayBox {
    margin-top:5px;
    background-color: whitesmoke;
}
.essay{
    margin-bottom:8px;
    padding:10px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background-color:white;
    border:1px solid whitesmoke;
}
.articleAuthor {
    height:50px;
    display: flex;
}
.articleAuthor div{
    padding-right:8px;
    font-size:12px;
}
.articleAuthor-image img{
    width:35px;
    height:35px;
    border-radius:100%;
}
.articleAuthor-right{
    padding-left:5px;
}
.articleAuthor-right div{
    margin-bottom:2px;
}
.essay-detail{
    height:250px;
}
.essay-detail div{
    margin-bottom:3px;
}
.essay-detail-subject{
    font-weight:bold;

}
.essay-detail-content{
    height:43px;
    font-size:12px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
   
}
a {
  text-decoration: none;
  color:gray;
}
.essay-detail-bottom{
    display: flex;
    font-size:10px;
    margin-top:10px;
}
.essay-detail-id{
    width:30%;
}
.essay-detail-star{
    width:70%;
    text-align: right;
}
.essay-detail-discuss{
    font-size:10px;
    height:50px;
}
.essay-detail-discuss div{
    margin-bottom:5px; 
}
.essay-discuss-title{
    font-size:16px;
    font-weight:bold;
}
.essay-comment{
    display:inline-block;
    height:30px; 
    width:100%;
}
.essay-detail-submit{
    display: inline-block;
    margin-top:4px;
}
.essay-discuss-list{
    margin-top:4px;
    height:40px;
    border:1px solid #333;
    overflow: scroll;
    position: relative;
}

.discuss-delete{
    border:1px solid #ccc;
    position:absolute;
    margin-right:5px; 
    right:0px;
}


</style>
<script>
    export default{
        data(){
            return{
                articleInfo:[],
                authorImage:'',
                author:{},
                discuss:[],
                discussList:[],
                it:0,
  

            }
        },
        methods:{
            submit(index,it){
                if(this.discuss[index]!=null){
                let object={
                    id:this.articleInfo[index].article_id,
                    author_id:this.author.author_id,
                    discuss:this.discuss[index],
                    nickname:this.author.nickname,
                    it:this.it
                }
                this.axios.post('/indiscuss',this.qs.stringify(object)).then(res=>{
                    if(res.data.code==1){
                        console.log('成功');
                        
                    }
                    this.it++;
                    console.log(this.it);
                })
                this.loadList();
                
                

            }else {
                return 0;
            }
            },
            loadList(){
                let cid = this.$route.params.cid;
    // 向服务器发送请求,以获取数据
        this.axios.get('/author?cid=' + cid).then(res=>{
        this.articleInfo=res.data.articleInfo;
        this.discussList=res.data.discussList;
        this.author=res.data.author;
        this.authorImage=require('../assets/images/avatar/'+this.author.avatar);
        this.articleInfo.forEach(item=>{
          //在文章的图片不为空的情况下才动态加载
          if(item.image != null){
            //属性重新赋值
            item.image = require('../assets/images/articles/' + item.image);                            
          }
          //现在在无论是否图片为空都添加到以articles数组中了
          this.articleInfo.push(item);
          item.disList=[];
          this.discussList.forEach(i=>{
              if(item.article_id==i.id){
                  item.disList.push(i.discuss);
              }
          })
        });
    });
        },
        deleteList(cid,it){
            let param={
                cid:cid,
                it:it
            }
           this.axios.delete('/deletelist',{params:param}).then(res=>{
               if(res.data.code==1){
                   console.log('前端成功');
               }

           })
           this.loadList();



            }
        

},
       
        mounted(){
    let cid = this.$route.params.cid;
    // 向服务器发送请求,以获取数据
    this.axios.get('/author?cid=' + cid).then(res=>{
        this.articleInfo=res.data.articleInfo;
        this.discussList=res.data.discussList;
        this.author=res.data.author;
        this.authorImage=require('../assets/images/avatar/'+this.author.avatar);
        this.articleInfo.forEach(item=>{
          //在文章的图片不为空的情况下才动态加载
          if(item.image != null){
            //属性重新赋值
            item.image = require('../assets/images/articles/' + item.image);                            
          }
          //现在在无论是否图片为空都添加到以articles数组中了
          this.articleInfo.push(item);
          item.disList=[];
          this.discussList.forEach(i=>{
              if(item.article_id==i.id){
                  item.disList.push(i.discuss);
              }
          })
        });

    });
   
        }
    }
</script>