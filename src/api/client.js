import { CLIENT_URL } from '../constants';
import Request from './Request';

const ClientRequest = new Request(CLIENT_URL);

export const postAccess = code => ClientRequest.post('vote/access', { body: { code } });
export const postVote = (myVoteList, resList) => {
  const voteIdList = resList.map(res => res.voteId);
  const voteList = myVoteList.map((voteObj, index) => ({
    voteId: voteIdList[index],
    candidateId: voteObj.candidateId
  }));

  const req = {
    voteList,
    code: localStorage.getItem('authCode'),
  };

  return ClientRequest.post('vote', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    },
    body: req
  });
};