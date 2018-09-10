# 성공회대학교 전자투표시스템

신버전은 개발진행중임(안할지도..)
---------------------------------------

구버전은
https://github.com/jewelism/project_vote/tree/master/legacy
여기에서..

----------------------------------------

## dev환경 실행방법

### Windows

windows_run.ps1을 파워쉘로 실행(관리자권한)

### Mac, linux

run.sh 실행

#### 스크립트 실행후 번호를 선택하면 각 프로젝트 자동실행

----------------------------------------

라우터없이 구현하였음 (페이지를 전환해도 url이 바뀌지않음)

클라이언트 사이드 렌더링

vuejs, reactjs, rxjs 사용

파일업로드

생각안하고 막 만들고 일부분은 공부하면서 만든거라 흠잡을곳이많음 ㅎㅎ

---------------------------------------

# project_vote_client

vue.js

유권자

유권자 인증 후 전자투표

---------------------------------------

# project_vote_d3

vue.js

모든유저

투표정보확인, 투표권확인 등등

d3.js를 사용한 그래프를 하려다가 progressive bar로 변경

vue에서 아~~주 간단하게 rxjs 사용, 은근히 어려운(?) table tr hover했을때 style구현

dynamic class bind

---------------------------------------

# project_vote_admin

react.js

선거관리위원회

엑셀파일을 업로드하여 투표등록, 유권자등록..등등

react에서 아~~주 간단하게 rxjs 사용, 은근히 어려운(?) table tr hover했을때 style구현
