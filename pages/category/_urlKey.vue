<template>
  <v-container id="cateogory-urlKey">
    <v-row>
      <v-col offset="2" cols="8">
        <div class="d-flex justify-space-between align-center">
          <h1>{{ categoryName }}</h1>
          <span class="font-weight-bold">{{ productCount }} items</span>
        </div>
        <v-row v-if="productCount > 0">
          <v-col
            v-for="(product, index) in products"
            :key="index"
            cols="12"
            md="6"
            lg="4">
            <nuxt-link
              :to="{ name: 'product-urlPath', params: { urlPath: product.urlPath } }"
              class="_text-decoration-unset">
              <category-product
                :image-src="$mapImageUrl('600', '600', product.image)"
                :name="product.name"
                :price="product.priceInclTax" />
            </nuxt-link>
          </v-col>
        </v-row>
        <div v-else class="py-3">
          No Product was found!
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const mapAllCategoryId = (categorySource) => {
  const result = [categorySource.id]

  if (categorySource.childrenData) {
    for (const child of categorySource.childrenData) {
      result.push(child.id)

      if (child.childrenData) {
        for (const subChild of child.childrenData) {
          result.push(subChild.id)
        }
      }
    }
  }

  return result
}

export default {
  name: 'CategoryUrlKey',
  components: {
    CategoryProduct: () => import('@/components/CategoryProduct')
  },
  async asyncData ({ store, params: { urlKey } }) {
    await store.dispatch('catalog/fetchCategoryByUrlKey', { urlKey })

    const allCategoryIds = mapAllCategoryId(store.state.catalog.category.source)

    await store.dispatch('catalog/fetchProducts', { urlKey, categoryIds: allCategoryIds })

    return {
      categoryName: store.state.catalog.category.source.name,
      products: store.state.catalog.products.map(product => product.source),
      productCount: store.state.catalog.products.length
    }
  }
}
</script>
