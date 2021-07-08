<template>
	<div id="Item">

		<ProductsFilter
			v-if="showFilter"	
			@closeFilter="showFilter = !showFilter"
			@sendFilter="sendFilter"
			@clearFilter="clearFilter"/>

		<list-table 
			:headers="headers"
			:itemsTable="productsList"
			:callback="validationButtons"
			@onEditItem="editItem"
			@onDeleteItem="deleteItem"
		/>
		<ModalProductsForm
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
import ProductsFilter from './ProductsFilter.vue'
import ModalProductsForm from './modal-form/ModalProductsForm.vue'
export default {
	name: 'Productslist',
	components: { 
		ListTable,
		ModalProductsForm,
		ProductsFilter
	},
	data () {
		return {
			headers: [
				{ text: 'Produto', align: 'left', value: 'productName'},
				{ text: 'Ações', align: 'right', value: 'actions', sortable: false, edit: true }
			],
			productsList: [],
			// PROPS DE FILTRO
			showFilter: false,
			filter: {},
			// PROPS DE MODAL
			showModalForm: false,
			payload: {},
			deleteModal: false,
			productDelete: {}
		}
	},
	mounted () {
		this.searchProducts()
	},
	methods: {
		searchProducts () {
			this.$setLoading(true)
			this.$http.post('getProductsById', this.filter)
				.then(res => {
					this.$setLoading(false)
					this.productsList = res.data
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
				this.searchProducts()
			}
			this.showModalForm = !this.showModalForm
		},
		newForm () {
			this.payload = {}
			this.showModalForm = !this.showModalForm
		},
		deleteItem (item) {
			this.productDelete = {...item}
			this.deleteModal = true
		},
		confirmDelete () {
			this.$setLoading(true)
			this.$http.post('productDelete', this.productDelete)
				.then(response => {
					this.deleteModal = false
					this.$setLoading(false)
					this.$message(response.data, 'success')
					this.searchProducts()
				})
				.catch(err =>{
					this.deleteModal = false
					this.$setLoading(false)
					this.$message(err.response.data)
				})
		},
		cancelDelete () {
			this.productDelete = {}
			this.deleteModal = false
		},
		clearFilter () {
			this.filter = {}
			this.searchProducts()
		},
		sendFilter (filter) {
			this.filter = {...filter}
			this.searchProducts()
		},
		validationButtons (item, btn) {
			let ok = true
			if (btn === 'mdi-pencil') ok = false
			return ok
		}
	}
}
</script>
<style lang="sass">@import "./Products.scss"</style>