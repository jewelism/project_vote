import axios from 'axios'

import { URL, VOTE, ACCESS } from '../constants'

export const postAccess = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await axios.post(`${URL}/${VOTE}/${ACCESS}`, { code })
      resolve(result)
    } catch (error) {
      resolve(false)
      console.error(error)
    }
  })
}

export const postVote = (myVoteList, resList) => {
  return new Promise(async (resolve) => {
    let req = {
      code: localStorage.getItem('authCode'),
      voteList: []
    }
    // console.log(myVoteList, resList)

    const voteIdList = resList.map((res) => {
      return res.voteId
    })
    // console.log(voteIdList)

    const voteList = myVoteList.map((voteObj, index) => {
      return ({
        voteId: voteIdList[index],
        candidateId: voteObj.candidateId
      })
    })
    // console.log('important:', voteList)
    req.voteList = voteList

    // console.log('req:', req)
    
    const token = localStorage.getItem('token')
    // console.log(token)
    
    fetch(`${URL}/${VOTE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(req)
    }).then((response) => {
      return response.json()
    }).then((responseJson) => {
      resolve(responseJson)
    }).catch((err) => {
      console.warn(err)
      resolve(false)
    })

    // try {
    //   let req = {
    //     code: localStorage.getItem('authCode'),
    //     voteList: []
    //   }
    //   for (const [index, voteObj] of myVoteList) {
    //     let vote = {
    //       voteId: null,
    //       candidateId: null
    //     }
    //     vote.voteId = voteObj.voteId
    //     vote.candidateId = voteObj.candidates[index].candidateId
    //     req.voteList.push(vote)
    //   }
    //   let result = await axios.post(`${URL}/${VOTE}`, {
    //     body: req,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': localStorage.getItem('token')
    //     }
    //   })
    //   console.log(result)
    //   resolve(result)
    // } catch (error) {
    //   resolve(false)
    // }
  })
}