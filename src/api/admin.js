import { ADMIN_URL, DS_ADMIN_URL } from '../constants';
import Request from './Request';

const AdminRequest = new Request(ADMIN_URL); //민국이꺼
const DsAdminRequest = new Request(DS_ADMIN_URL); //다슬이꺼 ds

export const emcCheck = id => DsAdminRequest.get(`emc/check/${id}`, {
  headers: {
    'Authorization': localStorage.getItem('token2')
  }
});

export const getAuthCode = id => DsAdminRequest.post('emc/confirm', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token2'),
  },
  body: { id }
})

export const getVoteList = () => AdminRequest.get('election/list', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
  },
  body: null
})

export const deleteVote = voteId => AdminRequest.post(`election/${voteId}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
  },
  body: null
})

/*=------ admin manage ------------------------*/

export const getAdminList = () => AdminRequest.get('adminmanage/list', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
  },
  body: null
})

export const deleteAdmin = id => AdminRequest.post(`adminmanage/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
  },
  body: null
});