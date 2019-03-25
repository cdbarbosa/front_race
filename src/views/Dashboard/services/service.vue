<template>
	<div class="content" v-if="selected">
		<section>
			<article>
				<b-field label="Título">
					<b-input v-model="selected.name" name="" rows="4" disabled></b-input>
				</b-field>
				<b-field label="ID">
					<b-input v-model="selected.id" placeholder="23" disabled></b-input>
				</b-field>
			</article>
			<article>
				<b-field label="Cliente">
					<b-input v-model="selected.client.name" placeholder="Cliente" disabled></b-input>
				</b-field>
				<b-field label="Sigilo">
					<div class="block">
						<b-radio v-model="radio" native-value="Nenhum" disabled>
							Nenhum
						</b-radio>
						<b-radio v-model="radio" native-value="Parcial" disabled>
							Parcial
						</b-radio>
						<b-radio v-model="radio" native-value="Total" disabled>
							Total
						</b-radio>
					</div>
				</b-field>
			</article>
			<article>
				<b-field label="Data de registro">
					<b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="register" disabled></b-input>
				</b-field>
				<b-field label="Previsão">
					<b-input :value="parseDate(selected.created_at)" v-mask="'##/##/####'" placeholder="data" name="date" disabled></b-input>
				</b-field>
				<b-field label="Prazo">
					<b-input :value="parseDate(selected.due_date)" v-mask="'##/##/####'" placeholder="data" name="date-duo" disabled></b-input>
				</b-field>
			</article>
			<article>
				<b-field label="Margem">
					<b-input v-model="selected.profit" placeholder="50%" disabled></b-input>
				</b-field>
				<b-field label="Valor">
					<b-input v-model="selected.value" placeholder="825" disabled></b-input>
				</b-field>
				<b-field label="Recebido">
					<b-input v-model="selected.received_value" placeholder="825" disabled></b-input>
				</b-field>
			</article>
			<b-field label="Situação">
				<b-select placeholder="Select a name">
					<option value="">Selecione</option>
					<option value="1">ORCA - Orçamento (em aberto)</option>
				</b-select>
			</b-field>
			<div class="actions">
				<router-link tag="button" :to="{ name: 'serviceReceipts', params: { service_id: this.$route.params.service_id } }">Recebimentos</router-link>
				<router-link tag="button" :to="{ name: 'serviceDetails', params: { service_id: this.$route.params.service_id } }">Detalhes</router-link>
			</div>
		</section>
		<section>
			<div class="description">
				<b-field label="Observações">
					<div class="textarea" v-html="selected.description"></div>
				</b-field>
			</div>
		</section>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	name: 'service',
	props: ['selected'],
	data () {
		return {
			radio: ''
		}
	},
	methods: {
		parseDate (date) {
			return moment(date).format('DD/MM/YYYY')
		}
	}
}
</script>
