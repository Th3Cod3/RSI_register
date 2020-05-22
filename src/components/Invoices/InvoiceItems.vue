<template>
  <b-table
    striped
    hover
    small
    sticky-header="70vh"
    :items="invoiceItems"
    :fields="fields"
  >
    <template v-slot:cell(quantity)="data">
      <div
        @click="editQuantity(data.item.id)"
        v-show="editQuantityId != data.item.id"
      >
        {{ data.item.quantity }}
      </div>
      <div v-show="editQuantityId == data.item.id">
        <input
          @blur="updateItem(data.item)"
          type="number"
          :value="data.item.quantity"
          :ref="'item-' + data.item.id"
        />
      </div>
    </template>
  </b-table>
</template>

<script>
import apiService from "@/services/api-service.js";

export default {
  data: () => ({
    editQuantityId: false,
    isSaving: false,
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
        label: "Hoeveelheid",
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
    updateItem(data) {
      this.editQuantityId = false;
      this.isSaving = true;
      let formData = new FormData();
      formData.append("id", data.id);
      formData.append("quantity", this.$refs[`item-${data.id}`].value);
      let self = this;
      apiService.updateInvoiceItem(formData).then(item => {
        self.invoiceItems = self.invoiceItems.map(localItem => {
          if (localItem.id == item.id) {
            localItem = item;
          }
          return localItem;
        });
      });
    },
    editQuantity(id) {
      this.editQuantityId = id;
      let self = this;
      setTimeout(() => {
        self.$refs[`item-${id}`].focus();
      });
    },
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
  }
};
</script>
