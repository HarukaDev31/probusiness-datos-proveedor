import AuthService from '../services/authService'
import { useSession } from '../composables/auth/useSession'
export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo(to.path)
}) 