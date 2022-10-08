<template>
  <b-row>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Product name">
        <input type="text" class="form-control" v-model="name" />
      </b-form-group>
    </b-col>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Barcode">
        <b-form-input type="text" class="form-control" v-model="barcode" />
      </b-form-group>
    </b-col>
    <b-col v-if="shop">
      <div class="float-right">
        <b-button variant="outline-secondary" @click="clearSearch">
          <i class="far fa-times-circle fa-2x"></i>
        </b-button>
        <b-button
          variant="outline-secondary"
          class="mx-2"
          @click="removeBarcodeSides"
        >
          <i class="fas fa-barcode fa-2x"></i>
        </b-button>
      </div>
    </b-col>
    <b-col v-else>
      <div class="float-right">
        <add-product />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import AddProduct from "@/components/Products/AddProduct.vue";
import { mapState } from "vuex";

export default {
  props: {
    shop: {
      type: Boolean,
      default: true
    },
    order: {
      type: String,
      default: ""
    },
    extraInfo: {
      type: Boolean,
      default: false
    }
  },
  name: "ProductFilter",
  data: () => ({
    name: "",
    barcode: ""
  }),
  computed: {
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    })
  },
  components: {
    AddProduct
  },
  watch: {
    barcode() {
      this.submit();
    },
    name() {
      this.submit();
    }
  },
  created() {
    this.submit();
  },
  methods: {
    submit() {
      let formData = new FormData();
      this.extraInfo ? formData.set("extra-info", true) : null;
      this.order ? formData.set("order", this.order) : null;
      formData.set("name", this.name);
      formData.set("inventory_id", this.inventory_id);
      formData.set("barcode", this.barcode);
      this.$store.dispatch("product/getProducts", formData);
    },
    clearSearch() {
      this.name = "";
      this.barcode = "";
    },
    removeBarcodeSides() {
      this.barcode = this.barcode.substring(this.barcode.length - 1, 1);
    }
  }
};
</script>
