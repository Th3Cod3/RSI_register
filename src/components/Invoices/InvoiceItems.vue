<template>
  <b-table hover small sticky-header="70vh" :items="items" :fields="fields">
    <template v-slot:cell(quantity)="data">
      <div
        @click="editQuantity(data.item.id)"
        v-show="editQuantityId != data.item.id"
      >
        <b-spinner
          small
          v-show="lastEditQuantityId == data.item.id && isSaving"
        ></b-spinner>
        {{ data.item.quantity }}
      </div>
      <div v-show="editQuantityId == data.item.id">
        <input
          @blur="updateItem(data.item)"
          @keydown.enter="updateItem(data.item)"
          @keydown.esc="editQuantityId = false"
          type="number"
          :value="data.item.quantity"
          :ref="'item-' + data.item.id"
        />
      </div>
    </template>
    <template v-slot:cell(prijs_discount)="data">
      {{ (data.item.price * data.item.quantity) | money }}
    </template>
    <template v-slot:cell(sale_price)="data">
      {{ (data.item.price / ((100 - data.item.discount) / 100)) | money }}
    </template>
  </b-table>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    editQuantityId: false,
    lastEditQuantityId: null,
    isSaving: false,
    fields: [
      {
        key: "name",
        label: "Omschrijving"
      },
      {
        key: "sale_price",
        label: "Shapprijs",
        class: "text-right",
        formatter: "filterMoney"
      },
      {
        key: "discount",
        label: "Korting",
        class: "text-right"
      },
      {
        key: "price",
        label: "Verkoopprijs",
        class: "text-right",
        formatter: "filterMoney"
      },
      {
        key: "quantity",
        label: "Hoeveelheid",
        class: "text-right"
      },
      {
        key: "prijs_discount",
        label: "Totale Verkoopprijs",
        class: "text-right",
        formatter: "filterMoney"
      }
    ]
  }),
  computed: mapState("invoice", ["items"]),
  methods: {
    updateItem(data) {
      if (this.editQuantityId) {
        this.editQuantityId = false;
        this.isSaving = true;
        let formData = new FormData();
        formData.append("id", data.id);
        formData.append("quantity", this.$refs[`item-${data.id}`].value);
        this.$store.dispatch("invoice/updateItem", formData).finally(() => {
          this.isSaving = false;
        });
      }
    },
    editQuantity(id) {
      this.lastEditQuantityId = this.editQuantityId = id;
      setTimeout(this.focusItem);
    },
    focusItem() {
      this.$refs[`item-${this.editQuantityId}`].focus();
    },
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
  }
};
</script>
