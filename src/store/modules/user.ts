interface State {
  name: string
}
import { ActionContext } from 'vuex'

export default {
  state: () => ({
    name: 'Tab'
  }),
  mutations: {
    setName(state: State, payload: {name: string}) {
      state.name = payload.name
    }
  },
  actions: {
    setNameAsync({ commit }: ActionContext<any, any>, payload: {name: string}) {
      commit({
        type: 'setName',
        name: payload.name
      })
    }
  },
  getters: {
    getName(state: State) {
      return state.name
    }
  }
}