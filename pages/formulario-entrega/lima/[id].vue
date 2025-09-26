<template>
  <div class="h-auto bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Consolidado #{{ consolidadoNumber }}
        </h1>
        <p class="text-gray-600 dark:text-gray-300">
          Completa la información para que puedas recoger tu pedido.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Todos los datos enviados mediante este FORMS son confidenciales y no son de dominio público, únicamente los usará la empresa para nuestra base de datos.
        </p>
      </div>

      <!-- Stepper -->
      <div class="mb-8">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-4">
            <div 
              v-for="(step, index) in steps" 
              :key="step.id"
              class="flex items-center"
            >
              <div 
                :class="[
                  'flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold',
                  currentStep >= index + 1 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                ]"
              >
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" class="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-2">
                <div 
                  :class="[
                    'h-full transition-all duration-300',
                    currentStep > index + 1 ? 'bg-primary-500 w-full' : 'bg-transparent w-0'
                  ]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Container -->
      <UCard class="max-w-4xl mx-auto">
        <form @submit.prevent="handleSubmit">
          <!-- Paso 1: Información básica -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="text-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Persona que recoja la carga:
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField  label="Nombre completo:" required>
                <UInput 
                  v-model="formData.nombreCompleto" 
                  placeholder="Nombre completo" 
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >

              <UFormField  label="DNI / ID:" required>
                <UInput 
                  v-model="formData.dni" 
                  placeholder="48558558" 
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >
            </div>

             <UFormField  label="Selecciona el nombre del importador:" required>
               <USelectMenu
                 v-model="formData.importador"
                 :items="importadores"
                 placeholder="Selecciona el importador"
                 :disabled="loading"
                 class="w-full"
               />
             </UFormField >

            <UFormField  label="Escoge el tipo de comprobante:" required>
              <USelectMenu
                v-model="formData.tipoComprobante"
                :items="tiposComprobante"
                placeholder="Selecciona tipo de comprobante"
                :disabled="loading"
                class="w-full"
              />
            </UFormField >

            <UFormField  label="Tipos de productos importado (juguetes, stickers, botellas ... etc):" required>
              <UTextarea 
                v-model="formData.tiposProductos" 
                placeholder="Describe los productos importados"
                :rows="3"
                :disabled="loading"
                class="w-full"
              />
            </UFormField >
          </div>

          <!-- Paso 2: Datos del cliente -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="text-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Consolidado #{{ consolidadoNumber }} - {{ consolidadoRange }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Ahora necesitamos los datos para realizar tu comprobante
              </p>
            </div>
            <div v-if="formData.tipoComprobante.value === 'boleta'" class="space-y-4">
              

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField  label="DNI:" required>
                  <UInput 
                    v-model="formData.clienteDni" 
                    placeholder="48558558"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >

                <UFormField  label="Nombre completo:" required>
                  <UInput 
                    v-model="formData.clienteNombre" 
                    placeholder="Miguel Villegas Perez"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >
              </div>

              <UFormField  label="Correo:" required>
                <UInput 
                  v-model="formData.clienteCorreo" 
                  type="email"
                  placeholder="mvillegas@probusiness.pe"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >
            </div>

            <div v-else-if="formData.tipoComprobante.value === 'factura'" class="space-y-4">
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p class="text-green-800 dark:text-green-200 text-sm">
                  Si le sale para llenar este formulario, es porque seleccionó factura
                </p>
                <p class="text-green-700 dark:text-green-300 text-sm font-medium mt-1">
                  Correo: Puede salirle la data de su perfil
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField  label="RUC:" required>
                  <UInput 
                    v-model="formData.clienteRuc" 
                    placeholder="20603287721"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >

                <UFormField  label="Razón social:" required>
                  <UInput 
                    v-model="formData.clienteRazonSocial" 
                    placeholder="Grupo Pro Business sac"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >
              </div>

              <UFormField  label="Correo:" required>
                <UInput 
                  v-model="formData.clienteCorreo" 
                  type="email"
                  placeholder="mvillegas@probusiness.pe"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >
            </div>
          </div>

          <!-- Paso 3: Información del chofer -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="text-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Consolidado #{{ consolidadoNumber }} - {{ consolidadoRange }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Ahora necesitamos los datos del chofer para entregar tu pedido, si aún no cuenta con la información dar en continuar
              </p>
            </div>

            

            <div class="space-y-4">
              <UFormField  label="Nombre completo del Chofer: (si es usted póngalo)">
                <UInput 
                  v-model="formData.choferNombre" 
                  placeholder="Nombre del chofer"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField  label="DNI / ID Chofer:">
                  <UInput 
                    v-model="formData.choferDni" 
                    placeholder="456457457"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >

                <UFormField  label="# de Licencia de conducir:">
                  <UInput 
                    v-model="formData.choferLicencia" 
                    placeholder="456457457"
                    :disabled="loading"
                    class="w-full"
                  />
                </UFormField >
              </div>

              <UFormField  label="Placa del Vehículo:">
                <UInput 
                  v-model="formData.choferPlaca" 
                  placeholder="456457457"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >

              <UFormField  label="Dirección final de destino (colocar la dirección completa de su almacén, casa, etc):">
                <UTextarea 
                  v-model="formData.direccionDestino" 
                  placeholder="Dirección completa"
                  :rows="2"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >

              <UFormField  label="Distrito de la dirección final de destino:">
                <UInput 
                  v-model="formData.distritoDestino" 
                  placeholder="Distrito"
                  :disabled="loading"
                  class="w-full"
                />
              </UFormField >
            </div>
          </div>

          <!-- Paso 4: Selección de fecha -->
          <div v-if="currentStep === 4" class="space-y-6 w-full">
            <div class="text-center mb-6">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                Consolidado #{{ consolidadoNumber }} - {{ consolidadoRange }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Por favor selecciona la fecha y hora disponible, después culmina el formulario
              </p>
            </div>

            
              <AppointmentScheduler />

            

           

           
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <UButton 
              v-if="currentStep > 1"
              @click="previousStep"
              variant="outline"
              icon="i-heroicons-arrow-left"
              :disabled="loading"
            >
              Anterior
            </UButton>
            
            <div class="ml-auto">
              <UButton 
                v-if="currentStep < 4"
                @click="nextStep"
                icon="i-heroicons-arrow-right"
                trailing
                :disabled="!canProceedToNextStep || loading"
                :loading="loading"
              >
                Continuar
              </UButton>
            </div>
          </div>
        </form>
      </UCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useModal } from '~/composables/commons/useModal'
