<template>
  <b-form method="post" @submit.prevent="login">
    <b-form-group label="Username">
      <b-form-input type="text" v-model="user" required />
    </b-form-group>
    <b-form-group label="Password">
      <b-form-input type="password" v-model="password" required />
    </b-form-group>
    <b-button block variant="success" type="submit" :disabled="isLoading">
      <b-spinner small type="grow" v-show="isLoading"></b-spinner> Login
    </b-button>
  </b-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: () => ({
    user: "",
    password: ""
  }),
  computed: mapState("user", ["isLoading"]),
  methods: {
    login() {
      let formData = new FormData();
      formData.set("password", this.password);
      formData.set("user", this.user);
      this.$store
        .dispatch("user/login", formData)
        .then(response => this.redirect(response))
        .catch(error => {
          this.authError(error);
        });
    },
    redirect(response) {
      if (response.api_token) {
        this.$router.push({ name: "jobs" });
      }
    },
    authError(error) {
      if (error.status == 401) {
        this.$fire({
          title: "Something wrong, verify your username en/of password.",
          type: "warning",
          timer: 3000
        });
      } else if (error.status == 403) {
        this.$fire({
          title: "This user is block, contact with support.",
          type: "warning",
          timer: 3000
        });
      }
    }
  }
};
</script>
