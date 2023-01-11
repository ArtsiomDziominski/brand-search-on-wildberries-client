<template>
  <form @submit.prevent="searchProduct">
    <div class="request">
      <p class="request-title">Запрос</p>
      <main-input v-model="searchQuery" required>Запрос</main-input>
    </div>
    <div class="search-brand">
      <p class="search-brand-title">Мой бренд</p>
      <main-input v-model="searchBrand">Мой бренд</main-input>
    </div>
    <main-button>Поиск</main-button>
    <brands-list v-model:brands="brands"></brands-list>
  </form>
</template>

<script>
import {mapGetters} from "vuex";
import BrandsList from "@/components/BrandsList.vue";
import MainButton from "@/components/UI/MainButton.vue";
import MainInput from "@/components/UI/MainInput.vue";

export default {
  name: "MainPage",
  components: {MainInput, MainButton, BrandsList},
  data() {
    return {
      searchQuery: '',
      searchBrand: '',
      brands: {},
      interval: false,
    }
  },
  computed: {
    ...mapGetters('storeSearch', ['requestSearch']),
  },
  watch: {
    searchBrand() {
      this.brands.searchBrand = this.searchBrand;
    }
  },
  methods: {
    searchProduct() {
      const searchQueryBody = {search: this.searchQuery}
      this.requestServer(searchQueryBody);
      console.log(this.interval)
      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => this.requestServer(searchQueryBody), 15000);
    },
    requestServer(searchQueryBody) {
      this.requestSearch(searchQueryBody)
          .then((result) => {
            if (result.data.brands.length) {
              this.brands = {
                list: result.data.brands,
                title: result.data.searchCurrent,
                searchBrand: this.searchBrand
              }
            } else {
              this.brands = {
                error: 'Ничего не найдено'
              }
            }
          })
          .catch((result) => this.brands.title = result.data.error)
    }
  }
}
</script>

<style scoped>
.request {
  display: flex;
  margin-bottom: 20px;
}

.request-title {
  margin-right: 10px;
}

.search-brand {
  display: flex;
  margin-bottom: 20px;
}

.search-brand-title {
  margin-right: 10px;
}

h2 {
  font-weight: bold;
}
</style>