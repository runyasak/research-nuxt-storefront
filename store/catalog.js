import { camelizeKeys } from 'humps'

const DEFAULT_CATALOG = 'vue_storefront_catalog'

const generateCategoryQueryString = urlKey => ({
  _source_exclude: 'sgn',
  _source_include: 'id,*.children_data.id,*.id,children_count,sku,name,is_active,parent_id,level,url_key,url_path,product_count,path',
  sort: 'position:asc',
  request: {
    query: { bool: { filter: { bool: { must: [{ terms: urlKey ? { url_key: [urlKey] } : { level: [2] } }, { terms: { is_active: [true] } }] } } } }
  }
})

export const state = () => ({
  categories: [],
  category: [],
  products: []
})

export const mutations = {
  SET_CATEGORIES (state, value) {
    state.categories = value
  },
  SET_CATEGORY (state, value) {
    state.category = value
  },
  SET_PRODUCTS (state, value) {
    state.products = value
  }
}

export const actions = {
  async fetchCategories ({ commit }, { size = 30, from = 0 }) {
    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/category/_search`, { params: { ...generateCategoryQueryString(), size, from } })
    commit('SET_CATEGORIES', camelizeKeys(result.hits.hits))
  },
  async fetchCategoryByUrlKey ({ commit }, { urlKey }) {
    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/category/_search`, { params: generateCategoryQueryString(urlKey) })
    commit('SET_CATEGORY', camelizeKeys(result.hits.hits[0]))
  },
  async fetchProducts ({ commit }, { size = 10, from = 0 }) {
    const params = { size, from }
    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/product/_search`, { params })
    commit('SET_PRODUCTS', camelizeKeys(result.hits.hits))
  }
}