import AppointmentScheduler from '~/components/commons/AppointmentScheduler.vue'
// Composables
const { showSuccess } = useModal()

// Meta
definePageMeta({
  title: 'Formulario de Entrega - Lima',
  layout: 'default'
})

// Estado del formulario
const currentStep = ref(1)
const loading = ref(false)

// Datos del consolidado
const consolidadoNumber = ref(23)
const consolidadoRange = ref('25')

// Configuración de pasos
const steps = [
  { id: 1, title: 'Información básica' },
  { id: 2, title: 'Datos del cliente' },
  { id: 3, title: 'Información del chofer' },
  { id: 4, title: 'Selección de fecha' }
]

// Datos del formulario
const formData = reactive({
  // Paso 1
  nombreCompleto: 'Miguel Villegas Perez',
  dni: '48558558',
  importador: { label: 'Miguel Villegas Perez', value: 'miguel_villegas' },
  tipoComprobante: { label: 'BOLETA', value: 'boleta' },
  tiposProductos: 'Juguetes, stickers, botellas de agua, artículos de oficina',
  
  // Paso 2
  clienteDni: '48558558',
  clienteNombre: 'Miguel Villegas Perez',
  clienteCorreo: 'mvillegas@probusiness.pe',
  clienteRuc: '20603287721',
  clienteRazonSocial: 'Grupo Pro Business sac',
  
  // Paso 3
  choferNombre: '',
  choferDni: '456457457',
  choferLicencia: '456457457',
  choferPlaca: '456457457',
  direccionDestino: '',
  distritoDestino: '',
  
  // Paso 4
  fechaEntrega: null as Date | null
})

