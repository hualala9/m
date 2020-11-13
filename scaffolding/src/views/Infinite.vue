<template>
    <div>
        <div infinite--scroll-distance="30" 
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        >
            <p v-for="(v,k) of n" :key="k">{{v}}</p>
        </div>
        
    </div>
</template>
<script>
    export default{
        data(){
            return {
                n:30,
                busy:false
            }
        },
        methods:{
            loadMore(){
                this.$indicator.open({
                    text:"加载中",
                    spinneType:"fading-circle"
                });

                this.busy=true;
                window.setTimeout(()=>{
                    this.n+=30;
                    this.busy=false;
                    this.$indicator.close();
                },3000)
            }
        }
       
    }
</script>