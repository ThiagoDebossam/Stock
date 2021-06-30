<template>
    <v-dialog persistent v-model="showModal" width="40%">
        <v-card id="ModalSellItem">
            <v-layout class="title" align-center justify-space-between>
                <v-card-title>Vender item: {{item.productName}}</v-card-title>
                <v-icon @click="$emit('closeModal')" class="icon-close">close</v-icon>
            </v-layout>
            <v-container class="content" fluid>
                <v-layout row align-center justify-center>
                    <v-flex xs12 sm12 md12 lg12 xlg12>
                        Disponível: {{item.quantity}}
                    </v-flex>
                    <v-flex pt-2 xs12 sm12 md12 lg12 xlg12>
                        <v-text-field
                            outlined
                            type="number"
                            label="Quantidade da venda"
                            v-model="productSell.quantity"
                            ></v-text-field>
                    </v-flex>
                    <v-layout justify-end>
                        <v-btn
                            @click="sellItem"
                            color="#00008b" 
                            class="white--text"
                            :disabled="(productSell.quantity > item.quantity || productSell.quantity <= 0 || !productSell.quantity) ? true : false"
                            >Vender</v-btn>
                    </v-layout>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalSellItem',
    props: {
        item: {
            type: Object,
            default () { return {} },
            required: true
        }
    },
    data () {
        return {
            productSell: {},
            showModal: true
        }
    },
    methods: {
        sellItem () {
            this.$message('Vender item', 'success')
        }
    }
}
</script>

<style lang="scss">@import "./ModalSellItem.scss"</style>