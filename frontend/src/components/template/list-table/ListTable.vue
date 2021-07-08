<template>
    <div id="ListTable">
        <v-container fluid>
            <v-data-table
                :headers="headers"
                :items="itemsTable"
                :items-per-page="5"
                class="elevation-1">
            <template v-slot:item.actions="{ item }">
                <v-icon v-if="callback(item, 'mdi-pencil')" small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon v-if="callback(item, 'mdi-delete')" small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
  export default {
    name: 'ListTable',
    props: {
        headers: {
            type: Array,
            default () { return []},
            required: true
        },
        itemsTable: {
            type: Array,
            default () { return []},
            required: true
        },
        callback: {
            type: Function,
            default () { return true }
        }
    },
    methods: {
        editItem (item) {
            this.$emit('onEditItem', item)
        },
        deleteItem (item) {
            this.$emit('onDeleteItem', item)
        }
    }
  }
</script>
<style lang="sass">@import "./ListTable.scss"</style>