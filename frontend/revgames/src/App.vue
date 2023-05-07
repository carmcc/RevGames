<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <NavSideBar></NavSideBar>
  <router-view/>
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
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
