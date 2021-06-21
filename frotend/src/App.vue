<template>
  <v-app>
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