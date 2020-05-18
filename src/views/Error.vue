<template>
  <div class="container">
    <div class="title">ERROR</div>
    <div class="suggetion">
      Click <router-link to="/">here</router-link> to go back
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 4rem;
  font-weight: bold;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 3rem);
}
</style>
