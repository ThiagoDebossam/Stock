<template>
	<div id="Item">
		<list-table 
			:headers="headers"
			:itemsTable="itemsList"/>
	</div>
</template>

<script>
import ListTable from '../template/list-table/ListTable.vue'
export default {
  components: { ListTable },
    name: 'ItemList',
	data () {
		return {
			headers: [
				{ text: 'Item', align: 'center', value: 'itemProductName'},
				{ text: 'Quantidade', align: 'center', value: 'itemQuantity'},
				{ text: 'Ações', value: 'actions', sortable: false, edit: true }
			],
			itemsList: []
		}
	},
	mounted () {
		// resolver refresh tirando a autorização
		this.getItems()
	},
	methods: {
		getItems () {
			this.$http.post('itemsSearch')
				.then(ret => {
					this.itemsList = ret.data
				})	
		}
	}
}
</script>
<style lang="sass">@import "./Item.scss"</style>