import { header } from '../config/index.js'

const state = {
  accounts: [],
  accountIndex: 0
}

const getters = {
  accounts: () => state.accounts,
  account: () => state.accounts.length ? state.accounts[state.accountIndex] : null
}
const mutations = {
  SET_ACCOUNTS (state, accounts) {
    state.accounts = accounts
  },
  SET_ACCOUNT_INDEX (state, index) {
    state.accountIndex = index
  },
  SET_ACCOUNT_RECORD_INDEX (state, index) {
    state.accountRecordIndex = index
  },
  UPDATE_ACCOUNT (state, account) {
    state.accounts.splice(state.accountIndex, 1, account)
  }
}

const actions = {
  setAccount ({ commit }, account) {
    commit('SET_ACCOUNT', account)
  },
  setAccountIndex ({ state, commit }, account) {
    const index = state.accounts.findIndex(a => a.id === account.id)
    commit('SET_ACCOUNT_INDEX', index)
  },
  /**
   * Get all accounts and return them
   *
   * @returns Array
   */
  index ({ commit }, that) {
    commit('SET_ACCOUNTS', [])

    // that.isLoading = true
    // that.$Progress.start()
    that.$http.get(that.$api({
      target: 'accounts'
    }), {
      headers: header()
    }).then(response => {
      commit('SET_ACCOUNT_INDEX', 0)
      commit('SET_ACCOUNTS', response.data)
      // that.$Progress.finish()
      // that.isLoading = false
      return true
    }).then(status => {
      return status
    }).catch(err => {
      // that.$Progress.fail()
      return err
    })
  },
  show ({ commit }, payload) {
    const that = payload[0]
    const id = payload[1]
    that.$http.get(that.$api({
      target: `account/${id}`
    }), {
      headers: header()
    }).then(response => {
      commit('UPDATE_ACCOUNT', response.data)
      return true
    }).then(status => {
      return status
      // resolve(status)
    }).catch(err => {
      return err
      // reject(err)
    })
  },
  store ({ commit }, payload) {
    const that = payload[0]
    const data = payload[1]

    that.$Progress.start()
    return new Promise((resolve, reject) => {
      that.$http.post(that.$api({
        target: 'users',
        conn: that.$store.getters.conn
      }), data, {
        headers: header()
      }).then(response => {
        console.log(response)
        // commit('SET_ACCOUNTS', response.data)
        that.$Progress.finish()
        return true
      }).then(status => {
        resolve(status)
        // resolve(status)
      }).catch(err => {
        that.$Progress.fail()
        reject(err)
        // reject(err)
      })
    })
  },
  update ({ commit }, payload) {
    const that = payload[0]
    const data = payload[1]
    that.$Progress.start()
    //
    return new Promise((resolve, reject) => {
      that.$http.put(that.$api({
        target: `account`
      }), data, {
        headers: header()
      }).then(response => {
        commit('UPDATE_ACCOUNT', response.data)
        that.$Progress.finish()
        return true
      }).then(status => {
        resolve(status)
        // resolve(status)
      }).catch(err => {
        that.$Progress.fail()
        console.log(err)
        reject(err)
        // reject(err)
      })
    })
  },
  delete ({ commit }, that) {
    return that
  },
  search ({ commit }, payload) {
    const that = payload[0]
    const slug = payload[1]
    that.$Progress.start()
    that.$http.get(that.$api({
      target: `account/search/${slug}`
    }), {
      headers: header()
    }).then(response => {
      commit('SET_ACCOUNT_INDEX', 0)
      commit('SET_ACCOUNTS', response.data)
      that.$Progress.finish()
      return true
    }).then(status => {
      return status
      // resolve(status)
    }).catch(err => {
      that.$Progress.fail()
      return err
      // reject(err)
    })
  },
  filter ({ state, commit }, that) {
    that.$Progress.start()
    that.$http.get(that.$api({
      target: `accounts/critical`
    }), {
      headers: header()
    }).then(response => {
      commit('SET_ACCOUNT_INDEX', 0)
      commit('SET_ACCOUNTS', response.data)
      that.$Progress.finish()
      return true
    }).then(status => {
      return status
      // resolve(status)
    }).catch(err => {
      that.$Progress.fail()
      return err
      // reject(err)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
