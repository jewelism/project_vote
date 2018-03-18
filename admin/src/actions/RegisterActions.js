import axios from 'axios'
import { BASE_URL, URL2, EMC } from '../constants'

// const URI = 'http://192.168.0.9:8080'
const URI = URL2

export const login = function (body) {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.post(`${URI}/admin/signin`, body)
      // console.log(result.data)
      localStorage.setItem('token', result.data.data)
      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}

export const logout = function () {
  return new Promise((resolve) => {
    fetch(`${URI}/admin/signout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: null
    }).then((res) => {
      localStorage.removeItem('token')
      resolve(res)
    }).catch((error) => {
      console.warn(error)
    })
  })
}

export const voteRegister = (body) => {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.post(`${URI}/election`,
        body,
        {
          headers: {
            'Authorization': localStorage.getItem('token'),
          }
        })
      resolve(result)
    } catch (error) {
      console.warn(error)
      resolve(false)
    }
  })
}

export const uploadVoterExcelFile = function (file) {
  return new Promise(async (resolve) => {
    try {
      let bodyFormData = new FormData()
      bodyFormData.set('file', file)
      let result = await axios.post(`${URI}/usermanage/upload`,
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token'),
          }
        })
      resolve(result)
    } catch (error) {
      console.log('uploadVoterExcelFile api error :', error)
      resolve(false)
    }
  })
}

export const uploadAdminExcelFile = function (file) {
  return new Promise(async (resolve) => {
    // console.log(file)
    try {
      let bodyFormData = new FormData()
      bodyFormData.set('file', file)
      let result = await axios.post(`${URI}/adminmanage/upload`,
        bodyFormData,
        { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': localStorage.getItem('token') } })
      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}

export const saveCandidates = function (voteId, body) {
  return new Promise((resolve) => {
    // let bodyFormData = new FormData()
    // bodyFormData.set('file', file)
    console.log('api req body:', body)

    fetch(`${URI}/candidate/${voteId}`, {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        'Content-Type': 'multipart/form- data',
        // 'Content-Disposition': form-data; name="myJsonString",
        // 'Content-Disposition': 'multipart/form-data',
        // 'Content-Type': 'multipart/form-data',
        // 'Content-Transfer-Encoding': 'base64',
        'Authorization': localStorage.getItem('token'),
      },
      body : JSON.stringify(body),
    }).then((response) => {
      return response.json()
    }).then((responseJson) => {
      resolve(responseJson)
    }).catch((err) => {
      console.warn(err)
      resolve(false)
    })
  })
}


export const authCodeLogin = function (body) {
  return new Promise(async (resolve) => {
    try {
      let result = await axios.post(`${BASE_URL}${EMC}/login`, body)
      // console.log(result)
      // console.log(result.data.data)
      localStorage.setItem('token2', result.data.data)

      resolve(result)
    } catch (error) {
      console.log('login api error :', error)
      resolve(false)
    }
  })
}

export const authCodeLogout = function (token) {
  return new Promise((resolve) => {
    fetch(`${BASE_URL}${EMC}/logout`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: null
    }).then((res) => {
      localStorage.removeItem('token2')
      resolve(res)
    }).catch((error) => {
      console.warn(error)
    })
  })
}