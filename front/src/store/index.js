import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/http';

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
//      fetch(`${config.BACKEND_URL}/getuser`,{credentials: "same-origin"}).then(res => res.json()).then(user => {
      console.log('getting user');
      return http.get('/getuser').then((user) => {
        console.log('got user', user);
        if(user && !user.error) {
          commit('setUser', user);
          return user;
        } else {
          return null;
        }
      }).catch(ex => {
        console.log('error loading user', ex.message);
        commit('setUser', null);
        return null;
      })
    },
    loadResume({commit}) {
       http.get('/getresume').then(resumes => {
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
