<template>
  <b-table
    striped
    hover
    small
    sticky-header="70vh"
    :items="invoiceItems"
    :fields="fields"
  >
  </b-table>
</template>

<script>
export default {
  data: () => ({
    fields: [
      {
        key: "name",
        label: "Omschrijving"
      },
      {
        key: "price",
        label: "Shapprijs",
        class: "text-right",
        formatter: "filterMoney"
      },
      {
        key: "quantity",
        label: "Hoveelheid",
        class: "text-right"
      }
    ]
  }),
  computed: {
    invoiceItems: {
      get() {
        return this.$store.state.invoiceItems;
      },
      set(invoiceItems) {
        this.$store.commit("invoiceItems", invoiceItems);
      }
    }
  },
  methods: {
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
  }
};
</script>

<style></style>
