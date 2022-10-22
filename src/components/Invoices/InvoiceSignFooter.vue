<template>
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
      <td
        class="font-weight-bold border"
        style="border-top: solid 2px !important;"
      >
        The buyer
      </td>
      <td></td>
      <td
        class="font-weight-bold border"
        style="border-top: solid 2px !important;"
      >
        {{ employeeName }}
      </td>
    </tr>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["userInfo"]),
    dateNow() {
      return Date.now();
    },
    employeeName() {
      let initial = this.userInfo.middlename.charAt(0);

      let name = this.userInfo.firstname + " ";
      name += initial ? initial + ". " : "";
      name += this.userInfo.lastname;

      return name;
    }
  }
};
</script>