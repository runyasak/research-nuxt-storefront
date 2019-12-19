<template>
  <v-container id="product-urlPath">
    <v-row>
      <v-col cols="6">
        <v-carousel height="700">
          <v-carousel-item
            v-for="(gallery, index) in product.mediaGallery"
            :key="index">
            <v-sheet height="100%" tile>
              <v-img
                :src="$mapImageUrl(500, 500, gallery.image)"
                :lazy-src="$mapImageUrl(1, 1, gallery.image)"
                alt="Carousel gallery image"
              />
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col cols="6">
        <div class="mb-4">
          {{ categoryDisplay }}
        </div>
        <h1 class="mb-4">
          {{ product.name.split('&')[0] }}
        </h1>
        <div class="grey--text mb-4">
          SKU: {{ product.sku }}
        </div>
        <div class="headline font-weight-bold">
          ${{ product.priceInclTax }}
        </div>
        <v-btn class="mt-8" color="primary">
          Add to cart
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductUrlPath',
  computed: {
    categoryDisplay () {
      return this.product.category.map(category => category.name).join(' / ')
    }
  },
  async asyncData ({ store, params: { urlPath } }) {
    await store.dispatch('catalog/fetchProductsByUrlPath', { urlPath })

    return {
      product: store.state.catalog.productsByUrlPath[0].source
    }
  }
}
</script>
