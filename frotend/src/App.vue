<template>
	<div>
	<v-app :class="!isLogged ? 'login' : 'index'">
		<template>
			<Header @toggleMenu="drawer = !drawer" v-if="isLogged" />
			<Menu v-if="drawer" @toggleMenu="drawer = !drawer" :group="group"/>		
			<moon-loader :loading="loading" :color="'#337ab7'" :size="'100px'"></moon-loader>
			<router-view>
			</router-view>
		</template>
	</v-app>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Header from './components/template/header/Header.vue'
import Menu from './components/template/menu/Menu.vue'
export default {
	name: 'App',
	components: {
		Header,
		Menu
	},
	data () {
		return {
			userSession: {},
			drawer: false,
			group: null
		}
	},
	computed: {
		...mapGetters([
            'loading',
			'isLogged'
        ])
	},
	methods: {
		...mapActions([
			'setLoading',
			'setLogin'
		])
	},
	created () {
		this.setLoading(true)
		if (sessionStorage.getItem('_session')) {
			this.userSession = JSON.parse(sessionStorage.getItem('_session'))
		} else {
			this.userSession = false
		}
		if (this.userSession) {
			this.$http.post('/token', this.userSession)
				.then(() => {
					this.setLoading(false)
					this.setLogin(true)
					if (this.$route.path != '/') this.$router.push({path: '/'})
				})
				.catch(err => {
					this.setLoading(false)
					this.setLogin(false)
					this.$message(err.response.data)
					if (this.$route.path != '/login') this.$router.push({path: '/login'})
					sessionStorage.removeItem('_session')
				})
		} else {
			this.setLoading(false)
			this.setLogin(false)
			if (this.$route.path != '/login') this.$router.push({path: '/login'})
		}
	},
	mounted () {
	}
}
</script>
<style lang="sass">@import "./assets/index.scss"</style>
