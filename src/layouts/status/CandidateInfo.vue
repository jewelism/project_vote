<template>
  <div>
    <h1>후보자 정보</h1>
    <div v-if="candidateLoaded" class="itemsWrapper">
      <div
        v-for="(candidate, index) in candidateList"
        @click="onClickItem(candidate.id)"
        @mouseover="hoverIndex=index"
        @mouseleave="hoverIndex=-1"
        :style="isHover(index) ? hoverStyle : style"
        class="item"
      >
        <div :style="imgWrapperStyle">
          <img
            :src="candidate.picture"
            @error="candidate.picture='https://www.gstatic.com/webp/gallery3/1.png'"
            :style="{ resizeMode: 'stretch', width: '15vw', 'height': 'auto'}"
          />
        </div>
        
        <h3>후보 {{ candidate.id }}번</h3>
        <h1>{{ candidate.name }}</h1>
      </div>
    </div>
    
    <div v-if="itemLoaded">
      <CandidateItem :item="item" v-if="item" />
      <div v-else>
        정보 없음
      </div>
    </div>
  </div>
</template>

<script>
import { getCandidateList, getCandidate } from '../../api';
import CandidateItem from '../../components/common/CandidateItem';
import FetchFailed from '../../components/common/FetchFailed';

export default {
  name: 'CandidateInfo',
  data: () => ({
    candidateLoaded: false,
    candidateList: [],
    itemLoaded: false,
    item: null,
    hoverIndex: -1,
    style: {
      opacity: '1.0',
      borderWidth: '1px',
      borderColor: '#72D4FF',
      cursor: 'auto',
    },
    hoverStyle: {
      opacity: '0.3',
      borderColor: '#72D4FF',
      cursor: 'pointer',
    },
    imgWrapperStyle: {
      'height':'22vh',
      'align-items': 'center',
      'display': 'flex',
      'justify-content': 'center'
    }
  }),
  created() {
    this.$eventBus.$emit('loading', true);
  },
  async mounted() {
    let candidateList = await getCandidateList();
    this.candidateList = candidateList;
    this.$eventBus.$emit('loading', false);
    this.candidateLoaded = true;
  },
  methods: {
    async onClickItem(id) {
      this.$eventBus.$emit('loading', true);
      let {data} = await getCandidate(id);
      if(data){
        // console.log(data)
        this.item = data.data[0];
      } else {
        this.item = null;
      }
      this.itemLoaded = true;
      this.$eventBus.$emit('loading', false);
    },
    isHover(index){
      // console.log(index)
      return this.hoverIndex===index;
    },
  },
  components: {
    CandidateItem,
    FetchFailed
  }
}
</script>

<style scoped>
.itemsWrapper {
  margin: 1rem auto;
}
.item {
  width: 15%;
  border: 1px solid black;
  border-radius: 3px;
  padding: 25px 15px 0px 15px;
  margin: 10px;
  display: inline-block;
}
</style>
