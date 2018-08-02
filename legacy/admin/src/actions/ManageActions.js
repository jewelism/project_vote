import axios from 'axios'
// eslint-disable-next-line 
import { BASE_URL, URL2, EMC } from '../constants/Api'

// const URI = 'http://192.168.0.9:8080'
const URI = URL2

export const emcCheck = function (id, token) {
  return new Promise((resolve) => {
    axios.get(`${BASE_URL}${EMC}/check/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('token2')
      }
    }).then((result) => {
      // console.log(result)
      resolve(result)
    })
  })
}

export const getAuthCode = function (id) {
  return new Promise(async (resolve) => {
    fetch(`${BASE_URL}/emc/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token2'),
      },
      body: JSON.stringify({ id })
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

export const getVoteList = function () {
  return new Promise((resolve) => {
    fetch(`${URI}/election/list`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: null
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

export const deleteVote = function (voteId) {
  return new Promise((resolve) => {
    fetch(`${URI}/election/${voteId}`, {
      method: 'DELETE',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: null
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

/*=------ admin manage ------------------------*/

export const getAdminList = function () {
  return new Promise((resolve) => {
    fetch(`${URI}/adminmanage/list`, {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: null
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

export const deleteAdmin = function (id) {
  return new Promise((resolve) => {
    fetch(`${URI}/adminmanage/${id}`, {
      method: 'DELETE',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
      },
      body: null
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
