<template>
  <div>
    <div class="d-print-block d-none">
      <div>
        <img
          src="https://rsiaruba.com/rsi_header.png"
          alt="Logo RSI"
          class="logo"
        />
      </div>
      <div class="invoice-info">
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
              L.G. smith boulevard # 152, Oranjestad, Aruba (KH Super Center
              N.V.)
            </td>
          </tr>
        </table>
      </div>
    </div>
    <b-row>
      <product-container />
      <cart-container />
    </b-row>
  </div>
</template>

<script>
import ProductContainer from "@/components/ProductsCard/ProductContainer";
import CartContainer from "@/components/CartCard/CartContainer";

export default {
  name: "Shop",
  computed: {
    invoiceNumber() {
      return this.$store.state.invoiceInfo.invoiceNumber;
    },
    date() {
      return this.$store.state.invoiceInfo.date;
    }
  },
  components: {
    ProductContainer,
    CartContainer
  }
};
</script>

<style>
.container-fluid {
  margin-top: 2rem;
}

.box-shadow {
  box-shadow: 0 0 8px 3px #b3b3b3;
}

.logo {
  width: 100%;
}

.invoice-info {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
