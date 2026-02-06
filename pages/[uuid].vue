<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0"
      style="background-image: url('/assets/img/backgrounds/fondo_clientes.webp'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 opacity-40" style="background-color: black;"></div>
    </div>

    <!-- Theme Toggle Button - Disabled for this view -->


    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-3 pt-2 ">
      <div class="w-full max-w-6xl h-[800px]">
        <!-- Loading State with Skeleton -->
        <div v-if="loading">
          <!-- Header Skeleton -->
          <UCard class="shadow-2xl border-0 p-6">
            <div class="text-center py-4">
              <div class="h-8 w-3/4 mx-auto rounded bg-gray-200 animate-pulse mb-3"></div>
              <div class="h-5 w-1/2 mx-auto rounded bg-gray-200 animate-pulse"></div>
            </div>
          </UCard>

          <!-- Provider Cards Skeleton -->
          <div class="max-h-[600px] overflow-y-auto">
            <UCard v-for="n in 3" :key="n" class="shadow-lg border-0 p-4 md:p-6">
              <!-- Mobile Layout Skeleton -->
              <div class="block md:hidden space-y-4">
                <!-- Product Info Skeleton -->
                <div class="flex items-center gap-3 p-3 rounded-lg border">
                  <div class="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 w-16 rounded bg-gray-200 animate-pulse mb-2"></div>
                    <div class="h-8 w-full rounded bg-gray-200 animate-pulse"></div>
                  </div>
                </div>

                <!-- Supplier Code Skeleton -->
                <div class="flex items-center gap-3 p-3 rounded-lg border">
                  <div class="w-5 h-5 rounded bg-gray-200 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 w-24 rounded bg-gray-200 animate-pulse mb-2"></div>
                    <div class="h-8 w-full rounded bg-gray-200 animate-pulse"></div>
                  </div>
                </div>

                <!-- Input Fields Skeleton -->
                <div class="space-y-4">
                  <div>
                    <div class="h-4 w-32 rounded bg-gray-200 animate-pulse mb-2"></div>
                    <div class="h-10 w-full rounded bg-gray-200 animate-pulse"></div>
                  </div>
                  <div>
                    <div class="h-4 w-28 rounded bg-gray-200 animate-pulse mb-2"></div>
                    <div class="h-10 w-full rounded bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <!-- Desktop Layout Skeleton -->
              <div class="hidden md:block">
                <div class="grid grid-cols-6 gap-4 items-center">
                  <div v-for="col in 6" :key="col" class="flex flex-col justify-center">
                    <div class="h-4 w-12 rounded bg-gray-200 animate-pulse mb-1"></div>
                    <div class="h-6 w-full rounded bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Save Button Skeleton -->
          <UCard class="shadow-2xl border-0 p-6 flex items-center justify-center">
            <div class="h-12 w-48 rounded bg-gray-200 animate-pulse"></div>
          </UCard>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <UAlert icon="i-heroicons-exclamation-triangle" color="error" variant="soft" :title="error" />
        </div>

        <!-- Main Form - Responsive Cards View -->
        <div v-else-if="data">
          <!-- Main Card with Title and Provider Cards -->
          <UCard class="shadow-2xl border-0 p-2 mb-2">
            <!-- Title - Hides on mobile scroll -->
            <div class="text-center  transition-all duration-300" :class="[
              '',
              showTitle ? 'block' : 'hidden md:block',
              showTitle ? '' : 'mb-0 md:'
            ]">
              <h1 class="text-xl md:text-3xl font-bold">
                Hola, por favor llenar los datos de tu proveedor
              </h1>
            </div>

            <!-- Provider Cards Container -->
            <div class="overflow-y-auto transition-all duration-300"
              :class="showTitle ? 'max-h-[800px]' : 'h-[calc(100vh-100px)] max-h-none'" @scroll="handleScroll"
              style="transition: max-height 0.3s ease-in-out;">
              <UCard v-for="(proveedor, index) in data.proveedores" :key="proveedor.id"
                class="shadow-lg border-0 p-2 md:p-6" :aria-label="`Proveedor ${index + 1}: ${proveedor.products}`"
                role="article" tabindex="0">
                <!-- Mobile Layout (Stacked) -->
                <div class="block md:hidden space-y-4">
                  <!-- Product Info -->
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                      <div class="flex-1 w-full">
                        <div class="text-sm font-medium text-gray-700">Producto</div>
                        <UButton variant="soft" color="neutral" size="sm"
                          class="justify-start text-xs mt-1 w-full text-left whitespace-normal break-words" disabled>
                          <span class="w-full text-left whitespace-normal break-words leading-snug">
                            {{ proveedor.products }}
                          </span>
                        </UButton>
                      </div>
                    </div>

                    <!-- Supplier Code -->
                    <div class="flex items-center gap-3 p-3 rounded-lg border">
                      <div class="flex-1">
                        <div class="text-sm font-medium text-gray-700">Código Proveedor</div>
                        <UButton variant="soft" color="neutral" size="sm"
                          class="justify-start text-xs mt-1 w-full text-left whitespace-normal break-words" disabled>
                          <span class="w-full text-left whitespace-normal break-words leading-snug">
                            {{ proveedor.code_supplier }}
                          </span>
                        </UButton>
                      </div>
                    </div>
                  </div>
                  <!-- Input Fields -->
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del vendedor
                      </label>
                      <UInput v-model="proveedor.supplier" placeholder="Ingresa nombre del vendedor" size="md" :class="[
                        'text-base w-full',
                        validationErrors[`vendor_${proveedor.id}`] ? 'border-red-500 focus:border-red-500' : ''
                      ]" :aria-label="`Nombre del vendedor para ${proveedor.products}`"
                        @input="handleVendorInput(proveedor, $event.target.value)" />
                      <small v-if="validationErrors[`vendor_${proveedor.id}`]" class="text-red-500 text-xs mt-1 block">
                        Este campo es requerido
                      </small>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Número celular o WeeChat
                      </label>
                      <div
                        class="relative flex items-center rounded-lg border bg-white dark:bg-gray-900 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500"
                        :class="[validationErrors[`phone_${proveedor.id}`] ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-gray-200 dark:border-gray-700']">

                        <UInput v-model="proveedor.supplier_phone" v-maska="chinaPhoneMask"
                          placeholder="(86) 138 1234 5678" size="md" type="text" :class="[
                            'text-base w-full min-w-0 border-0 rounded-none bg-transparent focus:ring-0 placeholder:text-gray-400',
                            validationErrors[`phone_${proveedor.id}`] ? '!border-red-500' : ''
                          ]" :aria-label="`Número celular para ${proveedor.products}`"
                          @input="handlePhoneInput(proveedor, $event.target.value)" @keypress="onPhoneKeypress">
                          <template #leading>
                            <svg width="18px" height="18px" viewBox="0 0 0.81 0.81" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                              class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
                              <path fill="#DE2910"
                                d="M0.81 0.608a0.09 0.09 0 0 1 -0.09 0.09H0.09A0.09 0.09 0 0 1 0 0.608V0.202a0.09 0.09 0 0 1 0.09 -0.09H0.72a0.09 0.09 0 0 1 0.09 0.09z" />
                              <path fill="#FFDE02"
                                d="m0.251 0.202 0.017 0.008 0.013 -0.013 -0.002 0.018 0.016 0.009 -0.018 0.003 -0.003 0.018 -0.009 -0.016 -0.018 0.002 0.013 -0.013zm0.105 0.066 -0.008 0.017 0.013 0.013 -0.018 -0.003 -0.009 0.016 -0.003 -0.018 -0.018 -0.003 0.016 -0.009 -0.003 -0.018 0.013 0.013zm-0.022 0.085 0.006 0.017 0.018 0 -0.015 0.011 0.005 0.018 -0.015 -0.011 -0.015 0.011 0.005 -0.018 -0.015 -0.011 0.018 0zm-0.083 0.074 0.017 0.008 0.013 -0.013 -0.002 0.018 0.016 0.009 -0.018 0.003 -0.003 0.018 -0.009 -0.016 -0.018 0.002 0.013 -0.013zm-0.093 -0.181 0.021 0.06 0.064 0.001 -0.051 0.038 0.018 0.061 -0.052 -0.036 -0.052 0.036 0.018 -0.061 -0.051 -0.038 0.064 -0.001z" />
                            </svg>
                          </template>
                        </UInput>
                      </div>
                      <small v-if="validationErrors[`phone_${proveedor.id}`]" class="text-red-500 text-xs mt-1 block">
                        Este campo es requerido
                      </small>
                    </div>
                  </div>
                </div>

                <!-- Desktop Layout (Grid) -->
                <div class="hidden md:block">
                  <div class="grid grid-cols-4 gap-4 items-center">


                    <!-- Productos Column -->
                    <div class="flex flex-col justify-center">
                      <div class="text-sm font-medium  mb-1">Productos</div>
                      <UButton :label="proveedor.products" variant="soft" color="neutral" size="sm"
                        class="justify-start text-xs" disabled />
                    </div>

                    <!-- Codigo proveedor Column -->
                    <div class="flex flex-col justify-center">
                      <div class="text-sm font-medium  mb-1">Código</div>
                      <UButton :label="proveedor.code_supplier" variant="soft" color="neutral" size="sm"
                        class="justify-start text-xs" disabled />
                    </div>

                    <!-- Nombre del vendedor Column -->
                    <div class="flex flex-col justify-center">
                      <div class="text-sm font-medium  mb-1">Vendedor</div>
                      <UInput v-model="proveedor.supplier" placeholder="Nombre del vendedor" size="sm" :class="[
                        'text-sm',
                        validationErrors[`vendor_${proveedor.id}`] ? 'border-red-500 focus:border-red-500' : ''
                      ]" @input="handleVendorInput(proveedor, $event.target.value)" />
                      <small v-if="validationErrors[`vendor_${proveedor.id}`]" class="text-red-500 text-xs mt-1">
                        El nombre del vendedor es requerido
                      </small>
                    </div>

                    <!-- Numero celular Column -->
                    <div class="flex flex-col justify-center">
                      <div class="text-sm font-medium  mb-1">Celular</div>
                      <div
                        class="relative flex items-center rounded-md border bg-white dark:bg-gray-900 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500"
                        :class="[validationErrors[`phone_${proveedor.id}`] ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500' : 'border-gray-200 dark:border-gray-700']">

                        <UInput v-model="proveedor.supplier_phone" v-maska="chinaPhoneMask"
                          placeholder="(86) 138 1234 5678" size="sm" type="tel" :class="[
                            'text-sm w-full min-w-0 border-0 rounded-none bg-transparent focus:ring-0 placeholder:text-gray-400',
                            validationErrors[`phone_${proveedor.id}`] ? '!border-red-500' : ''
                          ]" @input="handlePhoneInput(proveedor, $event.target.value)" @keypress="onPhoneKeypress">
                          <template #leading>
                            <svg width="18px" height="18px" viewBox="0 0 0.81 0.81" xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                              class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
                              <path fill="#DE2910"
                                d="M0.81 0.608a0.09 0.09 0 0 1 -0.09 0.09H0.09A0.09 0.09 0 0 1 0 0.608V0.202a0.09 0.09 0 0 1 0.09 -0.09H0.72a0.09 0.09 0 0 1 0.09 0.09z" />
                              <path fill="#FFDE02"
                                d="m0.251 0.202 0.017 0.008 0.013 -0.013 -0.002 0.018 0.016 0.009 -0.018 0.003 -0.003 0.018 -0.009 -0.016 -0.018 0.002 0.013 -0.013zm0.105 0.066 -0.008 0.017 0.013 0.013 -0.018 -0.003 -0.009 0.016 -0.003 -0.018 -0.018 -0.003 0.016 -0.009 -0.003 -0.018 0.013 0.013zm-0.022 0.085 0.006 0.017 0.018 0 -0.015 0.011 0.005 0.018 -0.015 -0.011 -0.015 0.011 0.005 -0.018 -0.015 -0.011 0.018 0zm-0.083 0.074 0.017 0.008 0.013 -0.013 -0.002 0.018 0.016 0.009 -0.018 0.003 -0.003 0.018 -0.009 -0.016 -0.018 0.002 0.013 -0.013zm-0.093 -0.181 0.021 0.06 0.064 0.001 -0.051 0.038 0.018 0.061 -0.052 -0.036 -0.052 0.036 0.018 -0.061 -0.051 -0.038 0.064 -0.001z" />
                            </svg>
                          </template>
                        </UInput>
                      </div>
                      <small v-if="validationErrors[`phone_${proveedor.id}`]" class="text-red-500 text-xs mt-1">
                        Este campo es requerido (mín. 8 dígitos)
                      </small>
                    </div>
                  </div>
                </div>
              </UCard>
            </div>
          </UCard>

          <!-- Save Button - Sticky on mobile -->
          <div
            class="md:mt-6 flex justify-center md:relative fixed bottom-0 left-0 right-0 p-4 md:p-0 bg-white md:bg-transparent shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none z-50">
            <UButton color="primary" size="xl" @click="guardarDatos" :loading="saving"
              class="text-lg font-semibold py-4 w-full md:w-auto flex items-center justify-center shadow-lg"
              :aria-label="`Guardar datos de ${data.proveedores.length} proveedores`">
              <UIcon name="i-heroicons-check" class="w-5 h-5 mr-2 flex items-center justify-center" />
              Guardar Datos
            </UButton>
          </div>

        </div>

        <!-- No Data State -->
        <UCard class="shadow-2xl border-0 p-8" v-else-if="!loading && !data">
          <div class="text-center py-12">
            <!-- Large Icon -->
            <div class="mb-6">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-24 h-24 mx-auto text-gray-400 animate-bounce" />
            </div>

            <!-- Main Message -->
            <h2 class="text-2xl font-bold text-gray-700 mb-3">
              No encontrado
            </h2>

            <!-- Subtitle -->
            <p class=" mb-6">
              No se pudo encontrar la información solicitada
            </p>


          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCotizacion } from '~/composables/external/useCotizacion'
