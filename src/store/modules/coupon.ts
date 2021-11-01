import { ActionContext } from 'vuex'
import DB, { ToDoItem } from '../../utils/data'

export interface State {
  list: ToDoItem[]
}

const state = {
  list: []
}

const mutations = {
  setList(state: State, payload: {list: ToDoItem[]}) {
    state.list = payload.list
  }
}

const actions = {
  async getList({ commit }: ActionContext<any, any>) {
    const data = await DB.getList()
    console.log(data)
    commit({
      type: 'setList',
      list: data
    })
  }
}

const getters = {
  
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}