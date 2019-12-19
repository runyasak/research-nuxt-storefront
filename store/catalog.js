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
  products: [],
  productsByUrlPath: []
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
  },
  SET_PRODUCTS_BY_URL_PATH (state, value) {
    state.productsByUrlPath = value
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
  async fetchProducts ({ commit }, { size, from = 0, categoryIds = [] }) {
    const categoryIdsQueryString = {
      _source_exclude: 'description,configurable_options,sgn,*.sgn,msrp_display_actual_price_type,*.msrp_display_actual_price_type,required_options',
      _source_include: 'type_id,sku,product_links,tax_class_id,special_price,special_to_date,special_from_date,name,price,priceInclTax,originalPriceInclTax,originalPrice,specialPriceInclTax,id,image,sale,new,url_path,url_key,status,tier_prices,configurable_children.sku,configurable_children.price,configurable_children.special_price,configurable_children.priceInclTax,configurable_children.specialPriceInclTax,configurable_children.originalPrice,configurable_children.originalPriceInclTax',
      sort: 'position:asc',
      request: {
        query: { bool: { filter: { bool: { must: [{ terms: { visibility: [2, 3, 4] } }, { terms: { status: [0, 1] } }, { terms: { category_ids: categoryIds } }] } } } }
      }
    }
    const params = categoryIds.length > 0 ? { ...categoryIdsQueryString, size, from } : { size, from }

    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/product/_search`, { params })
    commit('SET_PRODUCTS', camelizeKeys(result.hits.hits))
  },
  async fetchProductsByUrlPath ({ commit }, { urlPath, size = 50, from = 0 }) {
    const params = {
      _source_exclude: '*.msrp_display_actual_price_type,required_options,updated_at,created_at,attribute_set_id,options_container,msrp_display_actual_price_type,has_options,stock.manage_stock,stock.use_config_min_qty,stock.use_config_notify_stock_qty,stock.stock_id,stock.use_config_backorders,stock.use_config_enable_qty_inc,stock.enable_qty_increments,stock.use_config_manage_stock,stock.use_config_min_sale_qty,stock.notify_stock_qty,stock.use_config_max_sale_qty,stock.use_config_max_sale_qty,stock.qty_increments,small_image,sgn,*.sgn',
      request: { query: { bool: { filter: { terms: { url_path: [urlPath] } } } } },
      from,
      size
    }

    const result = await this.$axios.$get(`/api/catalog/${DEFAULT_CATALOG}/product/_search`, { params })
    commit('SET_PRODUCTS_BY_URL_PATH', camelizeKeys(result.hits.hits))
  }
}

// Will Be used later

// const queryString = {
//   _source_exclude: 'description,configurable_options,sgn,*.sgn,msrp_display_actual_price_type,*.msrp_display_actual_price_type,required_options',
//   _source_include: 'type_id,sku,product_links,tax_class_id,special_price,special_to_date,special_from_date,name,price,priceInclTax,originalPriceInclTax,originalPrice,specialPriceInclTax,id,image,sale,new,url_path,url_key,status,tier_prices,configurable_children.sku,configurable_children.price,configurable_children.special_price,configurable_children.priceInclTax,configurable_children.specialPriceInclTax,configurable_children.originalPrice,configurable_children.originalPriceInclTax',
//   sort: 'position:asc',
//   request: {
//     query: { bool: { filter: { bool: { must: [{ terms: { visibility: [2, 3, 4] } }, { terms: { status: [0, 1] } }, { terms: { category_ids: [2, 38, 20, 21, 23, 24, 25, 26, 22, 27, 28, 11, 12, 14, 15, 16, 17, 13, 18, 19, 3, 4, 5, 6, 7, 8, 34, 35, 36, 39, 40, 9, 10, 29, 30, 31, 32, 33, 37] } }] } } } },
//     aggs: { agg_terms_color: { terms: { field: 'color', size: 10 } },
//       agg_terms_color_options: { terms: { field: 'color_options', size: 10 } },
//       agg_terms_size: { terms: { field: 'size', size: 10 } },
//       agg_terms_size_options: { terms: { field: 'size_options', size: 10 } },
//       agg_terms_price: { terms: { field: 'price' } },
//       agg_range_price: { range: { field: 'price', ranges: [{ from: 0, to: 50 }, { from: 50, to: 100 }, { from: 100, to: 150 }, { from: 150 }] } },
//       agg_terms_erin_recommends: { terms: { field: 'erin_recommends', size: 10 } },
//       agg_terms_erin_recommends_options: { terms: { field: 'erin_recommends_options', size: 10 }
//       }
//     }
//   }
// }
