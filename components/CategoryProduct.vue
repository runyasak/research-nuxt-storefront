<template>
  <div class="text-center _catalog-product _cs-pointer">
    <img
      :src="imageSrc"
      class="_product-image _object-fit-cover"
      width="100%"
      height="300"
      alt="Product Image">
    <div>
      {{ name }}
    </div>
    <div class="font-weight-bold grey--text">
      $ {{ price }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryProduct',
  props: {
    imageSrc: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
._product-image, ._product-image:hover {
  transition: opacity .3s ease-in-out;
}

._product-image:hover {
  opacity: 0.5;
}
</style>
