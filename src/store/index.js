import Vue from 'vue'
import Vuex from 'vuex'
import ES6Promise from 'es6-promise'
import createPersistedState from 'vuex-persistedstate'
import state from './rootState'
import mutations from './mutations'
import actions from './actions'

ES6Promise.polyfill()

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  modules: {},
  actions,
  plugins: [createPersistedState()]
})

export default store
