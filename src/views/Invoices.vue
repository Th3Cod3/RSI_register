<template>
  <b-card no-body>
    <b-card-header>
      Facturen
      <!-- Invoices Filter -->
    </b-card-header>
    <b-card-body>
      <b-table striped hover :fields="fields" :items="invoices"></b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import apiService from "@/services/api-service.js";

export default {
  data: () => ({
    fields: [
      {
        key: "invoice_number",
        label: "Factuurnummer"
      },
      {
        key: "total",
        label: "Totaal",
        class: "text-right",
        formatter: "filterMoney"
      },
      {
        key: "created_at",
        label: "Datum",
        class: "text-right"
      }
    ]
  }),
  computed: {
    invoices() {
      return this.$store.state.invoices;
    }
  },
  created() {
    apiService
      .getInvoices()
      .then(data => {
        this.$store.commit("invoices", data);
      })
      .finally(() => {
        this.$store.commit("loadingItems", false);
      });
  },
  methods: {
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
  }
};
</script>
