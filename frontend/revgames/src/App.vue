<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <NavSideBar v-if="!hideNavbar"></NavSideBar>
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
  },
  computed: {
    hideNavbar() {
      return this.$route.meta.hideNavbar
    }
  }
}
</script>

<style>

</style>
