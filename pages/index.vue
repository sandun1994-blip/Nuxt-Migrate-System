<template>
  <v-container>
    <v-card :loading="loading" class="mx-auto my-12">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img :src="require('@/assets/auz-connect-logo2.png')" height="99px" width="500px"></v-img>

      <v-divider class="mx-4 mt-5 mb-10"></v-divider>

      <v-container v-if="isAuthenticated">
        <v-row dense>
          <v-col v-for="(item, i) in usersystemmenuitems" :key="i" cols="12" sm="4">
            <v-card :color="item.systemMenuItem.color" dark :to="item.link">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="text-h5"
                    v-text="item.systemMenuItem.name"
                  ></v-card-title>

                  <v-card-subtitle v-text="item.systemMenuItem.subtitle"></v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      :to="item.systemMenuItem.link"
                    >
                      {{ item.systemMenuItem.name }}
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-icon x-large class="mr-5">{{ item.systemMenuItem.icon }}</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
import axios from 'axios'
export default {
  data: () => ({
    loading: false,
    selection: 1,
    usersystemmenuitems:[],
  }),
  async fetch() {
    const url = '' + process.env.apiBaseURL + 'usersystemmenuitem/user/'+this.loggedInUser.id+'/active/1'
    const config = {
      method: 'get',
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.$auth.strategy.token.get(),
      },
    }
    this.overlay = !this.overlay
    await axios(config)
      .then((res) => {
        this.usersystemmenuitems = res.data.sort((a, b) => a.systemMenuItem.sortOrder - b.systemMenuItem.sortOrder)
        this.setMenuItems(this.usersystemmenuitems)
      })
      .catch((error) => {
        console.log(error)
        this.message = error.response.data.message
        const code = parseInt(error.response && error.response.status)
        if (code === 401) {
          this.message =
            'Youe session timed out. Please logout and log back again.'
        }
      })
    this.overlay = !this.overlay
  },
  methods: {
    ...mapMutations({
      setMenuItems: 'app/setMenuItems',
    }),
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
}
</script>
