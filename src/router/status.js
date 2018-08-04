import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '../layouts/status/Main';
import CandidateInfo from '../layouts/status/CandidateInfo';
import CheckSuffrage from '../layouts/status/CheckSuffrage.vue';
import CheckVote from '../layouts/status/CheckVote.vue';
import VoteInfo from '../layouts/status/VoteInfo.vue';
import VoteResult from '../layouts/status/VoteResult.vue';

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/candidate-info',
      name: 'CandidateInfo',
      component: CandidateInfo
    },
    {
      path: '/check-suffrage',
      name: 'CheckSuffrage',
      component: CheckSuffrage
    },
    {
      path: '/check-vote',
      name: 'CheckVote',
      component: CheckVote
    },
    {
      path: '/vote-info',
      name: 'VoteInfo',
      component: VoteInfo
    },
    {
      path: '/vote-result',
      name: 'VoteResult',
      component: VoteResult
    },
  ]
})
