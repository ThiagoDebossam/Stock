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
							class="mt-3"
							label="email *"
							:rules="rules"
							type="email"
							v-model="payload.email"
							outlined
						></v-text-field>
						<v-text-field
							label="senha *"
							type="password"
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
		submit () {
			if (this.$refs.form.validate()) {
				this.$http.post('signin', this.payload)
					.then(res => {
						this.$http.defaults.headers.common['Authorization'] = 'bearer ' + res.data.token
						sessionStorage.setItem('_session', JSON.stringify(res.data))
						window.location.href = '/'
					})
					.catch((err) => {
						this.$message(err.response.data)
					})
			} else {
				this.$message('Preencha todos os campos obrigatórios')
			}
		}
	}
}
</script>
<style lang="sass">@import "./Login.scss"</style>