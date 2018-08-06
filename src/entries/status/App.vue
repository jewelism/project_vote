<template>
  <div id="app">
    <md-app>
      <md-app-drawer md-permanent="full">
        <side-menu :menuItems="menuItems"></side-menu>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
    <loading v-show="loading"/>
  </div>
</template>

<script>
import SideMenu from '../../components/common/SideMenu';
import {STATUS_MENU_ITEMS} from '../../constants';
import Loading from '../../components/common/Loading';

export default {
  name: 'App',
  data: () => ({
    menuItems: STATUS_MENU_ITEMS,
    loading: false,
  }),
  methods: {
    toggleLoading(bool) {
      this.loading = bool;
    }
  },
  created(){
    this.$eventBus.$on('loading', this.toggleLoading);
  },
  components: {
    SideMenu,
    Loading
  }
}
</script>

<style>
.md-app {
  min-height: 100vh;
  border: 1px solid rgba(#000, .12);
}
</style>
