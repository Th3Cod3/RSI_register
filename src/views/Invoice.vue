<template>
  <div>
    <print-invoice-header />
    <b-card no-body class="body-height box-shadow">
      <b-card-header>
        <span class="d-print-none">Factuur {{ invoice.invoice_number }}</span>
        <span class="d-none d-print-block">Productlijst</span>
        <span class="float-right">
          <b-button
            :disabled="isVoiding"
            class="d-print-none"
            variant="danger"
            v-if="!invoice.voided_by"
            @click="voidInvoice"
          >
            <b-spinner small type="grow" v-show="isVoiding"></b-spinner>
            VOID
          </b-button>
          <span v-else class="font-weight-bold">VOIDED</span>
        </span>
      </b-card-header>
      <b-card-body>
        <invoice-items />
      </b-card-body>
      <b-card-footer class="text-right">
        <span class="total-summary">Totaal {{ totalInvoice | money }}</span>
        <br />
        <span class="total-summary">
          Korting {{ (totalInvoice - invoice.total) | money }}
        </span>
        <br />
        <span v-show="isEditing">
          <input
            ref="totalInvoice"
            type="number"
            @blur="saveEdit"
            @keyup.enter="saveEdit"
            @keyup.esc="isEditing = false"
            v-model="newTotal"
          />
        </span>
        <span class="total" @click="editTotal" v-show="!isEditing">
          <b-spinner small v-show="isSaving" type="grow"></b-spinner>
          Eindtotaal {{ invoice.total | roundMoney }}
        </span>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import invoiceItems from "@/components/Invoices/InvoiceItems";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader";
import { mapState } from "vuex";

export default {
  data: () => ({
    isEditing: false,
    newTotal: 0,
    isSaving: false,
    isVoiding: false
  }),
  components: {
    invoiceItems,
    PrintInvoiceHeader
  },
  computed: {
    ...mapState("invoice", ["items", "invoice"]),
    totalInvoice() {
      let total = 0;
      this.items.forEach(item => {
        total += (item.price / ((100 - item.discount) / 100)) * item.quantity;
      });
      return total;
    }
  },
  created() {
    this.$store.dispatch("invoice/getInvoice", this.$route.params.id);
    let formData = new FormData();
    formData.set("filter_all", true);
    formData.set("invoice_id", this.$route.params.id);
    this.$store.dispatch("invoice/getItems", formData);
  },
  methods: {
    editTotal() {
      this.isEditing = true;
      this.newTotal = this.invoice.total;
      setTimeout(() => {
        this.$refs.totalInvoice.focus();
      }, 0);
    },
    saveEdit() {
      if (this.isEditing) {
        this.isEditing = false;
        if (this.invoice.total != this.newTotal) {
          let formData = new FormData();
          formData.append("id", this.invoice.id);
          formData.append("total", this.newTotal);
          this.isSaving = true;
          this.$store
            .dispatch("invoice/updateInvoice", formData)
            .finally(() => {
              this.isSaving = false;
            });
        }
      }
    },
    voidInvoice() {
      this.$confirm("Are you sure you want to void?", "VOID?", "warning", {
        confirmButtonText: "VOID"
      })
        .then(() => {
          this.isVoiding = true;
          let formData = new FormData();
          formData.append("id", this.invoice.id);
          this.$store.dispatch("invoice/voidInvoice", formData).finally(() => {
            this.isVoiding = false;
          });
        })
        .catch(() => {});
    },
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
  }
};
</script>
