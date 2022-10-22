<template>
  <div class="d-print-none" v-if="!checkout">
    <div class="form-group">
      <label for="full_name">Full name</label>
      <input
        type="text"
        class="form-control"
        v-model="buyerInfo.full_name"
        id="full_name"
      />
    </div>
    <div class="form-group">
      <label for="birthdate">Birth information</label>
      <input
        type="date"
        class="form-control"
        v-model="buyerInfo.birthdate"
        id="birthdate"
      />
    </div>
    <div class="form-group">
      <label for="contact_info">Contact information</label>
      <input
        type="text"
        class="form-control"
        v-model="buyerInfo.contact_info"
        id="contact_info"
      />
    </div>
    <b-form-checkbox v-model="buyerInfo.swipe" value="1" unchecked-value="0">
      Swipe
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    checkout: Boolean
  },
  computed: {
    buyerInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>