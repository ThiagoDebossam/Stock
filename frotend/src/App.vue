<template>
	<div>
	<v-app :class="!isLogged ? 'login' : ''">
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
      isLogged: false
    }
  }
}
</script>
<style lang="sass">@import "./assets/index.scss"</style>
