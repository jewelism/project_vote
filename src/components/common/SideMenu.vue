<template>
  <md-list>
    <md-list-item
      v-for="item in menuItems" :key="item.name"
      @click.prevent="item.onClick">
    <md-icon>{{item.icon}}</md-icon>
    <span class="md-list-item-text">{{item.name}}</span>
    </md-list-item>
  </md-list>
</template>

<script>

export default {
  name: 'SideMenu',
  props: ['menuItems'],
};
</script>