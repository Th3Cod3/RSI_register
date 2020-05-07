<template>
  <div class="row">
    <div class="col-12">
      <item-detail
        v-for="item in items"
        :item="item"
        :key="item.id"
        v-show="filterData(item)"
      />
    </div>
  </div>
</template>

<script>
import ItemDetail from "@/components/ItemDetail";
export default {
  props: ["filter"],
  name: "ProductListContainer",
  data: () => ({
    items: [
      {
        id: 1,
        name: "Lays",
        barcode: "123456789",
        price: 2.5,
        type: "consumable",
        amount: 1,
        stock: 10
      },
      {
        id: 2,
        name: "Doritos",
        barcode: "12345679",
        price: 2.5,
        type: "consumable",
        amount: 1,
        stock: 10
      },
      {
        id: 3,
        name: "Coors Light Beer Bottle",
        barcode: "65465406",
        price: 2.5,
        type: "consumable",
        amount: 1,
        stock: 10
      },
      {
        id: 4,
        name: "Master Of Mixed, Extra Spicy Bloody Mary Mixer",
        barcode: "6215161546",
        price: 2.5,
        type: "consumable",
        amount: 1,
        stock: 10
      }
    ]
  }),
  components: {
    ItemDetail
  },
  methods: {
    filterData(item) {
      let result = false;
      debugger // eslint-disable-line
      if (
        (this.filter.productName === "" ||
          item.name
            .toLowerCase()
            .match(this.filter.productName.toLowerCase())) &&
        (this.filter.barcode === "" ||
          item.barcode.toLowerCase().match(this.filter.barcode.toLowerCase()))
      ) {
        result = true;
      }

      return result;
    }
  }
};
</script>
