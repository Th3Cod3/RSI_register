<template>
  <b-modal
    id="modal-add-product-stock"
    size="xl"
    title="Add product stock"
    ok-variant="success"
    ok-title="Save"
    :busy="isLoading"
    @hide="closeModal"
    @ok="saveStock"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-row>
        <b-col cols="12">
          <b-form-group label="Amount" label-for="stock">
            <b-form-input
              id="stock"
              v-model="quantity"
              type="number"
              step="1"
              min="1"
              placeholder="Amount"
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
    quantity: null,
    isLoading: false
  }),
  computed: {
    openModal() {
      return this.$store.state.modals.product.stock;
    }
  },
  watch: {
    openModal() {
      if (this.openModal) {
        this.$bvModal.show("modal-add-product-stock");
      }
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeModal", "add-product-stock");
    },
    saveStock(e) {
      e.preventDefault();
      this.$refs.form.requestSubmit();
    },
    handleSubmit() {
      this.isLoading = true;
      let formData = new FormData();
      formData.set("quantity", this.quantity);
      formData.set("id", this.productId);
      this.$store
        .dispatch("addStock", formData)
        .then(() => {
          this.$bvModal.hide("modal-add-product-stock");
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
