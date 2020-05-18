<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">RSI</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/inventory">Inventaris</b-nav-item>
        <b-nav-item href="/invoices">Facturen</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="successLogin">
          <template v-slot:button-content>
            <em>{{ user }}</em>
          </template>
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <login-dropdown v-else />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import LoginDropdown from "@/components/Header/LoginDropdown";
export default {
  name: "TopHeader",
  components: {
    LoginDropdown
  },
  computed: {
    successLogin() {
      return this.$store.state.successLogin;
    },
    user() {
      return this.$store.state.login.user;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push({ name: "shop" });
    }
  }
};
</script>

<style></style>
