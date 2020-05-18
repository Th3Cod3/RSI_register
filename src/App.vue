<template>
  <div>
    <top-header />
    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import TopHeader from "@/components/Header/TopHeader";

export default {
  name: "App",
  components: {
    TopHeader
  }
};
</script>

<style>
.container-fluid {
  margin-top: 2rem;
}
</style>
