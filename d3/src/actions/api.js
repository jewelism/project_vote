import axios from 'axios'
import { BASE_URL, VOTE, CANDIDATE, SUFFRAGE, CHECK } from '../constants'

/////////for loading test/////////////
export const testTimer = () => {
  return new Promise((resolve) => {
    try {
      setTimeout(() => {
        resolve(true)
      }, 300)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const getCandidateList = () => {
  return new Promise((resolve, reject) => {
    try {
      let list = [
        { id: 0, name: '정보석', picture: require('../assets/fairy.jpeg') },
        { id: 1, name: '이승기', picture: require('../assets/ggobuk.jpeg') },
        { id: 2, name: '배다슬', picture: require('../assets/pikachu.jpeg') },
        { id: 3, name: '조민국', picture: require('../assets/strange.jpeg') },
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

export const getVoteInfo = () => {
  return new Promise((resolve) => {
    try {
      axios.get(`${BASE_URL}${VOTE}`)
        .then((res) => {
          resolve(res)
        })
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const votePost = () => {
  return new Promise((resolve) => {
    try {
      axios.post(`${BASE_URL}${VOTE}`)
        .then((res) => {
          resolve(res)
        })
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const getVoteInfoDetail = (id) => {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post(`${BASE_URL}${VOTE}`, { id })
      resolve(res)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const getCandidate = (id) => {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post(`${BASE_URL}${CANDIDATE}`, { id })
      resolve(res)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const getSuffrage = (id) => {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post(`${BASE_URL}${SUFFRAGE}`, { id })
      resolve(res)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const voteCheck = (id) => {
  return new Promise(async (resolve) => {
    try {
      let res = await axios.post(`${BASE_URL}${CHECK}`, { id })
      resolve(res)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const getVoteResult = ()=>{
  return new Promise(async (resolve)=>{
    try {
      let res = await axios.get(`http://bghgu.tk:3000/info/result`)
      resolve(res)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}