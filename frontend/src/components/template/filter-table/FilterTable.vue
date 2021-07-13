<template>
    <div id="FilterTable" @keydown.ctrl.x="$emit('closeFilter')" @keydown.esc="clearFilter" @keydown.enter="$emit('sendFilter', {payload})">
        <v-layout pa-4 row wrap>
            <v-flex pa-3 xs12 sm6 md3 lg3 xlg3 v-for="(field, index) in fields" :key="index">
                <v-text-field 
                    v-if="field.type === 'text'"
                    outlined
                    v-model="payload[field.value]"
                    :placeholder="field.placeholder || ''"
                    :label="field.label">
                </v-text-field>
                <v-combobox
                    v-if="field.type === 'combobox'"
                    outlined
                    item-value="productId"
                    item-text="productName"
                    v-model="payload[field.value]"
                    :items="field.items || []"
                    :placeholder="field.placeholder || ''"
                    :label="field.label">
                ></v-combobox>
                <v-select
                    v-if="field.type === 'select'"
                    outlined
                    :item-value="field.itemId"
                    :item-text="field.itemText"
                    v-model="payload[field.value]"
                    :items="field.items || []"
                    :placeholder="field.placeholder || ''"
                    clearable
                    :label="field.label">
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout justify-end pr-4 mr-5>
            <v-btn
                @click.prevent="$emit('closeFilter')"
                class="mb-5 pr-5 mr-1 white--text"
                color="red"
                title="Aperte 'CTRL + X' para fechar">
                Fechar
            </v-btn>
            <v-btn
                @click.prevent="clearFilter"
                class="mb-5 pr-5 mr-1 white--text"
                color="#d47d10"
                title="Aperte 'ESC' para limpar">
                Limpar
            </v-btn>
            <v-btn
                @click.prevent="$emit('sendFilter', {payload})"
                class="mb-5 white--text"
                title="Aperte 'ENTER' para buscar"
                color="#00008b">
                Buscar
            </v-btn>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: 'FilterTable',
    props: {
        fields: {
            type: Array,
            default () {return []},
            required: true
        }
    },
    data () {
        return {
            payload: {}
        }
    },
    methods: {
        clearFilter () {
            this.payload = {}
            this.$emit('clearFilter')
        }
    }
}
</script>

<style lang="sass">@import "./FilterTable.scss"</style>