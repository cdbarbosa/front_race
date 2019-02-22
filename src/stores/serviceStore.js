const state = {
	service: {
		name: null,
		description: null,
		forecast: null,
		due_date: null,
		profit: null,
		value: null
	},
	service_status: {
		abbreviation: null,
		description: null
	}
}

const getters = {
	service: () => state.service,
	service_status: () => state.service_status
}

const mutations = {

}

const actions = {

}

export default {
	state, getters, mutations, actions
}