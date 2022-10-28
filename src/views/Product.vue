<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body class="body-height box-shadow mb-2">
        <b-card-header>
          Product information
          <span class="float-right">
            <b-button-group>
              <add-price :productId="productId" />
              <add-discount :productId="productId" />
              <add-stock :productId="productId" />
            </b-button-group>
          </span>
        </b-card-header>
        <b-card-body>
          <b-row>
            <b-col md="12" lg="6" class="px-5">
              <b-table-simple hover small responsive>
                <b-tr>
                  <b-th>Name</b-th>
                  <b-td class="text-right">{{ product.name }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Category</b-th>
                  <b-td class="text-right">
                    <span v-if="product.sub_category_id">
                      {{ product.sub_category }} {{ product.sub_category_id }}
                    </span>
                    <span v-else>None</span>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Barcode</b-th>
                  <b-td class="text-right">
                    {{ product.barcode ? product.barcode : "None" }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Packaging</b-th>
                  <b-td class="text-right">
                    {{ product.packaging_id ? product.packaging_id : "Unknown" }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>
                    {{ product.dimensions ? "Dimensions" : "Volume" }}
                  </b-th>
                  <b-td class="text-right">
                    <span v-if="product.dimensions">
                      {{ product.dimensions }}
                    </span>
                    <span v-else-if="product.bundle_volume">
                      {{ product.bundle_volume | round }}
                    </span>
                    <span v-else>
                      None
                    </span>
                  </b-td>
                </b-tr>
                <b-tr v-if="product.dimensions_text">
                  <b-th>
                    {{ "Dimensions text" }}
                  </b-th>
                  <b-td class="text-right">
                    {{ product.dimensions_text }}
                  </b-td>
                </b-tr>
              </b-table-simple>
            </b-col>
            <b-col md="12" lg="6" class="px-5">
              <b-table-simple hover small responsive>
                <b-tr>
                  <b-th>Stock</b-th>
                  <b-td class="text-right">{{ product.quantity }}</b-td>
                </b-tr>
                <b-tr v-if="product.price_as_new">
                  <b-th>Price as new</b-th>
                  <b-td class="text-right">{{ product.price_as_new | money }}</b-td>
                </b-tr>
                <b-tr v-if="product.depreciation">
                  <b-th>Depreciation</b-th>
                  <b-td class="text-right">{{ product.depreciation }}%</b-td>
                </b-tr>
                <b-tr v-if="product.liquidation">
                  <b-th>Liquidation</b-th>
                  <b-td class="text-right">{{ product.liquidation }}%</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Discount</b-th>
                  <b-td class="text-right">{{ product.discount || 0 }}%</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Price</b-th>
                  <b-td class="text-right">{{ product.price | money }}</b-td>
                </b-tr>
              </b-table-simple>
              <div class="product-img-container">
                <b-img
                  thumbnail
                  fluid
                  :src="product.img_URL"
                  v-if="product.img_URL"
                ></b-img>
                <span v-else>
                  <i class="fas fa-images fa-5x"></i>
                </span>
              </div>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col md="12" lg="4" v-if="false">
      <b-card class="body-height box-shadow mb-2 p-3">
        <div class="chart-container">
          <line-chart :chartData="pricesCollection" :options="options" />
        </div>
      </b-card>
    </b-col>
    <b-col md="12" lg="4" v-if="false">
      <b-card class="body-height box-shadow mb-2 p-3">
        <div class="chart-container">
          <line-chart :chartData="discountCollection" :options="options" />
        </div>
      </b-card>
    </b-col>
    <b-col md="12" lg="4" v-if="false">
      <b-card class="body-height box-shadow mb-2 p-3">
        <div class="chart-container">
          <bar-chart :chartData="salesCollection" :options="options" />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import LineChart from "@/components/Charts/LineChart.js";
import BarChart from "@/components/Charts/BarChart.js";
import AddPrice from "@/components/Products/AddPrice.vue";
import AddDiscount from "@/components/Products/AddDiscount.vue";
import AddStock from "@/components/Products/AddStock.vue";

import { mapState } from "vuex";

export default {
  data: () => ({
    productId: null,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  components: {
    LineChart,
    BarChart,
    AddPrice,
    AddDiscount,
    AddStock
  },
  computed: {
    ...mapState("product", { product: state => state.product }),
    pricesCollection() {
      return {
        labels: ["January", "February", "Maart"],
        datasets: [
          {
            label: "Price",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 123, 255, 0.8)",
            data: [9, 8, 10]
          }
        ]
      };
    },
    discountCollection() {
      return {
        labels: ["January", "February", "Maart", "April"],
        datasets: [
          {
            label: "Discount",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(255, 193, 7, 0.8)",
            data: [25, 35, 50, 70]
          }
        ]
      };
    },
    salesCollection() {
      return {
        labels: ["January", "February", "Maart"],
        datasets: [
          {
            label: "Sale",
            backgroundColor: "rgba(0, 123, 255, 0.8)",
            data: [9, 8, 10]
          }
        ]
      };
    }
  },
  created() {
    this.productId = this.$route.params.id;
    this.$store.dispatch("product/getProduct", this.$route.params.id);
  }
};
</script>

<style>
.product-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container {
  max-height: 400px;
  max-width: 1000px;
  margin: auto;
}
</style>
