<template>
<div>
  <!-- 使用 -->
  <Header></Header>
  <!-- 路由组件使用 -->
  <router-view></router-view>
  <!-- 在Home、Search显示的，在登录、注册隐藏 -->
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
// 引入
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '',
  // 注册
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
</style>