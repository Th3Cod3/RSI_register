<template>
  <div class="d-print-block d-none">
    <div>
      <img src="https://rsiaruba.com/rsi_header.png" alt="Logo RSI" class="logo" />
    </div>
    <hr class="border-danger my-1" style="border: solid 2px">
    <div class="invoice-info">
      <span>
        Invoice number:
        {{ invoiceNumber ? invoiceNumber : invoice.invoice_number }}
      </span>
      <span class="float-right">
        Date of sale:
        {{ (date ? date : invoice.created_at) | date }}
      </span>
    </div>
    <hr class="border-danger my-1" style="border: solid 2px">
    <div class="my-2" style="line-height: 1rem;">
      <table class="table table-sm table-borderless table-nospacing mb-0 text-nowrap">
        <tr>
          <td class="text-danger display-4 font-weight-bold" rowspan="4" style="width: 70%;">ORIGINAL</td>
          <td class="text-right"><span class="font-weight-bold">E. E. SOEMERS SERVICES N.V.</span> d.b.a.</td>
        </tr>
        <tr>
          <td class="text-right font-weight-bold">Recovery Solutions & Investigations (RSI)</td>
        </tr>
        <tr>
          <td class="text-right">Personal number (Tax office) <span class="font-weight-bold">5025411</span></td>
        </tr>
        <tr>
          <td class="text-right">Registration number (Kvk) <span class="font-weight-bold">38293.0</span></td>
        </tr>
        <tr>
          <td>
            <table class="table table-sm table-borderless table-nospacing">
              <tr>
                <td colspan="2" class="font-weight-bold"><u>SELLER INFORMATION:</u></td>
              </tr>
              <tr>
                <td style="width: 200px;">Statutory name</td>
                <td class="font-weight-bold">{{ inventory.inventory_of.company_name }}</td>
              </tr>
              <tr>
                <td>Trade name</td>
                <td class="font-weight-bold">{{ inventory.inventory_of.handle_name }}</td>
              </tr>
              <tr>
                <td>Department</td>
                <td class="font-weight-bold">{{ inventory.inventory_of.department }}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td class="font-weight-bold">
                  <span v-if="inventory.inventory_of.address">
                    {{ inventory.inventory_of.address.street_name }} #
                    {{ inventory.inventory_of.address.address_no }},
                    {{ inventory.inventory_of.address.country_name_en }}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Contact person (function)</td>
                <td class="font-weight-bold">
                  <span v-if="inventory.contact_person">
                    {{ inventory.contact_person.firstname }}
                    {{ inventory.contact_person.lastname }}
                    ({{ inventory.contact_person.function }})
                  </span>
                  <span v-else>Mr. J.M. (Jeannot) DE CUBA, Esq. (liquidator)</span>
                </td>
              </tr>
            </table>
          </td>
          <td class="text-right pt-3">
            <table class="table table-sm table-borderless table-nospacing">
              <tr>
                <td colspan="2" class="font-weight-bold text-nowrap"><u>METHOD OF PAYMENT:</u></td>
              </tr>
              <tr>
                <td class="text-nowrap">Bank</td>
                <td class="font-weight-bold">ARUBA BANK N.V.</td>
              </tr>
              <tr>
                <td class="text-nowrap">Account no.</td>
                <td class="font-weight-bold">2554020290</td>
              </tr>
              <tr>
                <td class="text-nowrap">Account name</td>
                <td class="font-weight-bold">LA LINDA REAL ESTATE II</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <hr class="border-danger my-1" style="border: solid 2px">
      <table class="table table-sm table-borderless table-nospacing">
        <tr>
          <td colspan="2" class="font-weight-bold"><u>BUYER INFORMATION:</u></td>
        </tr>
        <tr>
          <td style="width: 200px;">Full name</td>
          <td class="font-weight-bold">{{ buyerInfo.full_name }}</td>
        </tr>
        <tr>
          <td>Birth information</td>
          <td class="font-weight-bold">{{ buyerInfo.birthdate | date}}</td>
        </tr>
        <tr>
          <td>Contact information</td>
          <td class="font-weight-bold">{{ buyerInfo.contact_info }}</td>
        </tr>
      </table>
      <hr class="my-1" style="border: solid 2px">
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PrintInvoiceHEader",
  computed: {
    ...mapState("shop", ["invoiceNumber", "date", "buyerInfo"]),
    ...mapState("shop", ["buyerInfo"]),
    ...mapState("invoice", ["invoice"]),
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

.table-nospacing>tr>td {
  padding: 0;
  margin: 0;
}

.table-nospacing>tr {
  padding: 0;
  margin: 0;
}
</style>
