<template>
  <div class="min-h-screen flex flex-col-reverse md:flex-row justify-between items-center bg-gray-50 py-4 sm:py-8 px-4 sm:px-10"
    style="background-image: url('https://intranet.probusiness.pe/assets/tienda/fondo_auth.webp'); background-size: cover; background-position: center;">
    <button @click="navigateTo('/')" class="focus:outline-none">
      <svg width="177" height="52" viewBox="0 0 177 52" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="self-center md:self-end mt-4 md:mt-0">
        <g clip-path="url(#clip0_4690_7737)">
          <path d="M11.9702 12.5727C11.4585 11.9876 10.8494 11.5321 10.1412 11.203C9.43292 10.8755 8.64346 10.7109 7.7744 10.7109C6.79813 10.7109 5.92258 10.9337 5.14449 11.3775C4.3664 11.8214 3.74913 12.4846 3.29267 13.3673C3.13835 13.6665 3.01327 13.9973 2.90444 14.3414V11.085H0V28.5891H3.65816V22.2973C4.0805 22.919 4.59869 23.4027 5.22408 23.7335C5.97943 24.1308 6.82737 24.3303 7.7744 24.3303C8.72143 24.3303 9.50114 24.1624 10.2094 23.8266C10.9176 23.4908 11.5203 23.027 12.0157 22.4352C12.5112 21.8418 12.888 21.1453 13.1479 20.3407C13.4062 19.5378 13.5362 18.6751 13.5362 17.7542V17.2156C13.5362 16.2797 13.403 15.4186 13.1366 14.6307C12.8702 13.8427 12.4803 13.1562 11.9702 12.5711V12.5727ZM9.46703 19.4181C9.20712 19.98 8.84488 20.4172 8.3803 20.728C7.91572 21.0405 7.36992 21.1968 6.74615 21.1968C6.22797 21.1968 5.7244 21.0721 5.23708 20.8228C4.74976 20.5734 4.34853 20.2111 4.03665 19.734C3.72314 19.2586 3.56719 18.6851 3.56719 18.0135V17.1474C3.56719 16.4459 3.71664 15.8491 4.0139 15.3571C4.31117 14.8651 4.70428 14.4877 5.1916 14.2217C5.67892 13.9558 6.1971 13.8244 6.74615 13.8244C7.38617 13.8244 7.93522 13.9757 8.3933 14.2816C8.84976 14.5858 9.20875 15.0113 9.46865 15.5566C9.72693 16.1035 9.85689 16.7418 9.85689 17.4749C9.85689 18.208 9.72693 18.8546 9.46865 19.4165L9.46703 19.4181Z" fill="white" />
          <path d="M19.1274 12.4003C18.5573 13.1416 18.2048 14.1191 18.0651 15.3326V11.0903H15.1606V23.9134H18.8188V17.3855C18.8188 16.3399 19.0933 15.5404 19.6424 14.9868C20.1914 14.4333 20.9695 14.1557 21.975 14.1557H22.8896V10.9258H22.4087C20.976 10.9258 19.8812 11.4178 19.1274 12.4003Z" fill="white" />
        </g>
      </svg>
    </button>
    
    <UCard class="w-full max-w-md sm:max-w-lg md:max-w-md rounded-md shadow-lg p-6 sm:p-8 mx-4 sm:mx-0">
      <h2 class="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 border-b border-gray-200 pb-3 sm:pb-4">
        Recuperar contraseña
      </h2>
      
      <div v-if="!emailSent" class="space-y-4 sm:space-y-5">
        <div class="text-center text-gray-600 mb-4">
          Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
        </div>
        
        <form @submit.prevent="handleForgotPassword" class="space-y-4 sm:space-y-5">
          <div>
            <label class="block text-gray-600 mb-1" for="email">Correo electrónico</label>
            <UInput 
              id="email" 
              v-model="email" 
              type="email" 
              class="w-full"
              :class="{ 'border-red-500': emailError }"
              placeholder="correo@ejemplo.com" 
              @blur="validateEmail"
              @input="emailError = ''"
              required
            />
            <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
          </div>
          
          <button type="submit" :disabled="loading"
            class="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-orange-600 transition disabled:opacity-60">
            <span v-if="loading" class="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full"></span>
            Enviar instrucciones
          </button>
        </form>
        
        <div v-if="error" class="text-red-500 text-sm text-center mt-2">{{ error }}</div>
      </div>
      
      <div v-else class="text-center space-y-4">
        <div class="flex justify-center">
          <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-green-700">¡Instrucciones enviadas!</h3>
        <p class="text-gray-600">
          Si el correo existe, te hemos enviado instrucciones para restablecer tu contraseña.
          Revisa tu bandeja de entrada y también la carpeta de spam.
        </p>
        <button @click="goBackToLogin" 
          class="mt-4 text-orange-500 hover:text-orange-600 font-medium">
          Volver al inicio de sesión
        </button>
      </div>
      
      <div class="flex items-center my-4 sm:my-6">
        <div class="flex-grow h-px bg-gray-200"></div>
        <span class="mx-3 text-gray-400 text-sm">o</span>
        <div class="flex-grow h-px bg-gray-200"></div>
      </div>
      
      <div class="text-center">
        <NuxtLink to="/login" class="text-orange-500 font-semibold hover:underline py-2 px-4 block">
          Volver al inicio de sesión
        </NuxtLink>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

import { useAuth } from '@/composables/auth/useAuth'
import { useSpinner } from '@/composables/commons/useSpinner'

const { forgotPassword } = useAuth()
const { withSpinner } = useSpinner()

const email = ref('')
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const emailSent = ref(false)

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    emailError.value = 'El correo electrónico es requerido'
    return false
  }
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Ingresa un correo electrónico válido'
    return false
  }
  emailError.value = ''
  return true
}

const handleForgotPassword = async () => {
  if (!validateEmail()) return
  
  await withSpinner(async () => {
    try {
      loading.value = true
      error.value = ''
      
      const response = await forgotPassword({ email: email.value })
      
      if (response.success) {
        emailSent.value = true
      } else {
        error.value = response.error || 'Error al enviar las instrucciones'
      }
    } catch (err: any) {
      console.error('Error during forgot password:', err)
      error.value = err.data?.message || 'Error al enviar las instrucciones'
    } finally {
      loading.value = false
    }
  })
}

const goBackToLogin = () => {
  navigateTo('/login')
}

useHead({
  title: 'Recuperar Contraseña - Probusiness'
})
</script>
