<template>
    <v-dialog persistent v-model="showModal" width="80%">
        <v-card id="ModalItemsForm">
            <v-layout class="title" align-center justify-space-between>
                <v-card-title>{{ payload.itemId ? 'Editar item' : 'Cadastrar item'}}</v-card-title>
                <v-icon @click="$emit('closeModal')" class="icon-close">close</v-icon>
            </v-layout>
            <v-container class="content" fluid>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-layout row>
                        <v-flex pr-2  xs12 xsm6 md6 lg6 xlg6>
                             <v-select
                             class="field-requried"
                                label="Item"
                                :rules="rules"
                                itemid="productId"
                                item-text="productName"
                                item-value="productId"
                                v-model="payload.itemIdProduct"
                                outlined
                                :items="productsList"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 xsm6 md6 lg6 xlg6>
                            <v-text-field
                                class="field-requried"
                                label="Quantidade"
                                type="number"
                                :rules="rules"
                                v-model="payload.itemQuantity"
                                outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex pa-2 row xs12 sm12 md12 lg12 xlg12>
                            <v-layout justify-end>
                                <v-btn
                                    :disabled="!valid || payload.itemQuantity < 0"
                                    @click.prevent="submit"
                                    type="submit"
                                    class="white--text"
                                    color="#00008b">
                                    {{ payload.itemId ? 'Editar' : 'Salvar'}}
                                </v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalItemsForm',
    props: {
        payload: {
            type: Object,
            default () { return {} }
        }
    },
    data () {
        return {
            showModal: true,
            valid: true,
			rules: [ v => !!v || 'obrigatório' ],
            productsList: []
        }
    },
    mounted () {
        this.getProducts()
    },
    methods: {
        submit () {
			if (this.$refs.form.validate()) {
                this.$setLoading(true)
                this.$http.post('items', this.payload)
                    .then(response => {
                        this.$setLoading(false)
                        this.$message(response.data, 'success')
                        this.$emit('closeModal', {add: true})
                    })
                    .catch(err =>{
                        this.$setLoading(false)
                        this.$message(err.response.data)
                    })
            } else {
                this.$message('Preencha corretamente o formulário!')
            }
        },
        getProducts () {
            this.$setLoading(true)
            this.$http('products')
                .then(response => {
                    this.$setLoading(false)
                    this.productsList = response.data
                })
                .catch(err =>{
                    this.$setLoading(false)
                    this.$message(err.response.data)
                })
        }
    }
}
</script>

<style lang="sass">@import "./ModalItemsForm.scss"</style>