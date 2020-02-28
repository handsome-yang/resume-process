import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    autographThumbnail:null,
    autographPhoto:null,
    isShowText:true
  },
  mutations: {
    changeThumbnail(state,val){
      state.autographThumbnail = val
    },
    changeAutographPhoto(state,val){
      state.autographPhoto = val
    },
    changeIsShowText(state,val){
      state.isShowText = val
    }
  },
  actions: {
  },
  modules: {
  }
})
