import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flat_catalog: [],
  },
  mutations: {
    SET_FLAT_CATALOG_TO_STATE: (state, flat_catalog) => {
      state.flat_catalog = flat_catalog;
    },
  },
  actions: {
    GET_FLATS_FROM_JSON({ commit }) {
      return axios('./data.json', {
        method: 'GET',
      })
        .then((flat_catalog) => {
          commit('SET_FLAT_CATALOG_TO_STATE', flat_catalog.data);
          return flat_catalog;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
  getters: {
    FLAT_CATALOG(state) {
      return state.flat_catalog;
    },
  },
});
