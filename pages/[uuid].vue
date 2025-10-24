<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0"
      style="background-image: url('/assets/img/backgrounds/fondo_clientes.webp'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <!-- Dark overlay for better text readability -->
      <div class="absolute inset-0 opacity-40" style="background-color: black;"></div>
    </div>

    <!-- Theme Toggle Button -->
    <div class="fixed top-4 right-4 z-20">
      <UButton :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" variant="ghost" size="lg" @click="toggleDarkMode"
        class="text-white hover:text-gray-200" />
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-8 pt-16">
      <div class="w-full max-w-6xl">
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
          <!-- Header Card -->
          <UCard class="shadow-2xl border-0 p-6 mb-6">
            <div class="text-center py-4 mb-6">
              <h1 class="text-2xl md:text-3xl font-bold mb-3">
                Hola, por favor llenar los datos de tu proveedor
              </h1>
            </div>
           

          <!-- Provider Cards -->
          <div class="max-h-[600px] overflow-y-auto">
            <UCard v-for="(proveedor, index) in data.proveedores" :key="proveedor.id"
              class="shadow-lg border-0 p-4 md:p-6" :aria-label="`Proveedor ${index + 1}: ${proveedor.products}`"
              role="article" tabindex="0">
              <!-- Mobile Layout (Stacked) -->
              <div class="block md:hidden space-y-4">
                <!-- Product Info -->
                <div class="flex items-center gap-3 p-3 rounded-lg border">
                  <UIcon name="i-heroicons-cube" class="w-5 h-5 " />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-700">Producto</div>
                    <UButton :label="proveedor.products" variant="soft" color="neutral" size="sm"
                      class="justify-start text-xs mt-1" disabled />
                  </div>
                </div>

                <!-- Supplier Code -->
                <div class="flex items-center gap-3 p-3 rounded-lg border">
                  <UIcon name="i-heroicons-tag" class="w-5 h-5 " />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-700">Código Proveedor</div>
                    <UButton :label="proveedor.code_supplier" variant="soft" color="neutral" size="sm"
                      class="justify-start text-xs mt-1" disabled />
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
                      Número celular
                    </label>
                    <div class="relative">
                      
                      <UInput v-model="proveedor.supplier_phone" v-maska="getPhoneMask(proveedor.supplier_phone || '')"
                        placeholder="Ej: 51912345678" size="md" type="tel" :class="[
                          'text-base w-full pl-10',
                          validationErrors[`phone_${proveedor.id}`] ? 'border-red-500 focus:border-red-500' : ''
                        ]" :aria-label="`Número celular para ${proveedor.products}`"
                        @input="handlePhoneInput(proveedor, $event.target.value)" @keypress="onPhoneKeypress" />
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
                      Requerido
                    </small>
                  </div>

                  <!-- Numero celular Column -->
                  <div class="flex flex-col justify-center">
                    <div class="text-sm font-medium  mb-1">Celular</div>
                    <div class="relative">
                     
                      <UInput v-model="proveedor.supplier_phone" v-maska="getPhoneMask(proveedor.supplier_phone || '')"
                        placeholder="Ej: 51912345678" size="sm" type="tel" :class="[
                          'text-sm pl-8',
                          validationErrors[`phone_${proveedor.id}`] ? 'border-red-500 focus:border-red-500' : ''
                        ]" @input="handlePhoneInput(proveedor, $event.target.value)" @keypress="onPhoneKeypress" />
                    </div>
                    <small v-if="validationErrors[`phone_${proveedor.id}`]" class="text-red-500 text-xs mt-1">
                      Requerido
                    </small>
                  </div>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Save Button -->
            <UButton color="primary" size="xl" @click="guardarDatos" :loading="saving"
              class=" text-lg font-semibold py-4 mx-auto flex items-center justify-center"
              :aria-label="`Guardar datos de ${data.proveedores.length} proveedores`">
              <UIcon name="i-heroicons-check" class="w-5 h-5 mr-2 flex items-center justify-center" />
              Guardar Datos
            </UButton>
        </UCard>

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

// Dark mode
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
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

const handlePhoneInput = (proveedor: any, value: string) => {
  // Only allow digits and + at the beginning
  const cleaned = value.replace(/[^\d+]/g, '')
  proveedor.supplier_phone = cleaned

  // Clear validation errors when user starts typing
  if (cleaned.trim() !== '') {
    validationErrors.value[`phone_${proveedor.id}`] = false
  }
}

const handleVendorInput = (proveedor: any, value: string) => {
  // Clear validation errors when user starts typing
  if (value.trim() !== '') {
    validationErrors.value[`vendor_${proveedor.id}`] = false
  }
}

const onPhoneKeypress = (event: KeyboardEvent) => {
  // Allow: backspace, delete, tab, escape, enter, home, end, left, right, up, down
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

const getPhoneBackendValue = (value: string) => {
  // Remove all non-digits for backend
  return value.replace(/\D/g, '')
}

const validateForm = () => {
  if (!data.value?.proveedores) return false

  validationErrors.value = {}
  let hasValidData = false

  data.value.proveedores.forEach((proveedor: any, index: number) => {
    const hasVendor = proveedor.supplier && proveedor.supplier.trim() !== ''
    const hasPhone = proveedor.supplier_phone && proveedor.supplier_phone.trim() !== ''

    // Solo mostrar error si el proveedor tiene al menos un campo con datos
    if (hasVendor || hasPhone) {
      hasValidData = true

      // Si tiene datos pero le falta el otro campo, marcar error
      if (hasVendor && !hasPhone) {
        validationErrors.value[`phone_${proveedor.id}`] = true
        validationErrors.value[`vendor_${proveedor.id}`] = false
      } else if (!hasVendor && hasPhone) {
        validationErrors.value[`vendor_${proveedor.id}`] = true
        validationErrors.value[`phone_${proveedor.id}`] = false
      } else {
        // Si tiene ambos campos, limpiar errores
        validationErrors.value[`vendor_${proveedor.id}`] = false
        validationErrors.value[`phone_${proveedor.id}`] = false
      }
    } else {
      // Si no tiene ningún campo, no mostrar errores
      validationErrors.value[`vendor_${proveedor.id}`] = false
      validationErrors.value[`phone_${proveedor.id}`] = false
    }
  })

  return hasValidData
}

// Load data on mount
onMounted(async () => {
  console.log('uuid', uuid)
  if (uuid) {
    await getCotizacionByUUID(uuid)
  } else {
    error.value = 'No se pudo obtener la cotización'
  }
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
      const hasPhone = proveedor.supplier_phone && proveedor.supplier_phone.trim() !== ''
      return hasVendor || hasPhone
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
