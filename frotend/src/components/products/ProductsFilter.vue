<template>
    <div id="ItemsListFilter">
		<filter-table
            @closeFilter="$emit('closeFilter')"
            @sendFilter="sendFilter"
            @clearFilter="$emit('clearFilter')"
            :fields="fields"/>
    </div>
</template>

<script>
import FilterTable from '../template/filter-table/FilterTable.vue'

export default {
    name: 'ItemsListFilter',
    components: {
		FilterTable
    },
    data () {
        return {
            fields: [],
            products: []
        }
    },
    mounted () {
        this.getProducts()
    },
    methods: {
        mountedFilter () {
            this.fields = []
            this.fields = [
                {
                    label: 'Produto',
                    type: 'combobox',
                    value: 'productId',
                    items: this.products
                }
            ]
        },
        sendFilter (filter) {
            this.$emit('sendFilter', filter.payload.productId)
        },
        getProducts () {
            this.$setLoading(true)
            this.$http('products')
                .then(response => {
                    this.$setLoading(false)
                    this.products = response.data
                    this.mountedFilter()
                })
                .catch(err =>{
                    this.$setLoading(false)
                    this.$message(err.response.data)
                })
        }
    }
}
</script>

<style></style>