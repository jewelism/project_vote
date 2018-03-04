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

export const postVote = (myVoteList) => {
  return new Promise(async (resolve) => {
    try {
      let req = {
        code: null,
        voteList: []
      }
      req.code = localStorage.getItem('authCode')
      for (const [index, voteObj] of myVoteList) {
        let vote = {
          voteId: null,
          candidateId: null
        }
        vote.voteId = voteObj.voteId
        vote.candidateId = voteObj.candidates[index].candidateId
        req.voteList.push(vote)
      }
      let result = await axios.post(`${URL}/${VOTE}`, {
        req,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      if (result) {
        resolve(true)
      } else {
        resolve(false)
      }
    } catch (error) {
      resolve(false)
    }
  })
}