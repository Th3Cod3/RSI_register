<template>
  <div class="row">
    <div class="col">
      {{ item.name }}
    </div>
    <div class="col">
      {{ item.barcode }}
    </div>
    <div class="col">
      {{ item.type }}
    </div>
    <div class="col">
      <div class="btn-group mr-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-secondary">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDetail",
  props: ["item"],
  data: () => ({})
};
</script>
