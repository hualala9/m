<template>
    <div>
        <mt-button type="primary">从服务器添加数据</mt-button>
        <p v-for="(item,index) of this.$store.state.products" :key="index">
            {{item.productName}}
            {{item.salePrice}}
        </p>
    </div>
</template>