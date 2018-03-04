import axios from 'axios'
import { BASE_URL, URL2, EMC } from '../constants/Api'

export const getVoteTargetDepartment = function () {
  return new Promise((resolve) => {
    try {
      let list = ['1a', '2b', '3c', '4d']
      resolve(list)
    } catch (error) {
      console.log('getVoteTargetDepartment api error :', error)
      resolve(false)
    }
  })
}

export const login = function (body) {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.post(`${BASE_URL}${EMC}/login`, body)
      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}

export const logout = function () {
  return new Promise((resolve) => {
    fetch(`${BASE_URL}${EMC}/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: null
    }).then((res) => {
      // console.log("promise return val : ",res)
      localStorage.removeItem('token')
      resolve(res)
    }).catch((error)=>{
      console.warn(error)
    })
  })
}

export const uploadVoterExcelFile = function (file) {
  return new Promise(async (resolve) => {
    console.log(file)
    try {
      let bodyFormData = new FormData()
      bodyFormData.set('file', file)
      let result = await axios.post(`${URL2}/usermanage/upload`,
        bodyFormData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}

export const uploadAdminExcelFile = function (file) {
  return new Promise(async (resolve) => {
    console.log(file)
    try {
      let bodyFormData = new FormData()
      bodyFormData.set('file', file)
      let result = await axios.post(`${URL2}/adminmanage/upload`,
        bodyFormData,
        { headers: { 'Content-Type': 'multipart/form-data' } })
      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}
