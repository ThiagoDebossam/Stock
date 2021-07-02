<template>
    <div id="ListTable">
        <v-container fluid>
            <v-data-table
                :headers="headers"
                :items="itemsTable"
                :items-per-page="5"
                class="elevation-1">
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)" >mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)" > mdi-delete</v-icon>
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
        }
    }
  }
</script>
<style lang="sass">@import "./ListTable.scss"</style>