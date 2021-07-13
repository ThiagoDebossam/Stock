<template>
    <div id="UserFilter">
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
    name: 'UserFilter',
    components: {
		FilterTable
    },
    data () {
        return {
            fields: [],
            profileList: []
        }
    },
    mounted () {
        this.getProfiles()
    },
    methods: {
        mountedFilter () {
            this.fields = []
            this.fields = [
                {
                    label: 'Nome',
                    type: 'text',
                    value: 'name'
                },
                {
                    label: 'Perfil',
                    type: 'select',
                    value: 'user_id_prof',
                    items: this.profileList,
                    itemId: 'prof_id',
                    itemText: 'profile_name'
                }
            ]
        },
        sendFilter (filter) {
            this.$emit('sendFilter', filter.payload)
        },
        getProfiles () {
            this.$setLoading(true)
            this.$http('profiles')
                .then(response => {
                    this.profileList = response.data
                    this.$setLoading(false)
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