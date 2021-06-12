<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
   <ScreeningPlan />
  
</template>

<script>
import ScreeningPlan from './components/screeningPlan/index.vue'

export default {
  name: 'App',
  
  components: {
    ScreeningPlan
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
