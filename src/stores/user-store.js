
import { defineStore } from 'pinia'


const HOST = import.meta.env.VITE_APP_API_HOST || 'http://localhost:3001'
const API_URL = HOST + '/api/v1'
const USERS_URL = API_URL + '/users'

export const useUserStore = defineStore('User', {
  state: () => {
    return {
        id: null,
        token: null,
        email: null,
        nickname: null,
        firstName: null,
        lastName: null,
        profilePicture: null,
        groups: null,
        currentGroup: null,
     }
  },
  actions: {
    async setUserDetails(data) {
      this.$state.id = data.user._id;
      this.$state.token = data.token;
      this.$state.email = data.user.email;
      this.$state.nickname = data.user.nickname;
      this.$state.firstName = data.user.firstName;
      this.$state.lastName = data.user.lastName;
      this.$state.profilePicture = data.user.profilePicture;
      this.$state.groups = data.user.groups;
      this.$state.currentGroup = data.user.currentGroup;
    },
    async fetchUser() {
      const response = await fetch(USERS_URL+ '/' + this.$state.id,{
        method: 'GET',
        headers: {
          'x-auth-token': this.$state.token,
        },
      })
      const data = await response.json()

      this.$state.id = data._id
      this.$state.firstName = data.firstName
      this.$state.lastName = data.lastName
      this.$state.email = data.email
      this.$state.nickname = data.nickname
    },
    clearUser() {
      this.$state.id = null
      this.$state.token = null
      this.$state.firstName = null
      this.$state.lastName = null
      this.$state.email = null
      this.$state.location = null
      this.$state.image = null
      this.$state.description = null
    },
  },
  persist: true
})

