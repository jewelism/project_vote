
// export const GRAPH = '/real-time'
// export const VOTE = '/vote'
// export const CANDIDATE = '/candidate'
// export const SUFFRAGE = '/suffrage'
// export const CHECK = '/check'
// export const RESULT = '/result'

import Request from './Request';

const StatusRequest = new Request('http://bghgu.tk:3000/info');
export const getCandidateList = () => {
  return new Promise((resolve, reject) => {
    try {
      const STATIC_PATH = '../assets/images/';
      const list = [
        { id: 0, name: '정보석', picture: require(`${STATIC_PATH}fairy.jpeg`) },
        { id: 1, name: '이승기', picture: require(`${STATIC_PATH}ggobuk.jpeg`) },
        { id: 2, name: '배다슬', picture: require(`${STATIC_PATH}pikachu.jpeg`) },
        { id: 3, name: '조민국', picture: require(`${STATIC_PATH}strange.jpeg`) },
        { id: 4, name: 'test', picture: 'https://www.gstatic.com/webp/gallery3/1123123.png' },
      ]
      setTimeout(() => {
        resolve(list)
      }, 500)

    } catch (error) {
      resolve(false)
      console.error(error)
    }
  })
}

export const getVoteInfo = () => StatusRequest.get('vote');
export const votePost = () => StatusRequest.post('vote');
export const getVoteInfoDetail = id => StatusRequest.post('vote', { body: { id } });
export const getCandidate = id => StatusRequest.post('candidate', { body: { id } });
export const getSuffrage = id => StatusRequest.post('suffrage', { body: { id } });
export const voteCheck = id => StatusRequest.post('check', { body: { id } });
export const getVoteResult = () => StatusRequest.get('result');