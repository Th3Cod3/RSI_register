<template>
  <b-button
    variant="primary"
    v-b-tooltip.hover.bottom
    title="Apply discount"
    @click="openModal"
  >
    <i class="fas fa-percentage"></i>
    <b-modal
      id="modal-add-product-discount"
      size="xl"
      title="Add product discount"
      ok-variant="success"
      ok-title="Save"
      :busy="isLoading"
      @ok.prevent="saveDiscount"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Begin from" label-for="start_date">
              <b-form-input
                id="start_date"
                v-model="start_date"
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
            <b-form-group label="discount" label-for="discount">
              <b-form-input
                id="discount"
                v-model="discount"
                type="number"
                placeholder="Product discount percentage (%)"
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
    discount: null,
    start_date: null,
    now: "1",
    isLoading: false
  }),
  methods: {
    openModal() {
      this.$bvModal.show("modal-add-product-discount");
    },
    saveDiscount() {
      this.$refs.form.requestSubmit();
    },
    handleSubmit() {
      let formData = new FormData();
      formData.set("discount", this.discount);
      formData.set("start_date", this.start_date);
      formData.set("now", this.now);
      formData.set("id", this.productId);
      this.$store
        .dispatch("product/addDiscount", formData)
        .then(() => {
          this.$bvModal.hide("modal-add-product-discount");
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