// Opciones para selects
const importadores = [
  { label: 'Miguel Villegas Perez', value: 'miguel_villegas' },
  { label: 'Ana García López', value: 'ana_garcia' },
  { label: 'Carlos Mendoza Silva', value: 'carlos_mendoza' },
  { label: 'María Rodríguez Torres', value: 'maria_rodriguez' },
  { label: 'José Luis Fernández', value: 'jose_fernandez' }
]

const tiposComprobante = [
  { label: 'BOLETA', value: 'boleta' },
  { label: 'FACTURA', value: 'factura' }
]

// Validaciones por paso
const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.nombreCompleto && 
             formData.dni && 
             formData.importador && 
             formData.tipoComprobante && 
             formData.tiposProductos
    case 2:
      if (formData.tipoComprobante.value === 'boleta') {
        return formData.clienteDni && formData.clienteNombre && formData.clienteCorreo
      } else if (formData.tipoComprobante.value === 'factura') {
        return formData.clienteRuc && formData.clienteRazonSocial && formData.clienteCorreo
      }
      return false
    case 3:
      return true // Este paso es opcional
    case 4:
      return formData.fechaEntrega !== null
    default:
      return false
  }
})

// Navegación entre pasos
const nextStep = () => {
  console.log(canProceedToNextStep.value, "waos")
  if (currentStep.value < 4 && canProceedToNextStep.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Manejo del formulario
const handleSubmit = () => {
  if (currentStep.value < 4) {
    nextStep()
  }
}

const finalizarReserva = async () => {
  loading.value = true
  
  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const fechaFormateada = formData.fechaEntrega ? 
      formData.fechaEntrega.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
    
    showSuccess(
      '¡Reserva completada!',
      `Tu reserva ha sido registrada exitosamente para el ${fechaFormateada}. Recibirás una confirmación por correo electrónico.`
    )
    
    // Resetear formulario después de un delay
    setTimeout(() => {
      resetForm()
    }, 3000)
    
  } catch (error) {
    console.error('Error al finalizar reserva:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  currentStep.value = 1
  
  // Resetear formulario manteniendo algunos valores por defecto
  Object.assign(formData, {
    nombreCompleto: 'Miguel Villegas Perez',
    dni: '48558558',
    importador: { label: 'Miguel Villegas Perez', value: 'miguel_villegas' },
    tipoComprobante: { label: 'BOLETA', value: 'boleta' },
    tiposProductos: 'Juguetes, stickers, botellas de agua, artículos de oficina',
    clienteDni: '48558558',
    clienteNombre: 'Miguel Villegas Perez',
    clienteCorreo: 'mvillegas@probusiness.pe',
    clienteRuc: '20603287721',
    clienteRazonSocial: 'Grupo Pro Business sac',
    choferNombre: '',
    choferDni: '456457457',
    choferLicencia: '456457457',
    choferPlaca: '456457457',
    direccionDestino: '',
    distritoDestino: '',
    fechaEntrega: null
  })
}

// Actualizar datos del consolidado
watch(() => formData.tipoComprobante, (newValue) => {
  if (newValue === 'boleta') {
    // Pre-llenar datos para boleta
    formData.clienteDni = formData.dni
    formData.clienteNombre = formData.nombreCompleto
  } else if (newValue === 'factura') {
    // Pre-llenar datos para factura
    formData.clienteRuc = '20603287721'
    formData.clienteRazonSocial = 'Grupo Pro Business sac'
  }
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.step-indicator {
  transition: all 0.3s ease;
}
</style>
