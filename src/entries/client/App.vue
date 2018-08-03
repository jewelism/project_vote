<template>
  <div id="app">
    <md-app>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}
</style>
