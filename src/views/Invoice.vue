<template>
  <div>
    <PrintInvoiceHeader mode="invoice" />
    <b-row>
      <CartContainer mode="invoice" />
    </b-row>
  </div>
</template>

<script>
import CartContainer from '@/components/CartCard/CartContainer.vue'
import invoiceItems from "@/components/Invoices/InvoiceItems.vue";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader.vue";

export default {
  components: {
    invoiceItems,
    PrintInvoiceHeader,
    CartContainer,
  },
};
</script>
