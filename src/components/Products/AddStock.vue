<template>
  <b-button
    variant="primary"
    v-b-tooltip.hover.bottom
    title="Add stock"
    @click="openModal"
  >
    <i class="fas fa-boxes"></i>
    <b-modal
      id="modal-add-product-stock"
      size="xl"
      title="Add product stock"
      ok-variant="success"
      ok-title="Save"
      :busy="isLoading"
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
                placeholder="Amount"
                required
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </b-button>
</template>

<script>
export default {
  props: ["productId"],
  data: () => ({
    quantity: null,
    isLoading: false
  }),
  methods: {
    openModal() {
      this.$bvModal.show("modal-add-product-stock");
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
        .dispatch("product/addStock", formData)
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
