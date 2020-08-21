<template>
  <div class="d-print-block d-none">
    <div>
      <img
        src="https://rsiaruba.com/rsi_header.png"
        alt="Logo RSI"
        class="logo"
      />
    </div>
    <div class="invoice-info mt-4">
      <span>Factuurnummer: {{ invoiceNumber }}</span>
      <span class="float-right">Factuurdatum: {{ date }}</span>
    </div>
    <div class="my-2">
      <table class="table table-sm table-borderless">
        <tr>
          <td>Verkoopmethode:</td>
          <td class="font-weight-bold">Openbare verkoop</td>
        </tr>
        <tr>
          <td>Plaats van verkoop:</td>
          <td class="font-weight-bold">
            <span v-if="inventory.inventory_of.address">
              {{ inventory.inventory_of.address.street_name }} #
              {{ inventory.inventory_of.address.address_no }},
              {{ inventory.inventory_of.address.country_name_en }}
            </span>
            ({{ inventory.inventory_of.handle_name }})
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PrintInvoiceHEader",
  computed: {
    ...mapState("shop", ["invoiceNumber", "date"]),
    ...mapState("inventory", ["inventory"])
  }
};
</script>

<style>
.logo {
  width: 100%;
}

.invoice-info {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
