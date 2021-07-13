<template>
    <v-dialog persistent v-model="showModal" width="80%">
        <v-card id="ModalUserForm">
            <v-layout class="title" align-center justify-space-between>
                <v-card-title>{{ payload.userId ? 'Editar usuário' : 'Cadastrar usuário'}}</v-card-title>
                <v-icon @click="$emit('closeModal')" class="icon-close">close</v-icon>
            </v-layout>
            <v-container class="content" fluid>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-layout pa-2 row>
                        <v-flex pr-2  xs12 xsm4 md4 lg4 xlg4>
                             <v-select
                                class="field-requried"
                                label="Perfil"
                                :rules="rules"
                                itemid="prof_id"
                                item-text="profile_name"
                                no-data-text="Ops, nada por aqui ;)"
                                item-value="prof_id"
                                v-model="payload.user_id_prof"
                                outlined
                                :items="profileList"
                            ></v-select>
                        </v-flex>
                        <v-flex pr-2 xs12 sm4 md4 lg4 xlg4>
                            <v-text-field
                                class="field-requried"
                                label="Nome"
                                type="text"
                                :rules="rules"
                                v-model="payload.name"
                                outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex pr-2 xs12 sm4 md4 lg4 xlg4>
                            <v-text-field
                                class="field-requried"
                                label="E-mail"
                                type="email"
                                :rules="emailRules"
                                v-model="payload.email"
                                outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex pr-2 xs12 sm6 md6 lg6 xlg6>
                            <v-text-field
                                class="field-requried"
                                label="Senha"
                                type="password"
                                :rules="rules"
                                v-model="payload.password"
                                outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex pr-2 xs12 sm6 md6 lg6 xlg6>
                            <v-text-field
                                class="field-requried"
                                label="Confirme sua senha"
                                type="password"
                                :rules="rules"
                                v-model="payload.confirmPassword"
                                outlined
                            ></v-text-field>
                        </v-flex>
                        <v-flex pa-2 row xs12 sm12 md12 lg12 xlg12>
                            <v-layout justify-end>
                                <v-btn
                                    :disabled="!valid"
                                    @click.prevent="submit"
                                    type="submit"
                                    class="white--text"
                                    color="#00008b">
                                    {{ payload.userId ? 'Editar' : 'Salvar'}}
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
    name: 'ModalUserForm',
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
            profileList: [],
            emailRules: [
                v => !!v || 'obrigatório',
                v => /.+@.+\..+/.test(v) || 'E-mail inválido',
            ]
        }
    },
    mounted () {
        this.getProfiles()
    },
    methods: {
        getProfiles () {
            this.$setLoading(true)
            this.$http('profiles')
                .then(response => {
                    this.profileList = response.data
                    this.$setLoading(false)
                    
                })
                .catch(err =>{
                    this.$setLoading(false)
                    this.$message(err.response.data)
                })
        },
        submit () {
			if (this.$refs.form.validate()) {
                this.$setLoading(true)
                this.$http.post('user', this.payload)
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
        }
    }
}
</script>

<style lang="sass">@import "./ModalUserForm.scss"</style>