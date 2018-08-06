<template>
  <md-empty-state
    md-rounded
    md-icon="access_time"
    md-description="서버에서 데이터를 불러올 수 없습니다."
    >
  </md-empty-state>
</template>

<script>
export default {
  name: 'FetchFailed',
};
</script>