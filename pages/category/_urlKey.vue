<template>
  <v-container id="cateogory-urlKey">
    <h1>{{ categoryName }}</h1>
    <v-row>
      <v-col offset="2" cols="8">
        <v-row>
          <v-col
            v-for="(url, index) in productImageUrls"
            :key="index"
            cols="12"
            md="6"
            lg="4">
            <img
              :src="mapImageSrc(url)"
              class="_object-fit-cover"
              width="100%"
              height="100%"
              alt="Product Image">
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getImage } from '@/resources/image'

const mapAllCategoryId = (categorySource) => {
  const result = [categorySource.id]
  for (const child of categorySource.childrenData) {
    result.push(child.id)
    for (const subChild of child.childrenData) {
      result.push(subChild.id)
    }
  }

  return result
}

export default {
  name: 'CategoryUrlKey',
  async asyncData ({ store, params: { urlKey } }) {
    await store.dispatch('catalog/fetchCategoryByUrlKey', { urlKey })

    const allCategoryIds = mapAllCategoryId(store.state.catalog.category.source)

    await store.dispatch('catalog/fetchProducts', { urlKey, categoryIds: allCategoryIds })

    return {
      categoryName: store.state.catalog.category.source.name,
      productImageUrls: store.state.catalog.products.map(product => product.source.image)
    }
  },
  methods: {
    mapImageSrc (url) {
      return getImage(600, 600, url, 'resize')
    }
  }
}
</script>
