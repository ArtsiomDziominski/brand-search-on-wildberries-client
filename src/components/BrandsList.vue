<template>
  <h2 v-if="brands?.list?.length">Рейтинг по запросу: "{{ brands.title }}"</h2>
  <p class="error">{{ brands.error }}</p>
  <p
      class="brand-name"
      :class="{ active: brand === brands.searchBrand }"
      v-for="(brand, index) in brands.list"
      :key="index"
  >
    {{ index + 1 }}. {{ brand }}
  </p>
</template>

<script>
export default {
  name: "BrandsList",
  props: {
    brands: {
      type: Object,
      default: {
        title: '',
        list: [],
        searchBrand: '',
        error: ''
      }
    },
    searchBrand: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.brand-name {
  font-size: 18px;
}

.active {
  color: green;
  font-weight: bold;
  font-size: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}
</style>