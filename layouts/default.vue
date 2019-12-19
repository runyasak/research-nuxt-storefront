<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary>
      <v-list>
        <v-list-item
          v-for="(category, index) in categories"
          :key="index"
          :to="{ name: 'category-urlKey', params: { urlKey: category.urlKey } }"
          router
          exact>
          <v-list-item-content>
            <v-list-item-title v-text="category.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
      class="_position-relative">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <nuxt-link
        class="_position-absolute _left-50pct _translate-left-50pct"
        to="/">
        <img
          src="/logo.svg"
          alt="App Icon"
          width="40"
          height="40">
      </nuxt-link>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ]
    }
  },
  computed: {
    categories () {
      return this.$store.state.catalog.categories
        .map(category => ({
          name: category.source.name,
          urlKey: category.source.urlKey
        }))
    }
  },
  created () {
    this.$store.dispatch('catalog/fetchCategories', {})
  }
}
</script>
