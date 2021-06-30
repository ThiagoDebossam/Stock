<template>
  <div id="Dashboard">
	<div class="info-dash">
		<v-layout wrap justify-center pa-5 pb-0 white--text>
			Gerencie items, produtos e usuários do sistema com rapidez e facilidade!
		</v-layout>
		<v-layout pt-2>
			<v-container>
				<v-layout justify-center white--text>
					<v-flex xs12 md7 lg7 xlg7 sm7>
						<v-text-field
							@keydown.enter="searchItems"
							outlined
							@click:append="searchItems"
							v-model="productName"
							append-icon="search"
							class="input-dash"
							label="Pesquise um produto"
						></v-text-field>
					</v-flex>
				</v-layout>
			</v-container>
		</v-layout>
	</div>
	<div v-if="searchOn" class="items-search">
		<v-container fluid>
			<v-card class="item-card-search">
				<v-layout class="title-search" wrap white--text justify-space-between align-center>
					<v-flex class="text-center" xs11 sm11 md11 lg11 xlg11>
						<v-card-title>Items referente a busca por: "{{productName}}"</v-card-title>
					</v-flex>
					<v-flex xs1 sm1 md1 lg1 xlg1>
						<v-icon @click="searchOn = false" class="pr-1 icon-close" color="white">close</v-icon>
					</v-flex>
				</v-layout>
				<v-layout>
					<v-container fluid>
						<v-layout v-for="(product, index) in items" :key="index" @click="showModalSellItem(product)" class="item-search" wrap row justify-space-around>
							<v-layout pl-2 column justify-center>
								<v-flex class="text-center"><b>Nome</b></v-flex>
								<v-flex class="text-center">{{product.productName}}</v-flex>
							</v-layout>
							<v-layout column>
								<v-flex class="text-center"><b>Quantidade</b></v-flex>
								<v-flex class="text-center">{{product.quantity}}</v-flex>
							</v-layout>
							<v-layout column>
								<v-flex class="text-center"><b>ID</b></v-flex>
								<v-flex class="text-center">{{product.idItem}}</v-flex>
							</v-layout>
						</v-layout>
					</v-container>
				</v-layout>
			</v-card>
		</v-container>
	</div>
	<div class="cards-dash">
		<v-container fluid>
			<v-layout pa-4 row wrap pt-5>
				<v-flex xs12 sm12 md4 lg4 xlg4>
					<v-card class="item-card">
						<v-layout class="card-title" white--text justify-center>
							<v-card-title>Usuários</v-card-title>
						</v-layout>
						<v-layout pt-3 justify-center>
							<div>
								<v-icon>group_add</v-icon>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex xs12 sm12 md4 lg4 xlg4>
					<v-card class="item-card">
						<v-layout class="card-title" white--text justify-center>
							<v-card-title>Produtos</v-card-title>
						</v-layout>
						<v-layout pt-3 justify-center>
							<div>
								<v-icon>production_quantity_limits</v-icon>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex xs12 sm12 md4 lg4 xlg4>
					<v-card class="item-card">
						<v-layout class="card-title" white--text justify-center>
							<v-card-title>Items</v-card-title>
						</v-layout>
						<v-layout pt-3 justify-center>
							<div>
								<v-icon>category</v-icon>
							</div>
						</v-layout>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
	<ModalSellItem 
		@closeModal="sellItemOn = !sellItemOn"
		v-if="sellItemOn"
		:item="itemSellSelected"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalSellItem from './ModalSellItem.vue'
export default {
	name: 'Dashboard',
	components: {
		ModalSellItem
	},
	data () {
		return {
			searchOn: false,
			productName: null,
			items: [],
			itemSellSelected: {},
			sellItemOn: false
		}
	},
	methods: {
		...mapActions([
			'setLoading'
		]),
		searchItems () {
			if (this.productName === '' || this.productName === null) {
				this.$message('Preencha a pesquisa')
				return false
			}
			this.setLoading(true)
			this.$http.post('itemsSearch', { productName: this.productName})
				.then(res => {
					this.searchOn = true
					this.setLoading(false)
					this.items = res.data
				})
				.catch(err =>{
					this.setLoading(false)
					this.$message(err.response.data)
				})
		},
		showModalSellItem (product) {
			console.log(product)
			this.itemSellSelected = {...product}
			this.sellItemOn = true
		}
	}
}
</script>

<style lang="sass">@import "./Dashboard.scss"</style>