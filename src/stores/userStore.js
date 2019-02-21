const state = {
	user: {
		email: null,
		document: null,
		birthdate: null
	},
	client: {
		registration_date: null,
		name: null,
		phone: null,
		observations: null
	},
	rh: {
		name: null,
		cost: null,
		phone: null,
		competencies: null
	},
	address: {
		contry: null,
		state: null,
		city: null,
		neighborhood: null,
		address: null,
		postal_code: null
	}
}

const getters = {
	user: () => state.user,
	client: () => state.client,
	address: () => state.address,
	rh: () => state.rh
}

const mutations = {

}

const actions = {

}

export default {
	state, getters, mutations, actions
}