<template>
  <b-modal
    id="modal-add-product-price"
    size="xl"
    title="Add product price"
    ok-variant="success"
    ok-title="Save"
    :busy="isLoading"
    @hide="closeModal"
    @ok="savePrice"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Begin from" label-for="in_date">
            <b-form-input
              id="in_date"
              v-model="in_date"
              type="date"
              disabled
              :required="now ? true : false"
            />
            <b-form-checkbox
              v-model="now"
              value="1"
              unchecked-value="0"
              disabled
            >
              Now
            </b-form-checkbox>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Price" label-for="price">
            <b-form-input
              id="price"
              v-model="price"
              type="number"
              step="0.001"
              min="0"
              placeholder="Product price"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  props: ["productId"],
  data: () => ({
    price: null,
    in_date: null,
    now: "1",
    isLoading: false
  }),
  computed: {
    openModal() {
      return this.$store.state.modals.product.price;
    }
  },
  watch: {
    openModal() {
      if (this.openModal) {
        this.$bvModal.show("modal-add-product-price");
      }
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal", "add-product-price");
    },
    savePrice(e) {
      e.preventDefault();
      this.$refs.form.requestSubmit();
    },
    handleSubmit() {
      this.isLoading = true;
      let formData = new FormData();
      formData.set("price", this.price);
      formData.set("in_date", this.in_date);
      formData.set("now", this.now);
      formData.set("id", this.productId);
      this.$store
        .dispatch("addPrice", formData)
        .then(() => {
          this.$bvModal.hide("modal-add-product-price");
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
