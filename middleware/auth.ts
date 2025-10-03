import AuthService from '../services/authService'
import { useSession } from '../composables/auth/useSession'
export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === '/login') return

  const authService = AuthService.getInstance()
  const { hasValidToken } = useSession()
  
  if (!hasValidToken() || !authService.isAuthenticated()) {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_menu')
    //setItem return to login
    localStorage.setItem('return_to', to.path)
    return navigateTo('/login')
  }
  if (localStorage.getItem('return_to')) {
    const return_to = localStorage.getItem('return_to')
    localStorage.removeItem('return_to')
    return navigateTo(return_to)
  }

}) 