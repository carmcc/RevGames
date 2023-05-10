<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <NavSideBar></NavSideBar>
  <router-view></router-view>
  <ComponentFooter/>
</template>

<script>
import NavSideBar from './components/NavSideBar.vue';
import ComponentFooter from "./components/ComponentFooter.vue";

export default {
  name: 'App',
  components: {
    NavSideBar,
    ComponentFooter
  }
}
</script>

<style>

</style>
