<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="home">
    <header>
      <h1>Person Management</h1>
      <button @click="handleLogout">Logout</button>
    </header>
    <p>Welcome! You are logged in.</p>
  </div>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

header h1 {
  margin: 0;
  color: #333;
}

header button {
  padding: 0.4rem 1rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

header button:hover {
  background: #c0392b;
}
</style>
