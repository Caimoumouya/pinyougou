<template>
<div class="swiper-container" ref="cur">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                                            <img :src="carousel.imgUrl">
                                        </div>
                                       
                                    </div>
                                    <!-- 如果需要分页器 -->
                                    <div class="swiper-pagination"></div>

                                    <!-- 如果需要导航按钮 -->
                                    <div class="swiper-button-prev"></div>
                                    <div class="swiper-button-next"></div>
                                </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper';
export default {
name:'Carousel',
props:['list'],
watch:{
    list:{
        // 立即监听，不管数据有没有变化，因为数据是父给的，一直没有发生变化
        immediate:true,
        handler(){
            // 只能监听数据有了，但v-for动态渲染没法确定，因此还需要nextTick
            this.$nextTick(()=>{
                    var mySwiper = new Swiper (this.$refs.cur, {

                     loop: true, // 循环模式选项

                     // 如果需要分页器,点击小球的时候也切换图片
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },

                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                    });
                })
        }
    }
}
}
</script>

<style scoped>
</style>
