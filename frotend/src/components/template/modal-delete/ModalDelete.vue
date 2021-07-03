<template>
    <v-dialog persistent v-model="showModal" width="40%">
        <v-card id="ModalDelete">
            <v-layout class="title" align-center justify-space-between>
                <v-card-title>Deletar</v-card-title>
                <v-icon @click="$emit('closeModal')" class="icon-close">close</v-icon>
            </v-layout>
            <v-container class="content" fluid>
                <v-layout row>
                    <v-flex pa-5 mb-2>
                        <div>Deseja realmente excluir ?</div>
                    </v-flex>
                    <v-flex pa-2 row xs12 sm12 md12 lg12 xlg12>
                        <v-layout justify-end>
                            <v-btn
                                @click.prevent="cancelDelete"
                                class="white--text mr-5"
                                color="red">
                                Cancelar
                            </v-btn>
                            <v-btn
                                @click.prevent="confirmDelete"
                                class="white--text"
                                color="#00008b">
                                Confirmar
                            </v-btn>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ModalDelete',
    props: {
        cancelDelete: {
            type: Function,
            default () { return false}
        },
        confirmDelete: {
            type: Function,
            default () { return false}
        }
    },
    data () {
        return {
            showModal: true
        }
    },
}
</script>

<style lang="sass">@import "./ModalDelete.scss"</style>