<template>
  <b-card no-body class="body-height box-shadow">
    <b-card-header>
      <inventory-filter :shop="false" order="created_at_desc" extraInfo />
    </b-card-header>
    <b-card-body>
      <b-table
        hover
        sticky-header="70vh"
        :busy="isLoading"
        :fields="fields"
        :items="inventories"
        @row-clicked="selectInventory"
      >
        <template v-slot:cell(name)="data">
          <span
            v-if="data.item.inventory_of.handle_name"
            class="font-weight-bold"
          >
            {{ data.item.inventory_of.handle_name }}
          </span>
          <span v-else class="font-weight-bold">
            {{ data.item.inventory_of.firstname }}
            {{ data.item.inventory_of.middlename }}
            {{ data.item.inventory_of.lastname }}
          </span>
        </template>
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import InventoryFilter from "@/components/Inventories/InventoryFilter";

export default {
  components: {
    InventoryFilter
  },
  data: () => ({
    page: 0,
    fields: [
      {
        key: "name",
        label: "Naam"
      },
      {
        key: "begin_date",
        label: "Begindatum",
        class: "text-right"
      }
    ]
  }),
  computed: {
    ...mapState("inventory", ["inventories", "isLoading"])
  },
  methods: {
    selectInventory(inventory) {
      this.$store.dispatch("inventory/getInventory", inventory.inventory_id);
      this.$router.push({
        name: "shop",
        params: { id: inventory.inventory_id }
      });
    }
  }
};
</script>
