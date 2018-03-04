import axios from 'axios'
import { BASE_URL, URL2, EMC } from '../constants/Api'

export const emcCheck = function (id, token) {
  return new Promise((resolve) => {
    axios.get(`${BASE_URL}${EMC}/check/${id}`, {
    // axios.get(`http://1.1.1.36:8080/emc/check/${id}`, {
      headers: {
        'Authorization': token
      }
    }).then((result)=>{
      console.log(result)
      resolve(result)
    })
  })
}

export const getAuthCode = function (id) {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.post(`${BASE_URL}${EMC}/confirm`, { id })
      resolve(result)
    } catch (error) {
      resolve(false)
    }
  })
}

export const getVoteList = function () {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.get(`${URL2}/election/list`)
      resolve(result)
    } catch (error) {
      resolve(false)
    }
  })
}