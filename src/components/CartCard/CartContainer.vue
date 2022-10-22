<template>
  <b-col :lg="isCartMode ? 4 : 12" md="12">
    <b-card no-body class="body-height box-shadow">
      <b-card-header class="text-center py-0 font-weight-bold">
        <span>SPECIFICATION</span>
        <span class="float-right d-print-none py-2">
          <b-button-group>
            <b-button
              v-if="isCartMode"
              type="button"
              varient="danger"
              @click="clearCart"
              :disabled="!selectedItems.length || loading"
            >
              Clear
            </b-button>
            <template v-if="isInvoiceMode">
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
              <span v-else class="font-weight-bold text-danger">VOIDED</span>
            </template>
          </b-button-group>
        </span>
      </b-card-header>
      <b-card-body class="cart-items-container py-0">
        <div v-if="displayItems.length">
          <table class="table table-sm">
            <thead class="thead-dark">
              <InvoiceHeader :mode="mode" />
            </thead>
            <CartDetail
              v-for="item in displayItems"
              :key="'c' + item.id"
              :product="item"
              :mode="mode"
            />
          </table>
        </div>
        <div v-else>Empty</div>
      </b-card-body>
      <b-card-footer class="py-1">
        <div class="row">
          <div class="col-12">
            <table class="table table-sm table-borderless table-nospacing">
              <tr>
                <td>
                  <InvoiceTerms />
                  <div v-if="isCartMode" class="form-group d-print-none">
                    <label>Amount paid</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="paidAmount"
                    />
                    <div class="d-print-block d-none">
                      Amount paid {{ paidAmount }}
                    </div>
                  </div>
                </td>
                <td>
                  <InvoiceTotal
                    :total="total"
                    :endTotal="endTotal"
                    :change="change"
                    :rounding="rounding"
                    :totalDiscount="totalDiscount"
                    :totalFullPrice="totalFullPrice"
                  />
                </td>
              </tr>
            </table>

            <table
              class="table table-sm text-center table-borderless table-nospacing text-nowrap d-print-table d-none"
            >
              <tr>
                <td width="33%"></td>
                <td>
                  <InvoiceSignFooter />
                </td>
              </tr>
            </table>
          </div>
        </div>
        <template v-if="isCartMode">
          <BuyerInfoForm
            v-if="isCartMode"
            v-model="buyerInfo"
            :checkout="checkout"
          />
          <div v-if="checkout" class="btn-group d-print-none">
            <button type="button" class="btn btn-primary" onclick="print()">
              Afdrukken
            </button>
          </div>
          <button
            type="button"
            class="btn btn-success d-print-none btn-block"
            v-else-if="selectedItems.length > 0"
            @click="createInvoice"
            :disabled="loading"
          >
            <b-spinner small type="grow" v-show="loading"></b-spinner>
            Checkout
          </button>
        </template>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
import InvoiceHeader from "@/components/Invoices/InvoiceHeader.vue";
import InvoiceTotal from "@/components/Invoices/InvoiceTotal.vue";
import InvoiceSignFooter from "@/components/Invoices/InvoiceSignFooter.vue";
import InvoiceTerms from "@/components/Invoices/InvoiceTerms.vue";
import BuyerInfoForm from "@/components/Invoices/BuyerInfoForm.vue";
import CartDetail from "@/components/CartCard/CartDetail.vue";
import { mapState } from "vuex";

const buyerDefaultValue = () => ({
  swipe: "0",
  full_name: "",
  birthdate: "",
  contact_info: ""
});

