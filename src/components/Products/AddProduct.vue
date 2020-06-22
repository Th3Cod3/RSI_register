<template>
  <b-modal
    id="modal-add-product"
    size="xl"
    title="Add product"
    ok-variant="success"
    ok-title="Save"
    @hide="closeModal"
    @ok="saveProduct"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Name" label-for="product-name">
            <b-form-input
              id="product-name"
              v-model="name"
              placeholder="Product name"
              required
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Barcode" label-for="barcode">
            <b-form-input
              id="barcode"
              v-model="barcode"
              placeholder="Barcode"
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Category" label-for="category">
            <b-form-select
              id="category"
              v-model="sub_category_id"
              :options="categories"
              required
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Measures" label-for="volume">
            <b-input-group>
              <b-form-input
                id="volume"
                v-model="bundle_volume"
                type="number"
                placeholder="Volume"
              />
              <b-input-group-prepend>
                <b-form-select
                  id="unit"
                  v-model="bundle_unit_id"
                  :options="units"
                />
              </b-input-group-prepend>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Packaging" label-for="packaging">
            <b-form-select
              id="packaging"
              v-model="packaging_id"
              :options="packagings"
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Dimensions">
            <b-input-group>
              <b-input-group-append>
                <b-form-input
                  v-model="dimensionsObj.lenght"
                  type="number"
                  placeholder="Lenght"
                />
              </b-input-group-append>
              <b-form-input
                v-model="dimensionsObj.width"
                type="number"
                placeholder="Width"
              />
              <b-input-group-prepend>
                <b-form-input
                  v-model="dimensionsObj.height"
                  type="number"
                  placeholder="Height"
                />
              </b-input-group-prepend>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  data: () => ({
    name: "",
    bundle_volume: null,
    sub_category_id: null,
    bundle_unit_id: null,
    packaging_id: null,
    barcode: null,
    dimensionsObj: {
      lenght: null,
      width: null,
      height: null
    }
  }),
  created() {
    this.$store.dispatch("categories");
    this.$store.dispatch("subCategories");
    this.$store.dispatch("units");
    this.$store.dispatch("packagings");
  },
  computed: {
    dimensions() {
      let result = "";
      if (this.dimensionsObj.lenght) {
        result += `L${this.dimensionsObj.lenght}`;
      }
      if (this.dimensionsObj.width) {
        result += `W${this.dimensionsObj.width}`;
      }
      if (this.dimensionsObj.height) {
        result += `H${this.dimensionsObj.height}`;
      }
      return result;
    },
    openModal() {
      return this.$store.state.modals.product.add;
    },
    categories() {
      let categories = this.$store.state.options.subCategories.map(category => {
        return {
          value: category.id,
          text: category.name
        };
      });
      return [{ value: null, text: "Select option" }, ...categories];
    },
    units() {
      let units = this.$store.state.options.units.map(unit => {
        return {
          value: unit.id,
          text: unit.name
        };
      });
      return [{ value: null, text: "Select option" }, ...units];
    },
    packagings() {
      let packagings = this.$store.state.options.packagings.map(unit => {
        return {
          value: unit.id,
          text: unit.name
        };
      });
      return [{ value: null, text: "Select option" }, ...packagings];
    }
  },
  watch: {
    openModal() {
      if (this.openModal) {
        this.$bvModal.show("modal-add-product");
      }
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal", "add-product");
    },
    saveProduct(e) {
      e.preventDefault();
      this.$refs.form.requestSubmit();
    },
    handleSubmit() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("bundle_volume", this.bundle_volume);
      formData.set("bundle_unit_id", this.bundle_unit_id);
      formData.set("sub_category_id", this.sub_category_id);
      formData.set("packaging_id", this.packaging_id);
      formData.set("dimensions", this.dimensions);
      formData.set("barcode", this.barcode);
      this.$store.dispatch("saveProduct", formData).then(data => {
        this.$router.push({ name: "product", params: { id: data.id } });
      });
    }
  }
};
</script>
