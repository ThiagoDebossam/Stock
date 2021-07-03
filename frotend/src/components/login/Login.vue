<template>
	<div id="Login">
        <v-container fluid>
			<v-card class="pa-5 card-login">
				<v-container class="pa-5">
					<v-form ref="form" v-model="valid" lazy-validation>
						<v-layout justify-center pa-5>
							<v-icon>inventory_2</v-icon>
						</v-layout>
						<hr class="line-divider">
						<v-text-field
							class="mt-3 required-field"
							label="email"
							:rules="rules"
							type="email"
							v-model="payload.email"
							outlined
						></v-text-field>
						<v-text-field
							label="senha"
							type="password"
							class="required-field"
							:rules="rules"
							v-model="payload.password"
							outlined
						></v-text-field>
						<v-layout justify-end>
							<v-btn
								:disabled="!valid"
								@click.prevent="submit"
								type="submit"
								class="white--text"
								color="green">
								Login
							</v-btn>
						</v-layout>
					</v-form>
				</v-container>
			</v-card>
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'Login',
	data () {
		return {
			payload: {},
			valid: true,
			rules: [ v => !!v || 'obrigatório' ],
		}
	},
	mounted () {
		if (sessionStorage.getItem('_session')) window.location.href = '/'
	},
	methods: {
		...mapActions([
			'setLoading',
			'setLogin'
		]),
		submit () {
			if (this.$refs.form.validate()) {
				this.setLoading(true)
				this.$http.post('signin', this.payload)
					.then(res => {
						this.setLogin(true)
						this.$http.defaults.headers.common['Authorization'] = 'bearer ' + res.data.token
						sessionStorage.setItem('_session', JSON.stringify(res.data))
						this.$router.push({path: '/'})
						this.setLoading(false)
					})
					.catch((err) => {
						this.setLoading(false)
						this.$message(err.response.data)
						this.setLogin(false)
					})
			} else {
				this.$message('Preencha todos os campos obrigatórios')
			}
		}
	}
}
</script>
<style lang="sass">@import "./Login.scss"</style>