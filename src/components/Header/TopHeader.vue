<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/jobs">RSI</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/jobs" active-class="active">
          Jobs
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'shop', params: { id: inventory_id } }"
          active-class="active"
          v-if="isJobChoosed"
        >
          Shop
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'inventory', params: { id: inventory_id } }"
          active-class="active"
          v-if="isJobChoosed"
        >
          Inventory
        </b-nav-item>
        <b-nav-item
          :to="{ name: 'invoices', params: { id: inventory_id } }"
          active-class="active"
          v-if="isJobChoosed"
        >
          Invoices
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="isLogin">
          <template v-slot:button-content>
            <em>{{ username }}</em>
          </template>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TopHeader",
  computed: {
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    }),
    ...mapState("user", ["isLogin", "username"]),
    isJobChoosed() {
      return this.isLogin && this.inventory_id;
    }
  },
  methods: {
    logout() {
      this.$router.push({ name: "logout" });
    }
  }
};
</script>
