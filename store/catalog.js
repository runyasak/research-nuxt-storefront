import { camelizeKeys } from 'humps'

const DEFAULT_CATALOG = 'vue_storefront_catalog'

export const state = () => ({
  categories: [],
  products: []
})

export const mutations = {
  SET_CATEGORIES (state, value) {
    state.categories = value
  },
  SET_PRODUCTS (state, value) {
    state.products = value
  }
}

export const actions = {
  async fetchCategories ({ commit }, { size = 30, from = 0 }) {
    const queryString = {
      _source_exclude: 'sgn',
      _source_include: 'id,*.children_data.id,*.id,children_count,sku,name,is_active,parent_id,level,url_key,url_path,product_count,path',
      sort: 'position:asc',
      request: { query: { bool: { filter: { bool: { must: [{ terms: { level: [2] } }, { terms: { is_active: [true] } }] } } } } },
      size,
      from
    }

    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/category/_search`, { params: queryString })
    commit('SET_CATEGORIES', camelizeKeys(result.hits.hits))
  },
  async fetchProducts ({ commit }, { size = 10, from = 0 }) {
    const params = { size, from }
    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/product/_search`, { params })
    commit('SET_PRODUCTS', camelizeKeys(result.hits.hits))
  }
}
