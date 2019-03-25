<template>
	<section class="__secundary">
		<div :class="[{create: create}, 'tableContainer']">
			<header>
				<h4>
					<slot name="title"></slot>
				</h4>
				<button v-if="create" class="buttons is-primary" @click="isModalActive = true">Cadastrar novo Rh</button>
				<b-field>
					<b-input placeholder="Procurar"></b-input>
				</b-field>
				<div id="edit" @click="isEditActive = true">
					<b-icon icon="cog"></b-icon>
				</div>
			</header>
			<b-table :data="rhs" :paginated="true" :selected.sync="selected" :per-page="5" @update:selected="$emit('update', $event)" focusable style="padding-top: 1rem">
				<template slot-scope="props">
					<b-table-column field="name" label="NOME" sortable>
						{{ props.row.name }}
					</b-table-column>
					<b-table-column field="created_at" label="Custo">
						{{ props.row.cost }}
					</b-table-column>
					<b-table-column field="user.email" label="Horas">
						{{ parseDate(props.row.created_at) }}
					</b-table-column>
				</template>
			</b-table>
			<b-modal :active.sync="isModalActive">
				<component :is="parseModal()" @rhCreated="rhCreated = true" @creationFailed="rhCreated = false"></component>
			</b-modal>
		</div>
	</section>
</template>
<script>
import moment from 'moment'
import createRh from '../rh/create.vue'
import success from './create-messages/success'
import error from './create-messages/error'
export default {
	name: 'rhTable',
	props: ['rhs', 'create'],
	data () {
		return {
			isModalActive: false,
			rhSelected: undefined,
			rhCreated: undefined
		}
	},
	computed: {
    selected: {
      get () {
        return this.rhSelected ? this.rhSelected : this.rhs[0]
      },
      set (newValue) {
        this.rhSelected = newValue
      }
    }
	},
	methods: {
    parseDate (date) {
      return moment().format('DD/MM/YYYY')
    },
    parseModal () {
      if (this.rhCreated === undefined) {
        return 'createRh'
      } else if (this.rhCreated === true) {
        return 'success'
      }
      return 'error'
    }
	},
	components: {
		createRh,
		success,
		error
	}
}
</script>
