<template>
  <div class="d-print-block d-none">
    <div>
      <img
        src="https://rsiaruba.com/rsi_header.png"
        alt="Logo RSI"
        class="logo"
      />
    </div>
    <hr class="border-danger my-1" style="border: solid 2px" />
    <div class="invoice-info">
      <span>
        Invoice number:
        {{ invoice_number }}
      </span>
      <span class="float-right">
        Date of sale:
        {{ created_at | date }}
      </span>
    </div>
    <hr class="border-danger my-1" style="border: solid 2px" />
    <div class="my-2" style="line-height: 1rem;">
      <table
        class="table table-sm table-borderless table-nospacing mb-0 text-nowrap"
      >
        <tr>
          <td
            class="text-danger display-4 font-weight-bold"
            rowspan="4"
            style="width: 70%;"
          >
            ORIGINAL
          </td>
          <td class="text-right">
            <span class="font-weight-bold">E. E. SOEMERS SERVICES N.V.</span>
            d.b.a.
          </td>
        </tr>
        <tr>
          <td class="text-right font-weight-bold">
            Recovery Solutions & Investigations (RSI)
          </td>
        </tr>
        <tr>
          <td class="text-right">
            Personal number (Tax office)
            <span class="font-weight-bold">5025411</span>
          </td>
        </tr>
        <tr>
          <td class="text-right">
            Registration number (Kvk)
            <span class="font-weight-bold">38293.0</span>
          </td>
        </tr>
        <tr>
          <td>
            <table class="table table-sm table-borderless table-nospacing">
              <tr>
                <td colspan="2" class="font-weight-bold">
                  Mr. J.M. DE CUBA, Esquire, q.q. liquidator of:
                </td>
              </tr>
              <tr>
                <td style="width: 120px;">Statutory name</td>
                <td class="font-weight-bold">
                  {{ inventory.inventory_of.company_name }}
                </td>
              </tr>
              <tr>
                <td>Trade name</td>
                <td class="font-weight-bold">
                  {{ inventory.inventory_of.handle_name }}
                </td>
              </tr>
            </table>
          </td>
          <td class="text-right pt-1">
            <table class="table table-sm table-borderless table-nospacing">
              <tr>
                <td colspan="2" class="font-weight-bold text-nowrap">
                  <u>METHOD OF PAYMENT:</u>
                </td>
              </tr>
              <tr>
                <td class="text-nowrap">Bank</td>
                <td class="font-weight-bold">ARUBA BANK N.V.</td>
              </tr>
              <tr>
                <td class="text-nowrap">Account no.</td>
                <td class="font-weight-bold">2554020190</td>
              </tr>
              <tr>
                <td class="text-nowrap">Account name</td>
                <td class="font-weight-bold">
                  Recovery Solutions & Investigations
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <hr class="border-danger my-1" style="border: solid 2px" />
      <table class="table table-sm table-borderless table-nospacing">
        <tr>
          <td colspan="2" class="font-weight-bold">
            <u>BUYER INFORMATION:</u>
          </td>
        </tr>
        <tr>
          <td style="width: 200px;">Full name</td>
          <td v-if="full_name" class="font-weight-bold">{{ full_name }}</td>
        </tr>
        <tr>
          <td>Birth information</td>
          <td v-if="birthdate" class="font-weight-bold">
            {{ birthdate | date }}
          </td>
        </tr>
        <tr>
          <td>Contact information</td>
          <td v-if="contact_info" class="font-weight-bold">
            {{ contact_info }}
          </td>
        </tr>
      </table>

      <hr class="my-1" style="border: solid 2px" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    mode: String
  },
  computed: {
    ...mapState("shop", ["invoiceNumber", "date", "buyerInfo"]),
    ...mapState("shop", ["buyerInfo"]),
    ...mapState("invoice", ["invoice"]),
    ...mapState("inventory", ["inventory"]),
    isCartMode() {
      return this.mode == "cart";
    },
    isInvoiceMode() {
      return this.mode == "invoice";
    },
    contact_info() {
      if (this.isCartMode) {
        return this.buyerInfo.contact_info;
      } else if (this.isInvoiceMode) {
        return this.invoice.contact_info;
      }
    },
    birthdate() {
      if (this.isCartMode) {
        return this.buyerInfo.birthdate;
      } else if (this.isInvoiceMode) {
        return this.invoice.birthdate;
      }
    },
    full_name() {
      if (this.isCartMode) {
        return this.buyerInfo.full_name;
      } else if (this.isInvoiceMode) {
        return this.invoice.full_name;
      }
    },
    created_at() {
      if (this.isCartMode) {
        return this.date;
      } else if (this.isInvoiceMode) {
        return this.invoice.created_at;
      }
    },
    invoice_number() {
      if (this.isCartMode) {
        return this.invoiceNumber;
      } else if (this.isInvoiceMode) {
        return this.invoice.invoice_number;
      }
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

.table-nospacing > tr > td {
  padding: 0;
  margin: 0;
}

.table-nospacing > tr {
  padding: 0;
  margin: 0;
}
</style>
