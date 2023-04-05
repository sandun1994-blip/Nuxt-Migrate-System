<template>
  <v-app >
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dense
      color="deep-purple accent-4"
      height="78"

    >
     <v-img
        class="mx-1"
        :src="require('@/assets/auz-connect-logo.png')"
        max-height="40px"
        max-width="200px"
        contain
        to="/"
      ></v-img>
<v-spacer></v-spacer>
      <v-row v-if="isAuthenticated" align="center" justify="space-around">

        <v-btn v-for="(item, i) in menuItems" :key="i"
                          text
                          small
                          :to="item.systemMenuItem.link"
                          color="white"
                        >
                          {{ item.systemMenuItem.name }}
                        </v-btn>
      </v-row>

      <v-spacer />
      <v-btn v-if="isAuthenticated" small class="mr-3" text tile to="profile" color="white">
        <v-icon color="white" left>mdi-account</v-icon>
        {{ loggedInUser.firstName }}
      </v-btn>

      <v-btn v-if="!isAuthenticated" small color="success mr-3" to="login" dark>
        Login
      </v-btn>
      <v-btn v-if="isAuthenticated" small color="red mr-3" dark @click="logout">
        Logout
      </v-btn>
      <!--v-btn small color="primary" to="register" dark> Register </v-btn-->
      <v-btn icon to="/">
        <v-icon  color="white">mdi-home</v-icon>
      </v-btn>
      <v-btn v-if="isAuthenticated" icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid id="con-id">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; OneSysConsulting - {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    ...mapState({
    menuItems: (state) => state.app.menuItems,
    breadcrumbItems: (state) => state.app.breadcrumbItems,
     })
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
<style>
div.v-toolbar__extension {
  background-color: green !important;
}
.v-application {
    background-color: var(--v-background-base) !important;
}

#con-id{
padding: 0px;
}
</style>
