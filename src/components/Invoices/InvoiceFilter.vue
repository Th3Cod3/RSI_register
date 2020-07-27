<template>
  <b-row>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Factuurnummer">
        <input type="text" class="form-control" v-model="invoiceNumber" />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "InvoiceFilter",
  data: () => ({
    invoiceNumber: "",
    page: 0
  }),
  computed: {
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    })
  },
  created() {
    this.getInvoices();
  },
  watch: {
    invoiceNumber() {
      this.getInvoices();
    }
  },
  methods: {
    getInvoices() {
      let formData = new FormData();
      formData.append("page", this.page);
      formData.append("invoice_number", this.invoiceNumber);
      formData.append("inventory_id", this.inventory_id);
      this.$store.dispatch("invoice/getInvoices", formData);
    }
  }
};
</script>
