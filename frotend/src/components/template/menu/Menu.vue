<template>
    <v-navigation-drawer
    v-model="showMenu"
    absolute
    temporary
    >
    <v-list
        nav
        dense
    >
        <v-list-item-group
        >
        <v-list-item class="d-flex justify-center align-center">
            <v-list-item-title><v-icon>category</v-icon> Items do estoque</v-list-item-title>
        </v-list-item>

        <v-list-item>
            <v-list-item-title><v-icon>production_quantity_limits</v-icon> Produtos</v-list-item-title>
        </v-list-item>

        <v-list-item>
            <v-list-item-title><v-icon>group_add</v-icon> Usuários</v-list-item-title>
        </v-list-item>

        <v-list-item>
            <v-list-item-title><v-icon>track_changes</v-icon> Outros</v-list-item-title>
        </v-list-item>
        </v-list-item-group>
    </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: 'Menu',
    data () {
        return {
            showMenu: true
        }
    },
    watch: {
        showMenu: {
            handler () {
                this.$emit('toggleMenu')
            }
        }
    }
}
</script>

<style>

</style>