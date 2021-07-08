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
            fields: []
        }
    },
    mounted () {
        this.mountedFilter()
    },
    methods: {
        mountedFilter () {
            this.fields = []
            this.fields = [
                {
                    label: 'Item',
                    type: 'text',
                    value: 'productName'
                }
            ]
        },
        sendFilter (filter) {
            this.$emit('sendFilter', filter.payload)
        }
    }
}
</script>

<style></style>