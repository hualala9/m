<template>
    <div>
        <p>姓名{{this.$store.state.username}}</p>
        <p>年龄：{{this.$store.state.age}}</p>
        <p>性别{{this.$store.state.sex?'女':'男'}}</p>
        <mt-button @click="handle"  type="primary">增加年龄</mt-button>
        <hr>
        <p v-for="(item,index) of this.$store.state.products" :key="index">
            {{item.productName}}
            {{item.salePrice}}

        </p>
        <div>
            <mt-field type="text" label="商品名称" v-model="productName"></mt-field>
            <mt-field type="text" label="商品价格" v-model="salePrice"></mt-field>
            <mt-button type="primary" @click='add'>添加商品</mt-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
        return {
            productName:'',
            salePrice:0
        }

        },
        methods:{
            handle(){
              this.$store.commit('changeAge');
            },
            add(){
                let obj={
                    productName:this.productName,
                    salePrice:this.salePrice
                }
                this.$store.commit('login_mutation',obj);
            }
        }
    }
</script>