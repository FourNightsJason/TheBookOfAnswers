<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
// * {
// margin: 0;
// padding: 0;
// }
html,
body {
  margin: 0;
  height: 100%;
  font-size: calc(~"100vw / 20");
  color: #fff;
  background: black;
  user-select: none;
  #app {
    padding: 0;
    width: 100%;
    height: 100%;
    div.center-button {
      text-align: center;
    }
    div.center-text {
      text-align: center;
    }
  }
}
</style>
