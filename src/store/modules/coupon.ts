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
  async getList({ commit }: ActionContext<any, any>, status: number[] = []) {
    let data: ToDoItem[] = []
    if (status.length > 0) {
      data = await DB.getList(status)
    } else {
      data = await DB.getList()
    }
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