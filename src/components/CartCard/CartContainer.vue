<template>
  <b-col lg="4" md="12">
    <b-card no-body class="body-height box-shadow">
      <b-card-header class="text-center py-0 font-weight-bold">
        <span>SPECIFICATION</span>
        <span class="float-right d-print-none py-2">
          <b-button-group>
            <b-button type="button" varient="danger" @click="clearCart" :disabled="!selectedItems.length || loading">
              Clear
            </b-button>
          </b-button-group>
        </span>
      </b-card-header>
      <b-card-body class="cart-items-container py-0">
        <div v-if="selectedItems.length">
          <table class="table table-sm">
            <thead class="thead-dark">
              <tr>
                <th class="text-nowrap">Description</th>
                <th class="text-right">Qty.</th>
                <th class="d-print-table-cell d-none text-nowrap text-right">Unit</th>
                <th class="d-print-table-cell d-none text-nowrap text-right">Price per unit</th>
                <th class="text-right">Subtotal</th>
              </tr>
            </thead>
            <cart-detail v-for="item in selectedItems" :key="'c' + item.id" :product="item" />
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
                  <div class="d-print-block d-none">
                    <u class="font-weight-bold" style="font-size: .8rem;">TERMS AND CONDITIONS:</u>
                    <ol class="pl-4 pr-5" style="font-size: .6rem; line-height: .8rem; text-align: justify;">
                      <li>
                        The total sales price is due upon purchase. If for any reason, there is still an open balance,
                        it shall become overdue on the day after the sale has taken place.
                        If the invoice becomes overdue, a delay interest rate of 18% per year
                        shall be enforceable until the invoice is paid off in full.
                      </li>
                      <li>
                        If for any reason, the seller would have to go to the buyer to collect a payment, there will be
                        an additional distance charge of Afl. 25,00 for each time.
                      </li>
                      <li>
                        If for any reason the invoice (and additional charges as described in articles 1 and 2)
                        is still not paid off after 30 days,
                        the seller retains the right to collect the overdue amount with the help of an attorney,
                        bailiff, or debt collection agency of choice.
                        All legal and/or extrajudicial costs will ultimately be borne by the buyer.
                      </li>
                      <li>
                        The buyer purchases the described items “as is where is”, and hereby accepts that there is no
                        return policy.
                      </li>
                      <li>
                        The buyer shall take the purchased items with him immediately after completion of the purchase.
                        If for any reason the buyer needs to come pick up any of the purchased items on a later date,
                        these items can only be claimed after presentation of this original (signed) invoice.
                        If for any reason the purchased items are still unclaimed three (3) days
                        after the sale has taken place, the buyer shall no longer be entitled to claim these items.
                        The already paid money shall be considered fees for cancellation
                        of sale and for storage of the items.
                      </li>
                      <li>
                        Upon signing this invoice, the buyer accepts all the terms and conditions of the sale.
                      </li>
                    </ol>
                  </div>
                  <div class="form-group d-print-none">
                    <label>Amount paid</label>
                    <input type="number" class="form-control" v-model="paidAmount" />
                    <div class="d-print-block d-none">
                      Amount paid {{ paidAmount }}
                    </div>
                  </div>
                </td>
                <td>
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
                      <tr class="table-secondary font-weight-bold border-dark"
                        style="border-bottom: solid 2px;border-top: solid 2px;">
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
                      <tr class="d-print-table-row d-none border-bottom" style="border-top: solid 2px;">
                        <td class="pr-2">Open balance</td>
                        <td></td>
                      </tr>
                    </table>
                  </span>
                </td>
              </tr>
            </table>
            <table class="table table-sm text-center table-borderless table-nospacing text-nowrap d-print-table d-none">
              <tr>
                <td width="33%"></td>
                <td>
                  <table class="table table-sm table-nospacing">
                    <tr>
                      <td class="border" width="300px"></td>
                      <td width="20px"></td>
                      <td class="border" width="300px">
                        <div class="border-bottom" style="line-height: 1rem; font-size: .8rem;">
                          <div class="font-weight-bold">
                            Issued in Oranjestad, Aruba:
                          </div>
                          <div class="font-weight-bold">
                            {{ dateNow | date }}
                          </div>
                        </div>
                        <img src="https://rsiaruba.com/rsi_logo.png" width="250px" />
                      </td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold border" style="border-top: solid 2px !important;">The buyer</td>
                      <td></td>
                      <td class="font-weight-bold border" style="border-top: solid 2px !important;">{{ employeeName}}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="d-print-none" v-if="!checkout">
          <div class="form-group">
            <label for="full_name">Full name</label>
            <input type="text" class="form-control" v-model="buyerInfo.full_name" id="full_name">
          </div>
          <div class="form-group">
            <label for="birthdate">Birth information</label>
            <input type="date" class="form-control" v-model="buyerInfo.birthdate" id="birthdate">
          </div>
          <div class="form-group">
            <label for="contact_info">Contact information</label>
            <input type="text" class="form-control" v-model="buyerInfo.contact_info" id="contact_info">
          </div>
          <b-form-checkbox v-model="buyerInfo.swipe" value="1" unchecked-value="0">
            Swipe
          </b-form-checkbox>
        </div>
        <div v-if="checkout" class="btn-group d-print-none">
          <button type="button" class="btn btn-primary" onclick="print()">
            Afdrukken
          </button>
        </div>
        <button type="button" class="btn btn-success d-print-none btn-block" v-else-if="selectedItems.length > 0"
          @click="saveInvoice" :disabled="loading">
          <b-spinner small type="grow" v-show="loading"></b-spinner>
          Checkout
        </button>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
