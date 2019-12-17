<template>
  <v-container id="cateogory-urlKey">
    <h1>{{ categoryName }}</h1>
  </v-container>
</template>

<script>
export default {
  name: 'CategoryUrlKey',
  async asyncData ({ store, params: { urlKey } }) {
    await store.dispatch('catalog/fetchCategoryByUrlKey', { urlKey })

    return {
      categoryName: store.state.catalog.category.source.name
    }
  }
}
</script>
