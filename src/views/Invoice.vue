<template>
  <div>
    <print-invoice-header />
    <b-card no-body class="body-height box-shadow">
      <b-card-header> Factuur {{ invoice.invoice_number }} </b-card-header>
      <b-card-body>
        <invoice-items />
      </b-card-body>
      <b-card-footer>
        <span class="float-right total">{{ invoice.total | money }}</span>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import apiService from "@/services/api-service.js";
import invoiceItems from "@/components/Invoices/InvoiceItems";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader";

export default {
  data: () => ({}),
  components: {
    invoiceItems,
    PrintInvoiceHeader
  },
  computed: {
    invoice: {
      get() {
        return this.$store.state.invoice;
      },
      set(invoice) {
        this.$store.commit("invoice", invoice);
      }
    },
    invoiceItems: {
      get() {
        return this.$store.state.invoiceItems;
      },
      set(invoiceItems) {
        this.$store.commit("invoiceItems", invoiceItems);
      }
    }
  },
  created() {
    if (this.$store.state.invoices) {
      this.invoice = this.$store.state.invoices.find(
        invoice => invoice.id === this.$route.params.id
      );
    } else {
      apiService
        .getInvoice(this.$route.params.id)
        .then(data => {
          this.invoice = data;
        })
        .finally(() => {
          this.$store.commit("loadingItems", false);
        });
    }
    let formData = new FormData();
    formData.append("invoice_id", this.$route.params.id);
    apiService
      .getInvoiceItems(formData)
      .then(data => {
        this.invoiceItems = data;
      })
      .finally(() => {
        this.$store.commit("loadingItems", false);
      });
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
