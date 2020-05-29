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
            L.G. smith boulevard # 152, Oranjestad, Aruba (KH Super Center N.V.)
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrintInvoiceHEader",
  computed: {
    invoiceNumber() {
      return this.$store.state.invoiceInfo.invoiceNumber;
    },
    date() {
      return this.$store.state.invoiceInfo.date;
    }
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
