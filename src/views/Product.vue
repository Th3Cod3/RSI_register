<template>
  <b-row>
    <b-col cols="12">
      <b-card no-body class="body-height box-shadow mb-2">
        <b-card-header>
          Product information
          <span class="float-right">
            <b-button-group>
              <b-button
                variant="primary"
                v-b-tooltip.hover.bottom
                title="Apply discount"
              >
                <i class="fas fa-percentage"></i>
              </b-button>
              <b-button
                variant="primary"
                v-b-tooltip.hover.bottom
                title="Change price"
              >
                <i class="fas fa-dollar-sign"></i>
              </b-button>
              <b-button
                variant="primary"
                v-b-tooltip.hover.bottom
                title="Add stock"
              >
                <i class="fas fa-boxes"></i>
              </b-button>
            </b-button-group>
          </span>
        </b-card-header>
        <b-card-body>
          <b-row>
            <b-col md="12" lg="6" class="px-5">
              <b-table-simple hover small responsive>
                <b-tr>
                  <b-th>Naam</b-th>
                  <b-td class="text-right">{{ product.name }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Categorie</b-th>
                  <b-td class="text-right">
                    <span v-if="product.sub_category_id">
                      {{ product.category }} {{ product.sub_category_id }}
                    </span>
                    <span v-else>Geen</span>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Barcode</b-th>
                  <b-td class="text-right">
                    {{ product.barcode ? product.barcode : "Geen" }}
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Packaging</b-th>
                  <b-td class="text-right">
                    {{
                      product.packaging_id ? product.packaging_id : "Onbekend"
                    }}
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
                      Geen
                    </span>
                  </b-td>
                </b-tr>
              </b-table-simple>
            </b-col>
            <b-col md="12" lg="6" class="px-5">
              <b-table-simple hover small responsive>
                <b-tr>
                  <b-th>Voorraad</b-th>
                  <b-td class="text-right">{{ product.quantity }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Prijs</b-th>
                  <b-td class="text-right">{{ product.price | money }}</b-td>
                </b-tr>
                <b-tr>
                  <b-th>Korting</b-th>
                  <b-td class="text-right">{{ product.discount }}%</b-td>
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

    <b-col md="12" lg="4">
      <b-card class="body-height box-shadow mb-2 p-3">
        <div class="chart-container">
          <line-chart :chartData="pricesCollection" :options="options" />
        </div>
      </b-card>
    </b-col>
    <b-col md="12" lg="4">
      <b-card class="body-height box-shadow mb-2 p-3">
        <div class="chart-container">
          <line-chart :chartData="discountCollection" :options="options" />
        </div>
      </b-card>
    </b-col>
    <b-col md="12" lg="4">
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

export default {
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  components: {
    LineChart,
    BarChart
  },
  computed: {
    prices: {
      get() {
        return this.$store.state.product.prices;
      },
      set(value) {
        this.$store.commit("productPrices", value);
      }
    },
    product: {
      get() {
        return this.$store.state.product;
      },
      set(value) {
        this.$store.commit("product", value);
      }
    },
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
    if (this.$store.state.items) {
      this.product =
        this.$store.state.items.find(
          product => product.id === this.$route.params.id
        ) || {};
    }
    if (!this.product.lenght) {
      this.$store.dispatch("getProduct", this.$route.params.id);
    }
  },
  methods: {
    filterMoney(value) {
      return this.$options.filters.money(value);
    }
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