import CartDetail from "@/components/CartCard/CartDetail.vue";
import { mapState } from "vuex";
const buyerDefaultValue = () => ({
  swipe: "0",
  full_name: "",
  birthdate: "",
  contact_info: ""
})

export default {
  data: () => ({
    loading: false,
    paidAmount: 0,
    total: 0,
    totalFullPrice: 0,
    endTotal: 0,
    buyerInfo: buyerDefaultValue()
  }),
  components: {
    CartDetail,
  },
  created() {
    this.updateSum();
  },
  computed: {
    ...mapState("shop", ["selectedItems"]),
    ...mapState("shop", ["checkout"]),
    ...mapState("user", ["userInfo"]),
    ...mapState("inventory", {
      inventory_id: (state) => state.inventory.inventory_id,
    }),
    dateNow() {
      return Date.now()
    },
    employeeName() {
      let initial = this.userInfo.middlename.charAt(0);
      return `${this.userInfo.firstname} ${initial ? initial + '.' : ''} ${this.userInfo.lastname}`
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
      this.endTotal = parseFloat((Math.round(this.total/0.05)*0.05).toFixed(2));
      return parseFloat((this.endTotal - this.total).toFixed(2));
    },
  },
  watch: {
    selectedItems() {
      this.updateSum();
    },
  },
  methods: {
    buyerDefaultValue() {
      this.buyerInfo = buyerDefaultValue();
    },
    updateSum() {
      let total = 0;
      let totalFullPrice = 0;
      this.selectedItems.forEach((item) => {
        let discount = (100 - item.discount) / 100;
        totalFullPrice += item.price * item.quantity;
        total += item.price * discount * item.quantity;
      });
      this.total = total;
      this.totalFullPrice = totalFullPrice;
    },
    generateFormData() {
      let formData = new FormData();
      formData.set("total", this.total);
      formData.set("inventory_id", this.inventory_id);
      formData.set("swipe", this.buyerInfo.swipe);
      formData.set("full_name", this.buyerInfo.full_name);
      formData.set("birthdate", this.buyerInfo.birthdate);
      formData.set("contact_info", this.buyerInfo.contact_info);
      let count = 0;
      this.selectedItems.forEach((item) => {
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
    saveInvoice() {
      this.loading = true;
      this.$store
        .dispatch("shop/submitCarShop", this.generateFormData())
        .finally(() => {
          this.loading = false;
        });
    },
    clearCart() {
      this.$Simplert.open({
        title: 'Clear?',
        message: 'Are you sure you want to clear?',
        type: 'warning',
        useConfirmBtn: true,
        customConfirmBtnText: "Yes",
        onConfirm: () => {
          this.$store.commit("shop/RESTORE_CAR_SHOP");
          this.buyerDefaultValue();
        }
      })
    },
  },
};
</script>

<style scoped>
.cart-items-container {
  overflow-y: auto;
}
</style>
