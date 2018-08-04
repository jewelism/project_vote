import StatusRouter from '../router/status';

export const STATUS_MENU_ITEMS = [
  {
    icon: 'move_to_inbox', name: '선거정보',
    onClick() {
      StatusRouter.push({ name: 'VoteInfo' });
    }
  },
  {
    icon: 'send', name: '선거권 확인',
    onClick() {
      StatusRouter.push({ name: 'CheckSuffrage' });
    }
  },
  {
    icon: 'delete', name: '선거 여부 확인',
    onClick() {
      StatusRouter.push({ name: 'CheckVote' });
    }
  },
  {
    icon: 'error', name: '투표 결과',
    onClick() {
      StatusRouter.push({ name: 'VoteResult' });
    }
  },
];

export const ADMIN_MENU_ITEMS = [
  { icon: 'send', name: '선거관리' },
  { icon: 'delete', name: '유권자 등록' },
  { icon: 'error', name: '유권자 관리' },
  { icon: 'error', name: '선관위 등록' },
  { icon: 'error', name: '선관위 관리' },
];

export const CLIENT_URL = 'http://bghgu.tk';
export const ADMIN_URL = 'http://13.125.101.152:8080/skhuvote';
export const DS_ADMIN_URL = 'http://bghgu.tk';