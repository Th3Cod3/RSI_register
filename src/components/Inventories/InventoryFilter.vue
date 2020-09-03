<template>
  <b-row>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Name">
        <input type="text" class="form-control" v-model="name" />
      </b-form-group>
    </b-col>
    <b-col>
      <div class="float-right">
        <!-- add inventory -->
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "InventoryFilter",
  data: () => ({
    name: "",
    barcode: ""
  }),
  watch: {
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
      formData.set("name", this.name);
      this.$store.dispatch("inventory/getInventories", formData);
    }
  }
};
</script>