export default {
  props: {
    mode: String
  },
  data: () => ({
    isEditing: false,
    newTotal: 0,
    isSaving: false,
    isVoiding: false,
    loading: false,
    paidAmount: 0,
    total: 0,
    totalFullPrice: 0,
    endTotal: 0,
    buyerInfo: buyerDefaultValue()
  }),
  components: {
    BuyerInfoForm,
    CartDetail,
    InvoiceTerms,
    InvoiceSignFooter,
    InvoiceTotal,
    InvoiceHeader
  },
  created() {
    this.updateSum();
  },
  computed: {
    ...mapState("shop", ["selectedItems"]),
    ...mapState("shop", ["checkout"]),
    ...mapState("invoice", ["items", "invoice"]),
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    }),
    isCartMode() {
      return this.mode == "cart";
    },
    isInvoiceMode() {
      return this.mode == "invoice";
    },
    displayItems() {
      if (this.isCartMode) {
        return this.selectedItems;
      } else if (this.isInvoiceMode) {
        return this.items;
      }

      return [];
    },
    change() {
      if (this.paidAmount < this.total) {
        return 0;
      }

      return this.paidAmount - this.total;
    },
    totalDiscount() {
      return this.totalFullPrice - this.total;
    },
    rounding() {
      this.endTotal = parseFloat(
        (Math.round(this.total / 0.05) * 0.05).toFixed(2)
      );
      return parseFloat((this.endTotal - this.total).toFixed(2));
    }
  },
  watch: {
    displayItems() {
      this.updateSum();
    }
  },
  methods: {
    voidInvoice() {
      this.$Simplert.open({
        title: "VOID?",
        message: "Are you sure you want to void?",
        type: "danger",
        useConfirmBtn: true,
        customConfirmBtnText: "VOID",
        onConfirm: () => {
          this.isVoiding = true;
          let formData = new FormData();
          formData.append("id", this.invoice.id);
          this.$store.dispatch("invoice/voidInvoice", formData).finally(() => {
            this.isVoiding = false;
          });
        }
      });
    },
    buyerDefaultValue() {
      this.buyerInfo = buyerDefaultValue();
    },
    updateSum() {
      let total = 0;
      let totalFullPrice = 0;
      this.displayItems.forEach(item => {
        let discount = (100 - item.discount) / 100;
        totalFullPrice += item.price * item.quantity;
        total += item.price * discount * item.quantity;
      });
      this.total = total;
      this.totalFullPrice = totalFullPrice;
    },
    generateFormData() {
      let formData = new FormData();
      formData.set("total", this.endTotal);
      formData.set("inventory_id", this.inventory_id);
      formData.set("swipe", this.buyerInfo.swipe);
      formData.set("full_name", this.buyerInfo.full_name);
      formData.set("birthdate", this.buyerInfo.birthdate);
      formData.set("contact_info", this.buyerInfo.contact_info);
      let count = 0;
      this.selectedItems.forEach(item => {
        formData.set(`items[${count}][item_id]`, item.id);
        formData.set(`items[${count}][quantity]`, item.quantity);
        formData.set(`items[${count}][fixed]`, item.fixed ? 1 : 0);
        formData.set(
          `items[${count}][price]`,
          item.price * ((100 - item.discount) / 100)
        );
        formData.set(`items[${count}][discount]`, item.discount);
        count++;
      });
      return formData;
    },
    createInvoice() {
      this.loading = true;
      this.$store
        .dispatch("shop/submitCarShop", this.generateFormData())
        .finally(() => {
          this.loading = false;
        });
    },
    clearCart() {
      this.$Simplert.open({
        title: "Clear?",
        message: "Are you sure you want to clear?",
        type: "warning",
        useConfirmBtn: true,
        customConfirmBtnText: "Yes",
        onConfirm: () => {
          this.$store.commit("shop/RESTORE_CAR_SHOP");
          this.buyerDefaultValue();
        }
      });
    }
  },
  created() {
    if (!this.isInvoiceMode) return;

    this.$store.dispatch("invoice/getInvoice", this.$route.params.id);
    let formData = new FormData();
    formData.set("filter_all", true);
    formData.set("invoice_id", this.$route.params.id);
    this.$store.dispatch("invoice/getItems", formData);
  }
};
</script>

<style scoped>
.cart-items-container {
  overflow-y: auto;
}
</style>
