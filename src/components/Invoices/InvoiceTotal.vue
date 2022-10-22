<template>
  <span class="float-right text-right">
    <table class="table table-sm table-borderless table-nospacing text-nowrap">
      <tr class="border-bottom" v-if="totalDiscount">
        <td class="pr-2">Subtotal</td>
        <td class="font-weight-bold">{{ totalFullPrice | money }}</td>
      </tr>
      <tr class="border-bottom" v-if="totalDiscount">
        <td class="pr-2">Discount</td>
        <td class="font-weight-bold">-{{ totalDiscount | money }}</td>
      </tr>
      <tr class="border-bottom">
        <td class="pr-2">Total before rounding</td>
        <td class="font-weight-bold">{{ total | money }}</td>
      </tr>
      <tr class="border-bottom">
        <td class="pr-2">Rounding</td>
        <td class="font-weight-bold">{{ rounding | money }}</td>
      </tr>
      <tr
        class="table-secondary font-weight-bold border-dark"
        style="border-bottom: solid 2px;border-top: solid 2px;"
      >
        <td class="pr-2">Total</td>
        <td>{{ endTotal | money }}</td>
      </tr>
      <tr class="d-print-none">
        <td>Change</td>
        <td>{{ change | roundMoney }}</td>
      </tr>
      <tr class="d-print-table-row d-none border-bottom">
        <td>Applied payment: Swipe</td>
        <td></td>
      </tr>
      <tr class="d-print-table-row d-none border-bottom">
        <td>Payment received: Cash</td>
        <td></td>
      </tr>
      <tr
        class="d-print-table-row d-none border-bottom"
        style="border-top: solid 2px;"
      >
        <td class="pr-2">Open balance</td>
        <td></td>
      </tr>
    </table>
  </span>
</template>

<script>
export default {
  props: {
    totalDiscount: {
      default: 0
    },
    totalFullPrice: {
      default: 0
    },
    change: {
      default: 0
    },
    endTotal: {
      default: 0
    },
    rounding: {
      default: 0
    },
    total: {
      default: 0
    }
  }
}
</script>