<template>
  <b-container>
    <b-row>
      <b-col offset="3" cols="6">
        <b-card class="body-height box-shadow">
          <login />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "@/components/Generic/Login.vue";

export default {
  components: {
    Login
  }
};
</script>
