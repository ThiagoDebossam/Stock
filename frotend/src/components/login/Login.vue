<template>
	<div id="Login">
        <v-container fluid>
			<v-card class="pa-5 card-login">
				<v-container class="pa-5">
					<v-form>
						<v-layout justify-center pa-5>
							<v-icon>inventory_2</v-icon>
						</v-layout>
						<hr class="line-divider">
						<v-text-field
							class="mt-3"
							label="email *"
							type="email"
							v-model="payload.email"
							outlined
						></v-text-field>
						<v-text-field
							label="senha *"
							type="password"
							v-model="payload.password"
							outlined
						></v-text-field>
						<v-layout justify-end>
							<v-btn
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
			payload: {}
		}
	},
	methods: {
		submit () {
			this.$http.post('signin', this.payload)
				.then(res => {
					console.log(res)
				})
				.catch((err) => {
					this.$message(err.response.data)
				})
		}
	}
}
</script>
<style lang="sass">@import "./Login.scss"</style>