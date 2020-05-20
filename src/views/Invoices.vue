<template>
  <b-card no-body>
    <b-card-header>
      <!-- Invoices Filter -->
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col>Factuurnummer</b-col>
        <b-col>Total</b-col>
        <b-col>Datum</b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import apiService from "@/services/api-service.js";

export default {
  created() {
    apiService
      .getInvoices()
      .then(data => {
        this.$store.commit("invoices", data);
      })
      .finally(() => {
        this.$store.commit("loadingItems", false);
      });
  }
};
</script>

<style></style>