import { useSpinner } from '~/composables/commons/useSpinner'
import { useModal } from '~/composables/commons/useModal';
const { withSpinner } = useSpinner();
const { showSuccess, showError } = useModal();

// Reactive data
const saving = ref(false)
const toast = useToast()
const validationErrors = ref<Record<string, boolean>>({})

// Get UUID from URL
const route = useRoute()
const uuid = route.params.uuid as string

// Use composable
const { getCotizacionByUUID, updateProveedores, data, loading, error } = useCotizacion()

// Dark mode - Force light mode for this view
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Force light mode on mount and save previous preference
const previousColorPreference = ref<string>('')

const toggleDarkMode = () => {
  // Toggle is disabled in this view, but we keep the function for the button
  colorMode.preference = 'light'
}

// Title visibility for mobile scroll
const showTitle = ref(true)

// Handle scroll on cards container
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  const scrollTop = target.scrollTop
  const scrollThreshold = 50 // Show/hide title after scrolling 50px

  // Only hide on mobile
  if (window.innerWidth < 768) {
    showTitle.value = scrollTop < scrollThreshold
  }
}

// Comprehensive country codes and flags
const countryCodes = {
  '1': { name: 'USA/Canadá', flag: '🇺🇸', mask: '+1 (###) ###-####' },
  '7': { name: 'Rusia/Kazajistán', flag: '🇷🇺', mask: '+7 (###) ###-##-##' },
  '20': { name: 'Egipto', flag: '🇪🇬', mask: '+20 ## #### ####' },
  '27': { name: 'Sudáfrica', flag: '🇿🇦', mask: '+27 ## ### ####' },
  '30': { name: 'Grecia', flag: '🇬🇷', mask: '+30 ### ### ####' },
  '31': { name: 'Países Bajos', flag: '🇳🇱', mask: '+31 ## ### ####' },
  '32': { name: 'Bélgica', flag: '🇧🇪', mask: '+32 ## ### ## ##' },
  '33': { name: 'Francia', flag: '🇫🇷', mask: '+33 # ## ## ## ##' },
  '34': { name: 'España', flag: '🇪🇸', mask: '+34 ### ## ## ##' },
  '36': { name: 'Hungría', flag: '🇭🇺', mask: '+36 ## ### ####' },
  '39': { name: 'Italia', flag: '🇮🇹', mask: '+39 ### ### ####' },
  '40': { name: 'Rumania', flag: '🇷🇴', mask: '+40 ## ### ####' },
  '41': { name: 'Suiza', flag: '🇨🇭', mask: '+41 ## ### ## ##' },
  '43': { name: 'Austria', flag: '🇦🇹', mask: '+43 ### ### ####' },
  '44': { name: 'Reino Unido', flag: '🇬🇧', mask: '+44 #### ### ###' },
  '45': { name: 'Dinamarca', flag: '🇩🇰', mask: '+45 ## ## ## ##' },
  '46': { name: 'Suecia', flag: '🇸🇪', mask: '+46 ## ### ## ##' },
  '47': { name: 'Noruega', flag: '🇳🇴', mask: '+47 ### ## ###' },
  '48': { name: 'Polonia', flag: '🇵🇱', mask: '+48 ### ### ###' },
  '49': { name: 'Alemania', flag: '🇩🇪', mask: '+49 ### ########' },
  '51': { name: 'Perú', flag: '🇵🇪', mask: '+51 ### ### ###' },
  '52': { name: 'México', flag: '🇲🇽', mask: '+52 ### ### ####' },
  '53': { name: 'Cuba', flag: '🇨🇺', mask: '+53 # #### ####' },
  '54': { name: 'Argentina', flag: '🇦🇷', mask: '+54 ### ###-####' },
  '55': { name: 'Brasil', flag: '🇧🇷', mask: '+55 ## #####-####' },
  '56': { name: 'Chile', flag: '🇨🇱', mask: '+56 # #### ####' },
  '57': { name: 'Colombia', flag: '🇨🇴', mask: '+57 ### ### ####' },
  '58': { name: 'Venezuela', flag: '🇻🇪', mask: '+58 ###-#######' },
  '60': { name: 'Malasia', flag: '🇲🇾', mask: '+60 ##-### ####' },
  '61': { name: 'Australia', flag: '🇦🇺', mask: '+61 ### ### ###' },
  '62': { name: 'Indonesia', flag: '🇮🇩', mask: '+62 ###-###-####' },
  '63': { name: 'Filipinas', flag: '🇵🇭', mask: '+63 ### ### ####' },
  '64': { name: 'Nueva Zelanda', flag: '🇳🇿', mask: '+64 ## ### ####' },
  '65': { name: 'Singapur', flag: '🇸🇬', mask: '+65 #### ####' },
  '66': { name: 'Tailandia', flag: '🇹🇭', mask: '+66 ## ### ####' },
  '81': { name: 'Japón', flag: '🇯🇵', mask: '+81 ##-####-####' },
  '82': { name: 'Corea del Sur', flag: '🇰🇷', mask: '+82 ##-####-####' },
  '84': { name: 'Vietnam', flag: '🇻🇳', mask: '+84 ## #### ####' },
  '86': { name: 'China', flag: '🇨🇳', mask: '+86 ### #### ####' },
  '90': { name: 'Turquía', flag: '🇹🇷', mask: '+90 ### ### ####' },
  '91': { name: 'India', flag: '🇮🇳', mask: '+91 ##### #####' },
  '92': { name: 'Pakistán', flag: '🇵🇰', mask: '+92 ### #######' },
  '93': { name: 'Afganistán', flag: '🇦🇫', mask: '+93 ## ### ####' },
  '94': { name: 'Sri Lanka', flag: '🇱🇰', mask: '+94 ## ### ####' },
  '95': { name: 'Myanmar', flag: '🇲🇲', mask: '+95 ## ### ####' },
  '98': { name: 'Irán', flag: '🇮🇷', mask: '+98 ### ### ####' },
  '212': { name: 'Marruecos', flag: '🇲🇦', mask: '+212 ###-#######' },
  '213': { name: 'Argelia', flag: '🇩🇿', mask: '+213 ### ### ###' },
  '216': { name: 'Túnez', flag: '🇹🇳', mask: '+216 ## ### ###' },
  '218': { name: 'Libia', flag: '🇱🇾', mask: '+218 ##-###-####' },
  '220': { name: 'Gambia', flag: '🇬🇲', mask: '+220 ### ####' },
  '221': { name: 'Senegal', flag: '🇸🇳', mask: '+221 ## ### ## ##' },
  '222': { name: 'Mauritania', flag: '🇲🇷', mask: '+222 ## ## ## ##' },
  '223': { name: 'Malí', flag: '🇲🇱', mask: '+223 ## ## ## ##' },
  '224': { name: 'Guinea', flag: '🇬🇳', mask: '+224 ### ## ## ##' },
  '225': { name: 'Costa de Marfil', flag: '🇨🇮', mask: '+225 ## ## ## ##' },
  '226': { name: 'Burkina Faso', flag: '🇧🇫', mask: '+226 ## ## ## ##' },
  '227': { name: 'Níger', flag: '🇳🇪', mask: '+227 ## ## ## ##' },
  '228': { name: 'Togo', flag: '🇹🇬', mask: '+228 ## ## ## ##' },
  '229': { name: 'Benín', flag: '🇧🇯', mask: '+229 ## ## ## ##' },
  '230': { name: 'Mauricio', flag: '🇲🇺', mask: '+230 #### ####' },
  '231': { name: 'Liberia', flag: '🇱🇷', mask: '+231 ## ### ####' },
  '232': { name: 'Sierra Leona', flag: '🇸🇱', mask: '+232 ## ######' },
  '233': { name: 'Ghana', flag: '🇬🇭', mask: '+233 ## ### ####' },
  '234': { name: 'Nigeria', flag: '🇳🇬', mask: '+234 ### ### ####' },
  '235': { name: 'Chad', flag: '🇹🇩', mask: '+235 ## ## ## ##' },
  '236': { name: 'República Centroafricana', flag: '🇨🇫', mask: '+236 ## ## ## ##' },
  '237': { name: 'Camerún', flag: '🇨🇲', mask: '+237 #### ####' },
  '238': { name: 'Cabo Verde', flag: '🇨🇻', mask: '+238 ### ####' },
  '239': { name: 'Santo Tomé y Príncipe', flag: '🇸🇹', mask: '+239 ## #####' },
  '240': { name: 'Guinea Ecuatorial', flag: '🇬🇶', mask: '+240 ### ### ###' },
  '241': { name: 'Gabón', flag: '🇬🇦', mask: '+241 ## ## ## ##' },
  '242': { name: 'República del Congo', flag: '🇨🇬', mask: '+242 ## ### ####' },
  '243': { name: 'República Democrática del Congo', flag: '🇨🇩', mask: '+243 ### ### ###' },
  '244': { name: 'Angola', flag: '🇦🇴', mask: '+244 ### ### ###' },
  '245': { name: 'Guinea-Bisáu', flag: '🇬🇼', mask: '+245 ### ####' },
  '246': { name: 'Diego García', flag: '🇮🇴', mask: '+246 ### ####' },
  '248': { name: 'Seychelles', flag: '🇸🇨', mask: '+248 # ### ###' },
  '249': { name: 'Sudán', flag: '🇸🇩', mask: '+249 ## ### ####' },
  '250': { name: 'Ruanda', flag: '🇷🇼', mask: '+250 ### ### ###' },
  '251': { name: 'Etiopía', flag: '🇪🇹', mask: '+251 ## ### ####' },
  '252': { name: 'Somalia', flag: '🇸🇴', mask: '+252 ## ### ####' },
  '253': { name: 'Yibuti', flag: '🇩🇯', mask: '+253 ## ## ## ##' },
  '254': { name: 'Kenia', flag: '🇰🇪', mask: '+254 ### ######' },
  '255': { name: 'Tanzania', flag: '🇹🇿', mask: '+255 ## ### ####' },
  '256': { name: 'Uganda', flag: '🇺🇬', mask: '+256 ### ######' },
  '257': { name: 'Burundi', flag: '🇧🇮', mask: '+257 ## ## ####' },
  '258': { name: 'Mozambique', flag: '🇲🇿', mask: '+258 ## ### ####' },
  '260': { name: 'Zambia', flag: '🇿🇲', mask: '+260 ## ### ####' },
  '261': { name: 'Madagascar', flag: '🇲🇬', mask: '+261 ## ## #####' },
  '262': { name: 'Reunión', flag: '🇷🇪', mask: '+262 ## ## ## ##' },
  '263': { name: 'Zimbabue', flag: '🇿🇼', mask: '+263 ## ### ####' },
  '264': { name: 'Namibia', flag: '🇳🇦', mask: '+264 ## ### ####' },
  '265': { name: 'Malaui', flag: '🇲🇼', mask: '+265 ## #### ####' },
  '266': { name: 'Lesoto', flag: '🇱🇸', mask: '+266 ## ### ####' },
  '267': { name: 'Botsuana', flag: '🇧🇼', mask: '+267 ## ### ###' },
  '268': { name: 'Suazilandia', flag: '🇸🇿', mask: '+268 ## ## ####' },
  '269': { name: 'Comoras', flag: '🇰🇲', mask: '+269 ## #####' },
  '290': { name: 'Santa Elena', flag: '🇸🇭', mask: '+290 ####' },
  '291': { name: 'Eritrea', flag: '🇪🇷', mask: '+291 # ### ###' },
  '297': { name: 'Aruba', flag: '🇦🇼', mask: '+297 ### ####' },
  '298': { name: 'Islas Feroe', flag: '🇫🇴', mask: '+298 ### ###' },
  '299': { name: 'Groenlandia', flag: '🇬🇱', mask: '+299 ## ## ##' },
  '350': { name: 'Gibraltar', flag: '🇬🇮', mask: '+350 ### #####' },
  '351': { name: 'Portugal', flag: '🇵🇹', mask: '+351 ### ### ###' },
  '352': { name: 'Luxemburgo', flag: '🇱🇺', mask: '+352 #### ####' },
  '353': { name: 'Irlanda', flag: '🇮🇪', mask: '+353 ## ### ####' },
  '354': { name: 'Islandia', flag: '🇮🇸', mask: '+354 ### ####' },
  '355': { name: 'Albania', flag: '🇦🇱', mask: '+355 ## ### ####' },
  '356': { name: 'Malta', flag: '🇲🇹', mask: '+356 #### ####' },
  '357': { name: 'Chipre', flag: '🇨🇾', mask: '+357 ## ######' },
  '358': { name: 'Finlandia', flag: '🇫🇮', mask: '+358 ## ### ####' },
  '359': { name: 'Bulgaria', flag: '🇧🇬', mask: '+359 ## ### ####' },
  '370': { name: 'Lituania', flag: '🇱🇹', mask: '+370 ### #####' },
  '371': { name: 'Letonia', flag: '🇱🇻', mask: '+371 #### ####' },
  '372': { name: 'Estonia', flag: '🇪🇪', mask: '+372 #### ####' },
  '373': { name: 'Moldavia', flag: '🇲🇩', mask: '+373 #### ####' },
  '374': { name: 'Armenia', flag: '🇦🇲', mask: '+374 ## ######' },
  '375': { name: 'Bielorrusia', flag: '🇧🇾', mask: '+375 ## ### ## ##' },
  '376': { name: 'Andorra', flag: '🇦🇩', mask: '+376 ### ###' },
  '377': { name: 'Mónaco', flag: '🇲🇨', mask: '+377 ## ### ###' },
  '378': { name: 'San Marino', flag: '🇸🇲', mask: '+378 #### ######' },
  '380': { name: 'Ucrania', flag: '🇺🇦', mask: '+380 ## ### ## ##' },
  '381': { name: 'Serbia', flag: '🇷🇸', mask: '+381 ## ### ####' },
  '382': { name: 'Montenegro', flag: '🇲🇪', mask: '+382 ## ### ###' },
  '383': { name: 'Kosovo', flag: '🇽🇰', mask: '+383 ## ### ###' },
  '385': { name: 'Croacia', flag: '🇭🇷', mask: '+385 ## ### ####' },
  '386': { name: 'Eslovenia', flag: '🇸🇮', mask: '+386 ## ### ###' },
  '387': { name: 'Bosnia y Herzegovina', flag: '🇧🇦', mask: '+387 ## ### ###' },
  '389': { name: 'Macedonia del Norte', flag: '🇲🇰', mask: '+389 ## ### ###' },
  '420': { name: 'República Checa', flag: '🇨🇿', mask: '+420 ### ### ###' },
  '421': { name: 'Eslovaquia', flag: '🇸🇰', mask: '+421 ### ### ###' },
  '423': { name: 'Liechtenstein', flag: '🇱🇮', mask: '+423 ### ### ###' },
  '500': { name: 'Islas Malvinas', flag: '🇫🇰', mask: '+500 #####' },
  '501': { name: 'Belice', flag: '🇧🇿', mask: '+501 ### ####' },
  '502': { name: 'Guatemala', flag: '🇬🇹', mask: '+502 #### ####' },
  '503': { name: 'El Salvador', flag: '🇸🇻', mask: '+503 #### ####' },
  '504': { name: 'Honduras', flag: '🇭🇳', mask: '+504 ####-####' },
  '505': { name: 'Nicaragua', flag: '🇳🇮', mask: '+505 #### ####' },
  '506': { name: 'Costa Rica', flag: '🇨🇷', mask: '+506 #### ####' },
  '507': { name: 'Panamá', flag: '🇵🇦', mask: '+507 ####-####' },
  '508': { name: 'San Pedro y Miquelón', flag: '🇵🇲', mask: '+508 ## ## ##' },
  '509': { name: 'Haití', flag: '🇭🇹', mask: '+509 ####-####' },
  '590': { name: 'Guadalupe', flag: '🇬🇵', mask: '+590 ### ## ## ##' },
  '591': { name: 'Bolivia', flag: '🇧🇴', mask: '+591 # #### ####' },
  '592': { name: 'Guyana', flag: '🇬🇾', mask: '+592 ### ####' },
  '593': { name: 'Ecuador', flag: '🇪🇨', mask: '+593 ## ### ####' },
  '594': { name: 'Guayana Francesa', flag: '🇬🇫', mask: '+594 ### ## ## ##' },
  '595': { name: 'Paraguay', flag: '🇵🇾', mask: '+595 ## ### ####' },
  '596': { name: 'Martinica', flag: '🇲🇶', mask: '+596 ### ## ## ##' },
  '597': { name: 'Surinam', flag: '🇸🇷', mask: '+597 ###-####' },
  '598': { name: 'Uruguay', flag: '🇺🇾', mask: '+598 # ### ####' },
  '599': { name: 'Antillas Neerlandesas', flag: '🇧🇶', mask: '+599 ### ####' },
  '670': { name: 'Timor Oriental', flag: '🇹🇱', mask: '+670 ### ####' },
  '672': { name: 'Isla Norfolk', flag: '🇳🇫', mask: '+672 ### ###' },
  '673': { name: 'Brunei', flag: '🇧🇳', mask: '+673 ### ####' },
  '674': { name: 'Nauru', flag: '🇳🇷', mask: '+674 ### ####' },
  '675': { name: 'Papúa Nueva Guinea', flag: '🇵🇬', mask: '+675 ### ####' },
  '676': { name: 'Tonga', flag: '🇹🇴', mask: '+676 #####' },
  '677': { name: 'Islas Salomón', flag: '🇸🇧', mask: '+677 #####' },
  '678': { name: 'Vanuatu', flag: '🇻🇺', mask: '+678 #####' },
  '679': { name: 'Fiyi', flag: '🇫🇯', mask: '+679 ### ####' },
  '680': { name: 'Palaos', flag: '🇵🇼', mask: '+680 ### ####' },
  '681': { name: 'Wallis y Futuna', flag: '🇼🇫', mask: '+681 ## ## ##' },
  '682': { name: 'Islas Cook', flag: '🇨🇰', mask: '+682 ## ###' },
  '683': { name: 'Niue', flag: '🇳🇺', mask: '+683 ####' },
  '684': { name: 'Samoa Americana', flag: '🇦🇸', mask: '+684 ### ####' },
  '685': { name: 'Samoa', flag: '🇼🇸', mask: '+685 ## ###' },
  '686': { name: 'Kiribati', flag: '🇰🇮', mask: '+686 ######' },
  '687': { name: 'Nueva Caledonia', flag: '🇳🇨', mask: '+687 ## ## ##' },
  '688': { name: 'Tuvalu', flag: '🇹🇻', mask: '+688 #####' },
  '689': { name: 'Polinesia Francesa', flag: '🇵🇫', mask: '+689 ## ## ##' },
  '690': { name: 'Tokelau', flag: '🇹🇰', mask: '+690 ####' },
  '691': { name: 'Micronesia', flag: '🇫🇲', mask: '+691 ### ####' },
  '692': { name: 'Islas Marshall', flag: '🇲🇭', mask: '+692 ### ####' },
  '850': { name: 'Corea del Norte', flag: '🇰🇵', mask: '+850 ### ### ####' },
  '852': { name: 'Hong Kong', flag: '🇭🇰', mask: '+852 #### ####' },
  '853': { name: 'Macao', flag: '🇲🇴', mask: '+853 #### ####' },
  '855': { name: 'Camboya', flag: '🇰🇭', mask: '+855 ## ### ###' },
  '856': { name: 'Laos', flag: '🇱🇦', mask: '+856 ## ### ###' },
  '880': { name: 'Bangladesh', flag: '🇧🇩', mask: '+880 ####-######' },
  '886': { name: 'Taiwán', flag: '🇹🇼', mask: '+886 ### ### ###' },
  '960': { name: 'Maldivas', flag: '🇲🇻', mask: '+960 ### ####' },
  '961': { name: 'Líbano', flag: '🇱🇧', mask: '+961 ## ### ###' },
  '962': { name: 'Jordania', flag: '🇯🇴', mask: '+962 # #### ####' },
  '963': { name: 'Siria', flag: '🇸🇾', mask: '+963 ## #### ####' },
  '964': { name: 'Irak', flag: '🇮🇶', mask: '+964 ### ### ####' },
  '965': { name: 'Kuwait', flag: '🇰🇼', mask: '+965 #### ####' },
  '966': { name: 'Arabia Saudí', flag: '🇸🇦', mask: '+966 ## ### ####' },
  '967': { name: 'Yemen', flag: '🇾🇪', mask: '+967 ### ### ###' },
  '968': { name: 'Omán', flag: '🇴🇲', mask: '+968 #### ####' },
  '970': { name: 'Palestina', flag: '🇵🇸', mask: '+970 ## ### ####' },
  '971': { name: 'Emiratos Árabes Unidos', flag: '🇦🇪', mask: '+971 ## ### ####' },
  '972': { name: 'Israel', flag: '🇮🇱', mask: '+972 ##-###-####' },
  '973': { name: 'Baréin', flag: '🇧🇭', mask: '+973 #### ####' },
  '974': { name: 'Catar', flag: '🇶🇦', mask: '+974 #### ####' },
  '975': { name: 'Bután', flag: '🇧🇹', mask: '+975 ## ### ###' },
  '976': { name: 'Mongolia', flag: '🇲🇳', mask: '+976 ## ## ####' },
  '977': { name: 'Nepal', flag: '🇳🇵', mask: '+977 ##-###-####' },
  '992': { name: 'Tayikistán', flag: '🇹🇯', mask: '+992 ## ### ####' },
  '993': { name: 'Turkmenistán', flag: '🇹🇲', mask: '+993 ## ######' },
  '994': { name: 'Azerbaiyán', flag: '🇦🇿', mask: '+994 ## ### ####' },
  '995': { name: 'Georgia', flag: '🇬🇪', mask: '+995 ### ### ###' },
  '996': { name: 'Kirguistán', flag: '🇰🇬', mask: '+996 ### ### ###' },
  '998': { name: 'Uzbekistán', flag: '🇺🇿', mask: '+998 ## ### ####' }
}

