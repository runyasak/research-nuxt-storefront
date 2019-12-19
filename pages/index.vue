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
                :src="$mapImageUrl(600, 600, url)"
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
export default {
  name: 'IndexPage',
  async asyncData ({ store }) {
    await store.dispatch('catalog/fetchProducts', { size: 9 })

    return {
      productImageUrls: store.state.catalog.products.map(product => product.source.smallImage)
    }
  }
}
</script>
