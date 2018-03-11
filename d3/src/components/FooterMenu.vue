<template>
  <div :style="menuStyle">
    <button v-for="item in itemList" @click="onPress(item.uri)">{{ item.title }}</button>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
  props: ['currentMenu','onPress'],
  data () {
    return {
      itemList: [
        { title: '선거 정보', uri: 'vote' },
        // { title: '후보자 정보', uri: 'candidate' },
        { title: '선거권 확인', uri: 'suffrage' },
        { title: '선거 여부 확인', uri: 'check' },
        { title: '투표 결과', uri: 'result' },
      ],
      menuStyle: {
        backgroundColor: '#FFF',
      }
    }
  },
}
</script>