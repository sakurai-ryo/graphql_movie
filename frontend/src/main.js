import Vue from 'vue'
import App from './App.vue'

import {
  BootstrapVue,
  BootstrapVueIcons
} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
  ApolloClient
} from 'apollo-client'
import {
  createHttpLink
} from 'apollo-link-http'
import {
  InMemoryCache
} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'


const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueApollo)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  apolloProvider
}).$mount('#app')