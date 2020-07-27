<template>
  <b-form method="post" @submit.prevent="login">
    <b-form-group label="Username">
      <b-form-input type="text" v-model="user" required />
    </b-form-group>
    <b-form-group label="Password">
      <b-form-input type="password" v-model="password" required />
    </b-form-group>
    <b-button block variant="success" type="submit">
      Login
    </b-button>
  </b-form>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: "",
    password: ""
  }),
  methods: {
    login() {
      let formData = new FormData();
      formData.set("password", this.password);
      formData.set("user", this.user);
      this.$store
        .dispatch("user/login", formData)
        .then(response => this.redirect(response));
    },
    redirect(response) {
      if (response.api_token) {
        this.$router.push({ name: "jobs" });
      }
    }
  }
};
</script>
