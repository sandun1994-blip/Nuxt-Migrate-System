import axios  from 'axios'


export const state =()=>({
  allUsers:[],
  overlay:false,
  })
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
  allUsersData(state){
    return  state.allUsers
  },
  overLay(){
    return state.overlay
  }
}

export const actions={

  async postRemind({ commit }, payLoad) {

console.log(payLoad);
    const url ='' + process.env.apiBaseURL + 'reminder'

             const config = {
                method:'post',
                url,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: this.$auth.strategy.token.get(),
                },
                data: payLoad,
              }

              await axios(config)
                .then((res) => {


                })
                .catch((error) => {
                  console.log(error)

                })
  }

}