const getCountryInfo = (value: string) => {
  const digits = value.replace(/\D/g, '')

  // Try to match country codes from longest to shortest
  const sortedCodes = Object.keys(countryCodes).sort((a, b) => b.length - a.length)

  for (const code of sortedCodes) {
    if (digits.startsWith(code)) {
      return {
        code: `+${code}`,
        name: countryCodes[code].name,
        flag: countryCodes[code].flag,
        mask: countryCodes[code].mask
      }
    }
  }

  // Default for unknown countries
  return {
    code: '',
    name: 'Internacional',
    flag: '🌍',
    mask: '+### ### ### ###'
  }
}

const getPhoneMask = (value: string) => {
  return getCountryInfo(value).mask
}

// China: (86) al inicio del UInput vía máscara; 13 huecos para poder escribir 86 + número; al enviar se corta el 86
const chinaPhoneMask = '(86) ### ### #### ###'

const normalizePhoneToNational = (value: string) => {
  const digits = (value || '').trim().replace(/\D/g, '')
  if (digits.startsWith('86')) return digits.slice(2)
  return digits
}

const handlePhoneInput = (proveedor: any, value: string) => {
  const cleaned = (value || '').trim().replace(/\D/g, '')
  if (cleaned.startsWith('86')) {
    proveedor.supplier_phone = `(86) ${cleaned.slice(2)}`
  } else if (cleaned.startsWith('+86')) {
    proveedor.supplier_phone = `(86) ${cleaned.slice(3)}`
  } else {
    proveedor.supplier_phone = `(86) ${cleaned}`
  }
  // Solo quitar error si tiene 8+ dígitos; si tiene 1–7 dígitos mostrar error
  const digits = (proveedor.supplier_phone || '').trim().replace(/\D/g, '')
  validationErrors.value = {
    ...validationErrors.value,
    [`phone_${proveedor.id}`]: digits.length >= 8 ? false : digits.length > 0
  }
}

