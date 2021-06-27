<template>
    <v-card class="overflow-hidden">
        <v-app-bar
        absolute
        color="white"
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        >
            <v-app-bar-nav-icon @click="$emit('toggleMenu')"></v-app-bar-nav-icon>

            <v-toolbar-title style="cursor: pointer" @click="$route.path != '/' ? $router.push({path: '/'}) : ''">Estoque +</v-toolbar-title>

            <v-spacer></v-spacer>
            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon
                            v-bind="attrs"
                            v-on="on"
                            >
                            <v-icon style="font-size: 40px">mdi-account-circle</v-icon>
                        </v-btn>
                    </template>    
                        <v-list>
                            <v-list-item @click="logout">
                                <v-list-item-title><v-icon>logout</v-icon>Sair</v-list-item-title>
                            </v-list-item>
                        </v-list>
                </v-menu>
            </div>
        </v-app-bar>
        <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="600"
        >
        <v-container style="height: 60px;">
        </v-container>
        </v-sheet>
    </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Header',
    methods: {
        ...mapActions([
			'setLogin'
		]),
        logout () {
            this.setLogin(false)
            sessionStorage.removeItem('_session')
            this.$router.push({path: '/login'})
        }
    },
    mounted() {
        // console.log(this.$route.path)
    }
}
</script>