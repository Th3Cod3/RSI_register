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
export default {
  name: "InvoiceFilter",
  computed: {
    invoiceNumber: {
      get() {
        return this.$store.state.invoiceFilter.invoiceNumber;
      },
      set(value) {
        this.$store.commit("invoiceFilter_invoiceNumber", value);
      }
    }
  }
};
</script>
