<template>
  <b-card no-body class="body-height box-shadow">
    <b-card-header>
      <invoice-filter />
    </b-card-header>
    <b-card-body>
      <b-table
        hover
        sticky-header="70vh"
        :busy="isLoading"
        :fields="fields"
        :items="invoices"
        @row-clicked="selectInvoice"
      ></b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import invoiceFilter from "@/components/Invoices/InvoiceFilter.vue";
import { mapState } from "vuex";

export default {
  components: {
    invoiceFilter
  },
  data: () => ({
    page: 0,
    fields: [
      {
        key: "invoice_number",
        label: "Factuurnummer"
      },
      {
        key: "swipe",
        label: "Swipe",
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
  computed: mapState("invoice", ["invoices", "isLoading"]),
  methods: {
    filterMoney(value) {
      return this.$options.filters.money(value);
    },
    selectInvoice(invoice) {
      this.$router.push({ name: "invoice", params: { id: invoice.id } });
    }
  }
};
</script>
