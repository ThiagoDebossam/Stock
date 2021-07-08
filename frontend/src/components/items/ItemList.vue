<template>
	<div id="Item">

		<ItemsListFilter
			v-if="showFilter"	
			@closeFilter="showFilter = !showFilter"
			@sendFilter="sendFilter"
			@clearFilter="clearFilter"/>

		<list-table 
			:headers="headers"
			:itemsTable="itemsList"
			@onEditItem="editItem"
			@onDeleteItem="deleteItem"
		/>
		<ModalItemsForm
			:itemsList="itemsList"
			@closeModal="closeModal"
			v-if="showModalForm"
			:payload="payload"
		/>
		<v-layout justify-end pr-4 mr-5>
			<v-btn
				v-show="!showFilter"
				@click.prevent="showFilter = !showFilter"
				type="submit"
				class="mr-3 white--text"
				color="#00008b">
				Buscar
			</v-btn>
			<v-btn
				@click.prevent="newForm"
				type="submit"
				class="white--text"
				color="#00008b">
				Adicionar
			</v-btn>
		</v-layout>
		<modal-delete
			@closeModal="deleteModal = false"
			:cancelDelete="cancelDelete"
			:confirmDelete="confirmDelete"
			v-if="deleteModal"
		/>
	</div>
</template>

<script>
import ListTable from '../template/list-table/ListTable.vue'
import ItemsListFilter from './ItemsListFilter.vue'
import ModalItemsForm from './modal-form/ModalItemsForm.vue'
export default {
  components: { 
		ListTable,
		ModalItemsForm,
		ItemsListFilter
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
			// PROPS DE FILTRO
			showFilter: false,
			filter: {},
			// PROPS DE MODAL
			showModalForm: false,
			payload: {},
			deleteModal: false,
			itemDelete: {}
		}
	},
	mounted () {
		this.searchItems()
	},
	methods: {
		searchItems () {
			this.$setLoading(true)
			this.$http.post('itemsSearch', this.filter)
				.then(res => {
					this.$setLoading(false)
					this.itemsList = res.data
				})
				.catch(err =>{
					this.setLoading(false)
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
				this.searchItems()
			}
			this.showModalForm = !this.showModalForm
		},
		newForm () {
			this.payload = {}
			this.showModalForm = !this.showModalForm
		},
		deleteItem (item) {
			this.itemDelete = {...item}
			this.deleteModal = true
		},
		confirmDelete () {
			this.$setLoading(true)
			this.$http.post('itemDelete', this.itemDelete)
				.then(response => {
					this.deleteModal = false
					this.$setLoading(false)
					this.$message(response.data, 'success')
					this.searchItems()
				})
				.catch(err =>{
					this.$setLoading(false)
					this.$message(err.response.data)
				})
		},
		cancelDelete () {
			this.itemDelete = {}
			this.deleteModal = false
		},
		clearFilter () {
			this.filter = {}
			this.searchItems()
		},
		sendFilter (filter) {
			this.filter = {...filter}
			this.searchItems()
		}
	}
}
</script>
<style lang="sass">@import "./Item.scss"</style>