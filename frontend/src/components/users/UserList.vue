<template>
	<div id="Item">

		<UserFilter
			v-if="showFilter"	
			@closeFilter="showFilter = !showFilter"
			@sendFilter="sendFilter"
			@clearFilter="clearFilter"/>

		<list-table 
			:headers="headers"
			:itemsTable="userList"
			@onEditItem="editItem"
			@onDeleteItem="deleteItem"
		/>
		<ModalUserForm
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
import UserFilter from './UserFilter.vue'
import ModalUserForm from './modal-form/ModalUserForm.vue'
export default {
	name: 'UserList',
	components: { 
		ListTable,
		ModalUserForm,
		UserFilter
	},
	data () {
		return {
			headers: [
				{ text: 'Nome', align: 'left', value: 'name'},
				{ text: 'E-mail', align: 'left', value: 'email'},
				{ text: 'Ações', align: 'right', value: 'actions', sortable: false, edit: true }
			],
			userList: [],
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
		this.searchUsers()
	},
	methods: {
		searchUsers () {
			this.$setLoading(true)
			this.$http.post('searchUser', this.filter)
				.then(res => {
					this.$setLoading(false)
					this.userList = res.data
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
				this.searchUsers()
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
			this.$http.post('userDelete', this.productDelete)
				.then(response => {
					this.deleteModal = false
					this.$setLoading(false)
					this.$message(response.data, 'success')
					this.searchUsers()
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
			this.searchUsers()
		},
		sendFilter (filter) {
			console.log(filter)
			this.filter = {...filter}
			this.searchUsers()
		}
	}
}
</script>
<style lang="sass">@import "./User.scss"</style>