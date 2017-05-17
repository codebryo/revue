export default {
  
  value: 'Something Different',

  name: 'Grace Hopper',

  store: {
    
    state: {
      love: 1
    },

    mutations: {

      increase({state}) {
        state.love++
      }
    }
  }
  
}