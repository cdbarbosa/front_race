const state = {
  conn: 'prod'
}

const getters = {
  conn: () => state.conn
}

const mutations = {
  SET_CONN (state, conn) {
    state.conn = conn
    window.localStorage.setItem('authConn', conn)
  }
}

const actions = {
  setConn ({ commit }, conn) {
    commit('SET_CONN', conn)
  }
}

export default {
  state, getters, mutations, actions
}
