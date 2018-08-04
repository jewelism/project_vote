<template>
  <div id="app">
    <md-app>
      <md-app-content>
        <component :is="currentComponent"
          :navigate="navigate" :propData="propData" :toggleLoading="toggleLoading"/>
      </md-app-content>
    </md-app>
    <Loading v-show="loading"/>
  </div>
</template>

<script>
import Main from '../../layouts/client/Main';
import Vote from '../../layouts/client/Vote';
import End from '../../layouts/client/End';
import Loading from '../../components/common/Loading';

export default {
  name: 'App',
  data: () => ({
    currentComponent: 'Main',
    responseData: null,
    propData: null,
    loading: false,
  }),
  methods: {
    navigate({name, propData}) {
      this.currentComponent = name;
      this.propData = propData;
    },
    toggleLoading(bool){
      this.loading = bool;
    }
  },
  components: {
    Main,
    Vote,
    End,
    Loading
  }
}
</script>

<style>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, .12);
}
</style>