const handleVendorInput = (proveedor: any, value: string) => {
  // Clear validation errors when user starts typing
  if (value.trim() !== '') {
    validationErrors.value[`vendor_${proveedor.id}`] = false
  }
}

const onPhoneKeypress = (event: KeyboardEvent) => {
  // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down all
  if ([8, 9, 27, 13, 46, 35, 36, 37, 38, 39, 40].includes(event.keyCode) ||
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    (event.ctrlKey === true && [65, 67, 86, 88].includes(event.keyCode)) ||
    // Allow: + at the beginning
    (event.keyCode === 43 && (event.target as HTMLInputElement).value.length === 0) ||
    // Allow: digits
    (event.keyCode >= 48 && event.keyCode <= 57)) {
    return
  }
  // Block everything else
  event.preventDefault()
}

// Al enviar al backend: cortar el 86 inicial si lo escribieron
const getPhoneBackendValue = (value: string) => {
  const digits = (value || '').trim().replace(/\D/g, '')
  if (digits.startsWith('86')) return digits.slice(2)
  return digits
}

const validateForm = () => {
  if (!data.value?.proveedores) return false

  const errors: Record<string, boolean> = {}
  let hasValidData = false
  let hasIncompleteProvider = false

  data.value.proveedores.forEach((proveedor: any) => {
    const hasVendor = proveedor.supplier && proveedor.supplier.trim() !== ''
    const phoneDigits = (proveedor.supplier_phone || '').trim().replace(/\D/g, '')
    const hasRealPhone = phoneDigits.length >= 8
    const hasIncompletePhone = phoneDigits.length > 0 && phoneDigits.length < 8

    if (hasVendor || hasRealPhone || hasIncompletePhone) {
      hasValidData = true

      if (hasVendor && !hasRealPhone) {
        errors[`phone_${proveedor.id}`] = true
        errors[`vendor_${proveedor.id}`] = false
        hasIncompleteProvider = true
      } else if (!hasVendor && hasRealPhone) {
        errors[`vendor_${proveedor.id}`] = true
        errors[`phone_${proveedor.id}`] = false
        hasIncompleteProvider = true
      } else if (hasIncompletePhone) {
        errors[`phone_${proveedor.id}`] = true
        errors[`vendor_${proveedor.id}`] = !hasVendor
        hasIncompleteProvider = true
      } else if (hasVendor && hasRealPhone) {
        errors[`vendor_${proveedor.id}`] = false
        errors[`phone_${proveedor.id}`] = false
      } else {
        errors[`vendor_${proveedor.id}`] = false
        errors[`phone_${proveedor.id}`] = false
      }
    } else {
      errors[`vendor_${proveedor.id}`] = false
      errors[`phone_${proveedor.id}`] = false
    }
  })

  validationErrors.value = { ...errors }
  return hasValidData && !hasIncompleteProvider
}



