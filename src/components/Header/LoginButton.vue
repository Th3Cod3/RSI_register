<template>
  <div>
    <div v-if="!successLogin">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle dropdown-toggle-split"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Login
      </button>
      <div class="dropdown-menu login-container box-shadow">
        <form method="post" @submit="checkLogin">
          <div class="col-12">
            <div class="form-group">
              <label>Username</label>
              <input
                type="text"
                class="form-control"
                @input="updateLogin"
                v-model="user"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                @input="updateLogin"
                v-model="password"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-success btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      {{ loginUser }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: "",
    password: ""
  }),
  computed: {
    successLogin() {
      return this.$store.state.successLogin;
    },
    loginUser() {
      return this.$store.state.login.user;
    }
  },
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
      fetch("https://rip.rsiaruba.com/api/login", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
        .then(data => {
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
