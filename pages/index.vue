<template>
  <v-container id="index-page">
    <div class="text-center">
      <h1>Get Inspired</h1>
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
    </div>
  </v-container>
</template>

<script>
import { getImage } from '@/resources/image'
export default {
  name: 'IndexPage',
  data () {
    return {
      productImageWidth: 600,
      productImageHeight: 600
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('catalog/fetchProducts', { size: 9 })

    return {
      productImageUrls: store.state.catalog.products.map(product => product.source.smallImage)
    }
  },
  methods: {
    mapImageSrc (url) {
      return getImage(this.productImageWidth, this.productImageHeight, url, 'resize')
    }
  }
}
</script>
