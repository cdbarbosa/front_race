<template>
	<section class="__secundary">
		<div class="tableContainer">
			<header>
				<h4>
					<slot name="title"></slot>
					<div id="edit" @click="isEditActive = true">
						<b-icon icon="search"></b-icon>
					</div>
				</h4>
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
		</div>
	</section>
</template>
<script>
import moment from 'moment'
export default {
	name: 'rhTable',
	props: ['rhs'],
	data () {
		return {
			rhSelected: undefined
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
    }
	}
}
</script>
