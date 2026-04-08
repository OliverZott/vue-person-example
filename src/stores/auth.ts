import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = 'https://localhost:7009'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('token'))
    const user = ref<{ userName: string; role: string } | null>(null)
    const error = ref<string | null>(null)
    const loading = ref(false)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email: string, password: string) {
        error.value = null
        loading.value = true
        try {
            const response = await axios.post(`${API_BASE}/Auth/login`, {
                email,
                password,
            })
            token.value = response.data.token
            user.value = response.data.user ?? { email, role: response.data.role ?? '' }
            localStorage.setItem('token', token.value!)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
        } catch (e: any) {
            error.value = e.response?.data?.message ?? e.response?.data ?? 'Login failed'
            token.value = null
            user.value = null
            localStorage.removeItem('token')
        } finally {
            loading.value = false
        }
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
    }

    // Restore token on load
    if (token.value) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
    }

    return { token, user, error, loading, isAuthenticated, login, logout }
})
