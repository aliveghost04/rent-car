<template>
  <div class="loading" v-if="isLoading"></div>
</template>

<script type="text/javascript">
export default {
  props: {
    isLoading: Boolean
  }
}
</script>

<style type="text/css">
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 10px solid white;
  border-top-color: orange;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  z-index: 100;
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%)  rotate(0deg);
  }
  40% {
    border-top-color: red;
  }
  80% {
    border-top-color: green;
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
