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
            v-model="newTotal"
          />
        </span>
        <span class="total" @click="editTotal" v-show="!isEditing">
          <i class="fas fa-spinner fa-pulse" v-if="isSaving"></i>
          Eindtotaal {{ invoice.total | money }}
        </span>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import apiService from "@/services/api-service.js";
import { NL_date } from "@/services/date.js";
import invoiceItems from "@/components/Invoices/InvoiceItems";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader";

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
    totalInvoice() {
      return this.$store.getters.totalInvoice;
    },
    invoice: {
      get() {
        return this.$store.state.invoice;
      },
      set(invoice) {
        this.$store.commit("invoice", invoice);
      }
    },
    invoiceItems: {
      get() {
        return this.$store.state.invoiceItems;
      },
      set(invoiceItems) {
        this.$store.commit("invoiceItems", invoiceItems);
      }
    }
  },
  beforeDestroy() {
    this.invoiceItems = [];
    this.invoice = {};
  },
  created() {
    if (this.$store.state.invoices) {
      this.invoice = this.$store.state.invoices.find(
        invoice => invoice.id === this.$route.params.id
      );
      this.$store.commit("invoiceInfo", {
        invoiceNumber: this.invoice.invoice_number,
        date: NL_date(this.invoice.created_at)
      });
      this.newTotal = this.invoice.total;
    } else {
      apiService
        .getInvoice(this.$route.params.id)
        .then(data => {
          this.invoice = data;
          this.newTotal = data.total;
          this.$store.commit("invoiceInfo", {
            invoiceNumber: data.invoice_number,
            date: NL_date(data.created_at)
          });
        })
        .finally(() => {
          this.$store.commit("loadingItems", false);
        });
    }
    let formData = new FormData();
    formData.append("invoice_id", this.$route.params.id);
    apiService
      .getInvoiceItems(formData)
      .then(data => {
        this.invoiceItems = data;
      })
      .finally(() => {
        this.$store.commit("loadingItems", false);
      });
  },
  methods: {
    editTotal() {
      this.isEditing = true;
      setTimeout(() => {
        this.$refs.totalInvoice.focus();
      }, 0);
    },
    saveEdit() {
      this.isEditing = false;
      let formData = new FormData();
      formData.append("id", this.invoice.id);
      formData.append("total", this.newTotal);
      this.isSaving = true;
      apiService
        .updateInvoice(formData)
        .then(invoice => {
          this.invoice = invoice;
        })
        .finally(() => {
          this.isSaving = false;
        });
    },
    voidInvoice() {
      this.$confirm("Are you sure you want to void?", "VOID?", "warning", {
        confirmButtonText: "VOID"
      })
        .then(() => {
          this.isVoiding = true;
          let formData = new FormData();
          formData.append("id", this.invoice.id);
          apiService
            .voidInvoice(formData)
            .then(invoice => {
              this.invoice = invoice;
            })
            .finally(() => {
              this.isVoiding = false;
            });
        })
        .catch(() => {});
    },
    filterMoney(value) {
      return this.$options.filters.money(value);
    },
    selectInvoice(invoice) {
      this.$router.push({ name: "invoice", params: { id: invoice.id } });
    }
  }
};
</script>
