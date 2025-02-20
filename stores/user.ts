export const useUserStore = defineStore('user', () => {
  const state = ref({})

  async function login(email: string, password: string) {
    // try {
    //   await login(email, password)
    // } catch (error) {
    //   console.log(error)
    // }
    const result = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    })
    const token = await result.json()
    console.log(token)
  }

  return {
    state,
    login,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
