import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CandidateInfo from '../layouts/status/CandidateInfo';
import CheckSuffrage from '../layouts/status/CheckSuffrage.vue';
import CheckVote from '../layouts/status/CheckVote.vue';
import Check from '../layouts/status/Check.vue';
import VoteInfo from '../layouts/status/VoteInfo.vue';
import VoteResult from '../layouts/status/VoteResult.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VoteInfo',
      component: VoteInfo
    },
    {
      path: '/candidate-info',
      name: 'CandidateInfo',
      component: CandidateInfo
    },
    {
      path: '/check-suffrage',
      name: 'CheckSuffrage',
      component: Check
    },
    {
      path: '/check-vote',
      name: 'CheckVote',
      component: Check
    },
    
    {
      path: '/vote-result',
      name: 'VoteResult',
      component: VoteResult
    },
  ]
})
