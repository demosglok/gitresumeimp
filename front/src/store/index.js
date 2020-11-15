import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    resume: null
  },
  mutations: {
    setResume(state, resume) {
      state.resume = resume;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    loadUser({commit}) {
      fetch('/getuser').then(res => res.json()).then(user => {
        console.log('get user', user);
        if(user && !user.error) {
          commit('setUser', user);
        }
      }).catch(ex => {
        console.log('error loading user', ex.message);
        commit('setUser', null);
      })
    },
    loadResume({commit}) {
       fetch('/getresume').then(res => res.json()).then(resumes => {
        if(resumes && !resumes.error) {
          const [readmeResume, jsonResume] = resumes;
          console.log('resumes', readmeResume, jsonResume)
          if(jsonResume && !jsonResume.error)
          commit('setResume', jsonResume);
        }
      }).catch(ex => {
        console.log('error loading user', ex.message);
        commit('setUser', null);
      })
    },
    saveResume({state}) {
      console.log('saving resumt', state.resume);
    }
  },
  modules: {
  }
})
