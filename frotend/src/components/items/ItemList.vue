<template>
	<div id="Item">
		<list-table 
			:headers="headers"
			:itemsTable="itemsList"
			@onEditItem="editItem"
			@onDeleteItem="deleteItem"
		/>
		<ModalItemsForm
			@closeModal="closeModal"
			v-if="showModalForm"
			:payload="payload"
		/>
		<v-container>
			<v-layout justify-end>
				<v-btn
					@click.prevent="newForm"
					type="submit"
					class="white--text"
					color="#00008b">
					Adicionar
				</v-btn>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import ListTable from '../template/list-table/ListTable.vue'
import ModalItemsForm from './modal-form/ModalItemsForm.vue'
export default {
  components: { 
		ListTable,
		ModalItemsForm
	},
    name: 'ItemList',
	data () {
		return {
			headers: [
				{ text: 'Item', align: 'center', value: 'itemProductName'},
				{ text: 'Quantidade', align: 'center', value: 'itemQuantity'},
				{ text: 'Ações', align: 'right', value: 'actions', sortable: false, edit: true }
			],
			itemsList: [],
			// PROPS DE MODAL
			showModalForm: false,
			payload: {}
		}
	},
	mounted () {
		this.getItems()
	},
	methods: {
		// CRIAR MENSAGEM GLOBAL EM MODAL PARA CONFIRMAÇÃO DE DELETE
		getItems () {
			this.$setLoading(true)
			this.$http.post('itemsSearch')
				.then(ret => {
					this.$setLoading(false)
					this.itemsList = ret.data
				})
				.catch(err =>{
					this.$setLoading(false)
					this.$message(err.response.data)
				})
		},
		editItem (item) {
			this.payload = {...item}
			this.showModalForm = !this.showModalForm
		},
		closeModal (value) {
			this.payload = {}
			if (value && value.add) {
				this.getItems()
			}
			this.showModalForm = !this.showModalForm
		},
		newForm () {
			this.payload = {}
			this.showModalForm = !this.showModalForm
		},
		deleteItem (item) {
			this.$setLoading(true)
			this.$http.post('itemDelete', item)
				.then(response => {
					this.$setLoading(false)
					this.$message(response.data, 'success')
					this.getItems()
				})
				.catch(err =>{
					this.$setLoading(false)
					this.$message(err.response.data)
				})
		}
	}
}
</script>
<style lang="sass">@import "./Item.scss"</style>