// Load data on mount
onMounted(async () => {
  // Save current color preference to restore later if needed
  previousColorPreference.value = colorMode.preference || 'light'
  // Force light mode for this view
  colorMode.preference = 'light'

  // Load cotization data
  console.log('uuid', uuid)
  if (uuid) {
    await getCotizacionByUUID(uuid)
  } else {
    error.value = 'No se pudo obtener la cotización'
  }
})

// Optional: Restore previous preference when leaving the page
onUnmounted(() => {
  // Uncomment the line below if you want to restore the previous theme when leaving this page
  // colorMode.preference = previousColorPreference.value
})

// Save function
const guardarDatos = async () => {
  if (!data.value) return

  // Validate form
  const isValid = validateForm()

  if (!isValid) {
    showError('Error', 'Debe completar al menos el nombre del vendedor y número celular en algún proveedor')
    return
  }

  saving.value = true

  try {

    const providersWithData = data.value.proveedores.filter((proveedor: any) => {
      const hasVendor = proveedor.supplier && proveedor.supplier.trim() !== ''
      const phoneDigits = (proveedor.supplier_phone || '').trim().replace(/\D/g, '')
      const hasRealPhone = phoneDigits.length >= 8
      return hasVendor || hasRealPhone
    })

    // Prepare data for backend
    const payload = {
      proveedores: providersWithData.map((proveedor: any) => ({
        id: proveedor.id,
        supplier_phone: getPhoneBackendValue(proveedor.supplier_phone || ''),
        supplier: proveedor.supplier.trim() !== '' ? proveedor.supplier : null,
      }))
    }

    await withSpinner(async () => {
      // Enviar datos al backend usando el servicio
      const response = await updateProveedores(uuid, payload)
      if (response.success) {
        showSuccess('Éxito', `Se guardaron ${providersWithData.length} proveedores exitosamente`)
        await getCotizacionByUUID(uuid)
      } else {
        showError('Error', response.error || 'No se pudieron guardar los datos. Intente nuevamente.')
      }
    }, 'Guardando datos...')
  } catch (err) {
    console.error('Error saving data:', err)
    showError('Error', 'No se pudieron guardar los datos. Intente nuevamente.')
  } finally {
    saving.value = false
  }


}
</script>
