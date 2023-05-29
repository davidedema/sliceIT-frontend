
import { defineStore } from 'pinia'

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
      //console.log('setUserDetails', data)
      this.$state.id = data.user._id;
      this.$state.token = data.token;
      this.$state.email = data.user.email;
      this.$state.nickname = data.user.nickname;
      this.$state.firstName = data.user.firstName;
      this.$state.lastName = data.user.lastName;
      this.$state.profilePicture = data.user.profilePicture;
      this.$state.groups = data.user.groups;
      this.$state.currentGroup = data.user.currentGroup;
      console.log('setUserDetails', this.$state)
    },
    async fetchUser() {
      const response = await fetch('http://localhost:3001/api/v1/users/' + this.$state.id)
      const data = await response.json()

      this.$state.id = data.user.id
      this.$state.firstName = data.user.first_name
      this.$state.lastName = data.user.last_name
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

