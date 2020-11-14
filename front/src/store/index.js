import Vue from 'vue';
import Vuex from 'vuex';
import GithubApi from './githubApi';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resume: null
  },
  mutations: {
    setResume(state, resume) {
      state.resume = resume;
    }
  },
  actions: {
    loadResume({commit}, githublogin) {
      if(githublogin) {
        return GithubApi.loadResume(githublogin)
          .then(resume => {
            commit('setResume', resume);
            return resume;
          })
      } else {
        return Promise.then(() => null);
      }
    }
  },
  modules: {
  }
})
