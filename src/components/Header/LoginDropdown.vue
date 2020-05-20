<template>
  <div>
    <b-nav-item-dropdown right>
      <template v-slot:button-content>
        <em>Login</em>
      </template>
      <b-dropdown-form method="post" @submit="checkLogin">
        <b-form-group label="Username">
          <b-form-input
            type="text"
            @input="updateLogin"
            v-model="user"
            required
          />
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input
            type="password"
            @input="updateLogin"
            v-model="password"
            required
          />
        </b-form-group>
        <b-button block variant="success" type="submit">
          Login
        </b-button>
      </b-dropdown-form>
    </b-nav-item-dropdown>
  </div>
</template>

<script>
import apiService from "@/services/api-service.js";

export default {
  name: "LoginDropdown",
  data: () => ({
    user: "",
    password: ""
  }),
  methods: {
    updateLogin() {
      this.$store.commit("inputLogin", {
        user: this.user,
        password: this.password
      });
    },
    checkLogin(e) {
      e.preventDefault();
      let formData = new FormData();
      formData.set("password", this.password);
      formData.set("user", this.user);
      apiService.login(formData).then(data => {
        if (data.api_token) {
          this.password = "";
          this.$store.commit("login", {
            token: data.api_token,
            user: this.user
          });
        } else {
          alert("fail");
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  background-color: #eeeeee;
}
</style>
