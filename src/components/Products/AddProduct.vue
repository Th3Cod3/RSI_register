<template>
  <div>
    <b-button
      variant="success"
      v-b-tooltip.hover.bottom
      title="Add product"
      @click="openModal"
    >
      <i class="fas fa-plus fa-2x"></i>
    </b-button>
    <b-modal
      id="modal-add-product"
      size="xl"
      title="Add product"
      ok-variant="success"
      ok-title="Save"
      :busy="isLoading"
      @ok.prevent="saveProduct"
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
                :options="categoriesOptions"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-form-group label="Radios using options">
              <b-form-radio-group
                id="radio-group-1"
                v-model="meter"
                :options="meterOptions"
                name="radio-options"
              >
                <b-input-group-prepend>
                  <b-form-select
                    id="unit"
                    v-model="bundle_unit_id"
                    :options="unitsOptions"
                    :required="unitRequired"
                  />
                </b-input-group-prepend>
              </b-form-radio-group>
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-form-group label="Packaging" label-for="packaging">
              <b-form-select
                id="packaging"
                v-model="packaging_id"
                :options="packagingsOptions"
              />
            </b-form-group>
          </b-col>

          <b-col md="6" sm="12">
            <b-form-group v-show="meter == '2'" label="Dimensions">
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
            <b-form-group
              v-show="meter == '1'"
              label="Measures"
              label-for="volume"
            >
              <b-input-group>
                <b-form-input
                  id="volume"
                  v-model="bundle_volume"
                  type="number"
                  placeholder="Volume"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AddProduct",
  data: () => ({
    name: "",
    bundle_volume: null,
    sub_category_id: null,
    bundle_unit_id: null,
    packaging_id: null,
    barcode: null,
    meter: 1,
    meterOptions: [
      { text: "Measures", value: "1" },
      { text: "Dimensions", value: "2" }
    ],
    dimensionsObj: {
      lenght: null,
      width: null,
      height: null
    },
    isLoading: false
  }),
  watch: {
    meter() {
      this.dimensionsObj = {
        lenght: null,
        width: null,
        height: null
      };
      this.bundle_volume = null;
    }
  },
  created() {
    this.$store.dispatch("product/loadDetailsOptions");
  },
  computed: {
    ...mapState("product", {
      subCategories: state => state.details.subCategories,
      units: state => state.details.units,
      packagings: state => state.details.packagings
    }),
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    }),
    unitRequired() {
      return (
        this.dimensionsObj.lenght ||
        this.dimensionsObj.width ||
        this.dimensionsObj.height ||
        this.bundle_volume
      );
    },
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
    categoriesOptions() {
      let categories = this.subCategories.map(category => {
        return {
          value: category.id,
          text: category.name
        };
      });
      return [{ value: null, text: "Select option" }, ...categories];
    },
    unitsOptions() {
      let units = this.units.map(unit => {
        return {
          value: unit.id,
          text: unit.name
        };
      });
      return [{ value: null, text: "Select option" }, ...units];
    },
    packagingsOptions() {
      let packagings = this.packagings.map(unit => {
        return {
          value: unit.id,
          text: unit.name
        };
      });
      return [{ value: null, text: "Select option" }, ...packagings];
    }
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-add-product");
    },
    saveProduct() {
      this.$refs.form.requestSubmit();
    },
    handleSubmit() {
      let formData = new FormData();
      formData.set("name", this.name);
      formData.set("bundle_volume", this.bundle_volume);
      formData.set("inventory_id", this.inventory_id);
      formData.set("bundle_unit_id", this.bundle_unit_id);
      formData.set("sub_category_id", this.sub_category_id);
      formData.set("packaging_id", this.packaging_id);
      formData.set("dimensions", this.dimensions);
      formData.set("barcode", this.barcode);
      this.isLoading = true;
      this.$store
        .dispatch("product/saveProduct", formData)
        .then(data => {
          this.$router.push({ name: "product", params: { id: data.id } });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
