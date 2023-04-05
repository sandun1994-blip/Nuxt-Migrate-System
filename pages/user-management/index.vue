/* eslint-disable vue/v-slot-style */
<template>
<div  class='mr-15 ml-15'>
  <material-card
    icon="mdi-point-of-sale"
    icon-small
    title="System Users"
    :subtitle="getFetchState"
    class="mt-5 ml-15 mr-15 mb-5"
    color="indigo accent-1"
  >
    <v-data-table
      :headers="headers"
      :items="systemusers"
      class="elevation-1"
      :items-per-page="25"
      sort-by="id"
      :sort-desc="false"
      :search="search"
      item-key="id"
    >
      <template #top>
        <v-toolbar flat>
          <v-card-title>
            <v-text-field
              id="user_search"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              name="user_search"
            ></v-text-field>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="800px">
            <template #activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Add New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.firstName"
                          label="First Name"
                          :counter="200"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.lastName"
                          label="Last Name"
                          :counter="200"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                                        <v-row>
                    <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          :counter="200"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-col>
                                  </v-row>
                    <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.username"
                          label="User Name"
                          :counter="200"
                          :rules="nameRules"
                          :name="`username_${Math.random()}`"
                          autocomplete="username"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-if="editedItem.id ===0"
                          v-model="editedItem.password"
                          label="Password"
                          :counter="200"
                          :rules="passwordRules"
                          :name="`password_${Math.random()}`"
                          autocomplete="password"
                          required
                          type="password"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-checkbox
                            v-model="editedItem.isActive"
                            label="Active"
                          >
                        </v-checkbox>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <template>
      <v-dialog v-model="dialogUpdatePassword" persistent max-width="600px">
        <template #activator="{ attrs }">
          <v-chip
            class="ma-2"
            color="red"
            :outlined="true"
            v-bind="attrs"
            @click="updateItemPassword"
          >
            Update Password
          </v-chip>
        </template>
        <v-form ref="passwordForm" v-model="valid" lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">Update Password</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="newPassword"
                      label="New Password*"
                      :counter="10"
                      :rules="passwordRules"
                      type="password"
                      :name="`newPassword_${Math.random()}`"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="confirmNewPassword"
                      label="Confirm New Password*"
                      :counter="10"
                      :rules="passwordRules"
                      type="password"
                      :name="`confirmNewPassword_${Math.random()}`"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="dialogMessage !== ''"
                class="ma-2"
                :outlined="true"
                :color="messageColor"
              >
                {{ dialogMessage }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogUpdatePassword = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="updatePassword">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </template>
    <v-spacer></v-spacer>
                <v-btn
                  v-if="dialogMessage !== ''"
                  class="ma-2"
                  :outlined="true"
                  :color="messageColor"
                >
                  {{ dialogMessage }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="info darken-1" @click="close"> Close </v-btn>

                <v-btn
                  color="success darken-1"
                  :disabled="!valid"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
              <v-overlay :value="overlay">
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>

      <template #[`item.isActive`]="{ item }">
        <v-icon small class="mr-2" v-if="item.isActive ===1"> mdi-check </v-icon>
        <v-icon small class="mr-2" v-else> mdi-close </v-icon>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-chip
            class="ma-2"
            color="teal"
            small
            :outlined="true"
            @click="editItem(item)"
          >
            Update User
          </v-chip>
          <v-chip
            class="ma-2"
            color="purple"
            small
            :outlined="true"
            @click="updateItemPermision(item)"
          >
            Update Permision
          </v-chip>
      </template>

    </v-data-table>
    <template>
      <v-dialog v-model="dialogUpdatePermision" persistent max-width="600px">
        <v-form ref="permisionForm" v-model="valid" lazy-validation>
          <v-card>
            <v-card-title>
              <span class="headline">Update Permision</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-data-table dense :disable-pagination="true" :headers="permisionheaders" :items="systemuser_menuitems" class="elevation-1" sort-by="id" :sort-desc="false" :hide-default-footer="true">
  <template #[`item.isActive`]="{ item }">
        <v-checkbox v-model="item.isActive" class="mt-0"></v-checkbox>
      </template>
  </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="dialogMessage !== ''"
                class="ma-2"
                :outlined="true"
                :color="messageColor"
              >
                {{ dialogMessage }}
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="dialogUpdatePermision = false">
                Close
              </v-btn>
              <v-btn color="success darken-" @click="updateUserPermision">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </template>
    <v-spacer></v-spacer>
          <v-card-title>
            <v-btn color="info" x-small dark @click="$fetch">
              Reload
              <v-icon right dark> mdi-refresh </v-icon>
            </v-btn>
          </v-card-title>
    <v-overlay :value="overlay">
      <v-progress-circular size="150" width="7" indeterminate
        >Please wait....</v-progress-circular
      >
    </v-overlay>
  </material-card>
  </div>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  name: 'SystemUsersView',
  data() {
    return {
      systemusers: [],
      message: '',
      overlay: false,
      valid: true,
      dialog: false,
      dialogUpdatePassword: false,
      dialogUpdatePermision:false,
      dialogMessage: '',
      messageColor: '',
      search: '',
      userpermissions: [],
      systemmenuitems: [],
      systemuser_menuitems: [],
      permisionheaders:[
        { text: 'Id', value: 'id',sortable:false, width: "1%" },
        { text: 'Menu', value: 'name',sortable:false, width: "1%" },
        { text: 'Active', value: 'isActive',sortable:false, width: "1%" },
      ],
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'First Name', value: 'firstName' },
        { text: 'Last Name', value: 'lastName' },
        { text: 'User Name', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Active', value: 'isActive' },
        { text: '', value: 'actions' },
      ],
      editedIndex: -1,
      initialIndex: -1,
      editedItem: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        isActive: 1,
      },
      defaultItem: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        isActive: 1,
      },
      initialItem: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        isActive: 1,
      },
      newPassword: '',
    confirmNewPassword: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 20) || 'Name must be less than 20 characters',
    ],
    emailRules: [(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        (v && v.length <= 10 && v.length >= 4) ||
        'Password must be atleast 4 characters & less than 10 characters',
    ],
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),

    getFetchState() {
      return this.$fetchState.pending
        ? 'Loading'
        : this.$fetchState.error
        ? 'An Error Occured. Please Try Again'
        : this.message
    },
    formTitle() {
      return this.editedIndex === -1 ? 'New User' : 'Edit User'
    },
  },
  async fetch() {
    const url = '' + process.env.apiBaseURL + 'user'
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
      .then(async (res) => {
        this.systemusers = res.data
        this.message = 'No of Records : ' + this.systemusers.length
       await this.getSystemMenuItems()
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
    this.overlay = false
  },
  watch: {
    overlay(val) {
      val ||
        setTimeout(() => {
          this.overlay = false
        }, 3000)
    },
  },
  methods: {
    async getUserAllocatedPermissions(item) {
      console.log('getUserAllocatedPermissions item.id: ' + item.id)

        const url =
          '' +
          process.env.apiBaseURL +
          'usersystemmenuitem/user/' +
          item.id
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
            this.userpermissions = res.data
            console.log('userpermissions : ' + this.userpermissions.length)
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
        return this.userpermissions
    },
    async getSystemMenuItems() {
      const url =
          '' +
          process.env.apiBaseURL +
          'systemmenuitem'
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
            this.systemmenuitems = res.data
            console.log('systemmenuitems : ' + this.systemmenuitems.length)
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
    editItem(item) {
      this.editedIndex = this.systemusers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.initialItem  = Object.assign({}, item)
      this.dialogMessage = ''
      this.messageColor = ''
      this.dialog = true
    },
    async updateItemPermision(item) {
      console.log('updateItemPermision');
      this.editedItem = Object.assign({}, item)
      this.dialogMessage = ''
      this.messageColor = ''
      this.userpermissions = []
      this.systemuser_menuitems=[]
      this.userpermissions = await this.getUserAllocatedPermissions(item)
      this.systemmenuitems.forEach((menu) => {
          menu.isActive =0
          this.userpermissions.forEach((userMenu) => {
          if (menu.id === userMenu.systemMenuItem.id){
            menu.isActive = userMenu.isActive
          }
          })
        this.systemuser_menuitems.push(menu)
      })
      console.log(this.systemuser_menuitems)
      console.log(item.id+'='+item.firstName)
      this.systemuser_menuitems.forEach((element) => {
        console.log(element.id+'='+element.isActive)
      })
      this.dialogUpdatePermision = true
    },
    async getUserSystemMenuByUserIdMenuId(userId,menuId) {
      let usersystemmenuitems=[]
      const url =
          '' +
          process.env.apiBaseURL +
          'usersystemmenuitem/user/'+userId+'/menu/'+menuId
          console.log('getUserSystemMenuByUserIdMenuId-url ='+url)
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
            usersystemmenuitems = res.data
            console.log('usersystemmenuitems : ' + usersystemmenuitems.length)
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
        return usersystemmenuitems
    },
    async updateUserSystemMenu(userMenu) {
      userMenu.lastUpdatedDate= new Date()
      userMenu.lastUpdatedBy=this.loggedInUser.username
      const url =
          '' +
          process.env.apiBaseURL +
          'usersystemmenuitem/'+userMenu.id
          console.log('updateUserSystemMenu-url ='+url)
        const config = {
          method: 'put',
          url,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.strategy.token.get(),
          },
          data: userMenu,
        }
        this.overlay = !this.overlay
        await axios(config)
          .then((res) => {
            console.log('usersystemmenuitems : ' + res.data)
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
    async insertUserSystemMenu(user,menu,isActive) {
      const url =
          '' +
          process.env.apiBaseURL +
          'usersystemmenuitem'
        const config = {
          method: 'post',
          url,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.strategy.token.get(),
          },
          data: {user,systemMenuItem:menu,isActive,createdDate: new Date(),createdBy: this.loggedInUser.username,lastUpdatedDate: new Date(),lastUpdatedBy: this.loggedInUser.username}
        }
        this.overlay = !this.overlay
        await axios(config)
          .then((res) => {
            console.log('usersystemmenuitems : ' + res.data)
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
     updateUserPermision(item) {
      console.log('updateUserPermision-->systemuser_menuitems='+this.systemuser_menuitems.length)
      console.log('this.editedItem='+this.editedItem.id+' - '+this.editedItem.name)
      let userSysMenus=[]
      this.systemuser_menuitems.forEach(async (menu) => {
        console.log(menu.id+' = '+menu.isActive)
         userSysMenus =  await this.getUserSystemMenuByUserIdMenuId(this.editedItem.id,menu.id)
         console.log('userSysMenus='+userSysMenus)
        if(userSysMenus && userSysMenus.length>0)
        {
          userSysMenus.forEach(async (usermenu) => {
            usermenu.isActive=menu.isActive
            await this.updateUserSystemMenu(usermenu);
          })
        }else
        {
          await this.insertUserSystemMenu(this.editedItem,menu,menu.isActive);
        }
      })
      this.messageColor = 'success'
      this.dialogMessage = 'Successfully Updated'
    },
    updateItemPassword(item) {
      this.dialogUpdatePassword = true
      this.dialogMessage = ''
      this.messageColor = ''
    },
    updatePassword() {
      if (this.$refs.passwordForm.validate()) {
        console.log(this.confirmNewPassword)
        console.log(this.newPassword)
        if (this.confirmNewPassword !== this.newPassword) {
          this.messageColor = 'error'
          this.dialogMessage = 'Password mistmatch'
          return
        }
        this.dialogMessage = ''
        this.messageColor = ''
        const url =
          '' +
          process.env.apiBaseURL +
          'user/update-password/' +
          this.editedItem.id
        const data = {
          firstName: this.editedItem.firstName,
          lastName: this.editedItem.lastName,
          password: this.newPassword,
        }
        if (data && url) {
          const config = {
            method: 'put',
            url,
            headers: {
              'Content-Type': 'application/json',
            },
            data,
          }
          axios(config)
            .then((response) => {
              console.log(response)
              this.messageColor = 'success'
              this.dialogMessage = 'Successfully Updated'
            })
            .catch((error) => {
              this.messageColor = 'error'
              this.dialogMessage = error.response.data.message
            })
        }
      }
    },
   async save() {
      if (this.$refs.form.validate()) {
        let url = '' + process.env.apiBaseURL + 'authentication/register'
        let httpMethod = 'post'
        if(!this.isPostChange())
        {
          this.dialogMessage = 'No Changes to Save'
        }
        else{

        if (this.editedItem.id > 0) {
          httpMethod = 'put'
          url = url = '' + process.env.apiBaseURL + 'user/update-profile/' + this.editedItem.id
        }
        const config = {
          method: httpMethod,
          url,
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$auth.strategy.token.get(),
          },
          data: this.editedItem,
        }
        this.overlay = !this.overlay
        await axios(config)
          .then((res) => {
            console.log(res.data)
            this.editedItem = res.data

            this.messageColor = 'success'
            console.log(this.editedIndex)
            if (httpMethod === 'post') {
              this.systemusers.push(this.editedItem)
              this.dialogMessage = 'Successfully Created'
            } else {
              Object.assign(this.systemusers[this.editedIndex], this.editedItem)
              this.dialogMessage = 'Successfully Updated'
            }
          })
          .catch((error) => {
            console.log(error)
            this.dialogMessage = error.response.data.message
            this.messageColor = 'error'
            const code = parseInt(error.response && error.response.status)
            if (code === 401) {
              this.dialogMessage = 'Your session timed out. Please logout and log back again.'
            }
          })
        this.overlay = !this.overlay
        }
      }
    },
    isPostChange()
    {
      return this.editedItem.firstName!==this.initialItem.firstName || this.editedItem.lastName!==this.initialItem.lastName || this.editedItem.email!==this.initialItem.email  || this.editedItem.username!==this.initialItem.username || this.editedItem.isActive!==this.initialItem.isActive

    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.initialItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.dialogMessage = ''
      this.messageColor = ''
    }
  },
}
</script>
<style>
.scanner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  max-width: 1280px;
  max-height: 80%;
}

.styleOrange {
  background-color: #ffcc80;
}
.styleRed {
  background-color: #ef9a9a;
}
.styleDarkOrange {
  background-color: #ee5914;
}
.styleGreen {
  background-color: #9ccc65;
}
.stylePurple {
  background-color: #e1bee7;
}
</style>
