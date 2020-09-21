const state = {
    text: 'webpack 牛批！',
    value1: 'Hello1',
    value2: 'Hello2'
  }
  
  const mutations = {
    changeValue1: function(state, value) {
      state.value1 = value
    },
    changeValue2: function(state, value) {
      state.value2 = value
    },
  }
  
  const actions = {}
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }