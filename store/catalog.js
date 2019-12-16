import { camelizeKeys } from 'humps'

const DEFAULT_CATALOG = 'vue_storefront_catalog'

export const state = () => ({
  products: []
})

export const mutations = {
  SET_PRODUCTS (state, value) {
    state.products = value
  }
}

export const actions = {
  async fetchProducts ({ commit }, params) {
    const size = params.size || 10
    const from = params.from || 0

    const result = await fetch(`http://localhost:8080/api/catalog/${DEFAULT_CATALOG}/product/_search?size=${size}&from=${from}`)
    const jsonData = await result.json()
    commit('SET_PRODUCTS', camelizeKeys(jsonData.hits.hits))
  }
}
