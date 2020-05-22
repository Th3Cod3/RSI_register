<template>
  <b-card no-body class="body-height box-shadow">
    <b-card-header>
      <invoice-filter />
    </b-card-header>
    <b-card-body>
      <b-table
        striped
        hover
        sticky-header="70vh"
        :fields="fields"
        :items="invoices"
        @row-clicked="selectInvoice"
      ></b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import apiService from "@/services/api-service.js";
import invoiceFilter from "@/components/Invoices/InvoiceFilter";
const getInvoices = (component, reset = false) => {
  component.page = reset ? 0 : component.page;
  let formData = new FormData();
  formData.append("page", component.page);
  formData.append("invoice_number", component.invoiceNumber);
  apiService
    .getInvoices(formData)
    .then(data => {
      component.$store.commit("invoices", data);
    })
    .finally(() => {
      component.$store.commit("loadingItems", false);
    });
};

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
    },
    invoiceNumber() {
      return this.$store.state.invoiceFilter.invoiceNumber;
    }
  },
  created() {
    getInvoices(this);
  },
  watch: {
    invoiceNumber() {
      getInvoices(this, true);
    }
  },
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
