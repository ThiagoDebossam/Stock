<template>
	<div>
	<v-app :class="!isLogged ? 'login' : 'index'">
		<template v-if="isLogged">
			<v-app-bar>
			</v-app-bar>
			<router-view>
			</router-view>
		</template>
		<template v-else>
			<router-view>
			</router-view>
		</template>
	</v-app>
	</div>
</template>

<script>

export default {
	name: 'App',
	data () {
		return {
			isLogged: false,
			userSession: {}
		}
	},
	created () {
		if (sessionStorage.getItem('_session')) {
			this.userSession = JSON.parse(sessionStorage.getItem('_session'))
		} else {
			this.userSession = false
		}
		if (this.userSession) {
			this.$http.post('/token', this.userSession)
				.then(() => {
					this.isLogged = true
					if (this.$route.path != '/') this.$router.push({path: '/'})
				})
				.catch(err => {
					this.isLogged = false
					this.$message(err.response.data)
					if (this.$route.path != '/login') this.$router.push({path: '/login'})
					sessionStorage.removeItem('_session')
				})
		} else {
			if (this.$route.path != '/login') this.$router.push({path: '/login'})
		}
	},
	mounted () {
		// if (!this.isLogged && this.$route.path != '/login') this.$router.push({path: '/login'})
	}
}
</script>
<style lang="sass">@import "./assets/index.scss"</style>
