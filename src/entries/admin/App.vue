<template>
  <div id="app">
    <md-app>
      <md-app-drawer md-permanent="clipped">
        <side-menu :menuItems="menuItems"></side-menu>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import SideMenu from '../../components/common/SideMenu';
import {ADMIN_MENU_ITEMS} from '../../constants';

export default {
  name: 'App',
  data: () => ({
    menuItems: ADMIN_MENU_ITEMS
  }),
  components: {
    SideMenu
  }
}
</script>

<style>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}
</style>
