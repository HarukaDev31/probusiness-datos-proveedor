<template>
  <div class="h-auto bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Consolidado #{{ carga }}
        </h1>
        <div v-if="currentStep === 1">
          <p class="text-gray-600 dark:text-gray-300">
          Completa la información para que puedas recoger tu pedido.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Todos los datos enviados mediante este FORMS son confidenciales y no son de dominio público, únicamente los
          usará la empresa para nuestra base de datos.
        </p>
        </div>
        <div v-else-if="currentStep === 2">
          <p class="text-gray-600 dark:text-gray-300">
            Ahora necesitamos los datos para realizar tu comprobante
          </p>
        </div>
        <div v-else-if="currentStep === 3">
          <p class="text-gray-600 dark:text-gray-300">
            Ahora necesitamos los datos del chofer para entregar tu pedido, si aún no cuenta con la información dar
            en continuar
          </p>
        </div>
        <div v-else-if="currentStep === 4">
          <p class="text-gray-600 dark:text-gray-300">
            Por favor selecciona la fecha y hora disponible, después culmina el formulario
          </p>
        </div>
      </div>

      <!-- Stepper -->
      <div class="mb-8">
        <!-- Desktop stepper -->
        <div class="hidden md:flex items-center justify-center">
          <div class="flex items-center space-x-4">
            <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
              <div :class="[
                'flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold',
                currentStep >= index + 1 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              ]">
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" class="w-16 h-1 bg-gray-300 dark:bg-gray-600 mx-2">
                <div :class="[
                  'h-full transition-all duration-300',
                  currentStep > index + 1 ? 'bg-primary-500 w-full' : 'bg-transparent w-0'
                ]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile stepper -->
        <div class="md:hidden">
          <div class="flex items-center justify-between px-4">
            <div v-for="(step, index) in steps" :key="step.id" class="flex flex-col items-center flex-1">
              <div :class="[
                'flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold text-sm mb-2',
                currentStep >= index + 1 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              ]">
                {{ index + 1 }}
              </div>
              <div class="text-xs text-center text-gray-600 dark:text-gray-300 max-w-16">
                {{ step.title}}
              </div>
            </div>
          </div>
          
          <!-- Progress bar móvil -->
          <div class="mt-4 px-4">
            <div class="w-full bg-gray-300 dark:bg-gray-600 h-1 rounded-full">
              <div 
                class="bg-primary-500 h-full rounded-full transition-all duration-300"
                :style="{ width: `${(currentStep / steps.length) * 100}%` }"
              ></div>
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
              <UFormField label="Nombre completo:" required>
                <UInput v-model="formData.nombreCompleto" placeholder="Nombre completo" :disabled="loading"
                  class="w-full" />
              </UFormField>

              <UFormField label="DNI / ID:" required>
                <UInput v-model="formData.dni" placeholder="48558558" :disabled="loading" class="w-full" />
              </UFormField>
            </div>

            <UFormField label="Selecciona el nombre del importador:" required>
              <USelectMenu v-model="formData.importador" :items="clientes" placeholder="Selecciona el importador"
                :disabled="loading" class="w-full" />
            </UFormField>

            <UFormField label="Escoge el tipo de comprobante:" required>
              <USelectMenu v-model="formData.tipoComprobante" :items="tiposComprobante"
                placeholder="Selecciona tipo de comprobante" :disabled="loading" class="w-full" />
            </UFormField>

            <UFormField label="Tipos de productos importado (juguetes, stickers, botellas ... etc):" required>
              <UTextarea v-model="formData.tiposProductos" placeholder="Describe los productos importados" :rows="3"
                :disabled="loading" class="w-full" />
            </UFormField>
          </div>

          <!-- Paso 2: Datos del cliente -->
          <div v-if="currentStep === 2" class="space-y-6">
            <div class="text-center mb-6">
           
              
            </div>
            <div v-if="formData.tipoComprobante.value === 'BOLETA'" class="space-y-4">


              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="DNI:" required>
                  <UInput v-model="formData.clienteDni" placeholder="" :disabled="loading" class="w-full" />
                </UFormField>

                <UFormField label="Nombre completo:" required>
                  <UInput v-model="formData.clienteNombre" placeholder="" :disabled="loading"
                    class="w-full" />
                </UFormField>
              </div>

              <UFormField label="Correo:" required>
                <UInput v-model="formData.clienteCorreo" type="email" placeholder=""
                  :disabled="loading" class="w-full" />
              </UFormField>
            </div>

            <div v-else-if="formData.tipoComprobante.value === 'FACTURA'" class="space-y-4">
              

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="RUC:" required>
                  <UInput v-model="formData.clienteRuc" placeholder="20603287721" :disabled="loading" class="w-full" />
                </UFormField>

                <UFormField label="Razón social:" required>
                  <UInput v-model="formData.clienteRazonSocial" placeholder="Grupo Pro Business sac" :disabled="loading"
                    class="w-full" />
                </UFormField>
              </div>

              <UFormField label="Correo:" required>
                <UInput v-model="formData.clienteCorreo" type="email" placeholder="mvillegas@probusiness.pe"
                  :disabled="loading" class="w-full" />
              </UFormField>
            </div>
          </div>

          <!-- Paso 3: Información del chofer -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="text-center mb-6">
             
              
            </div>



            <div class="space-y-4">
              <UFormField label="Nombre completo del Chofer: (si es usted póngalo)">
                <UInput v-model="formData.choferNombre" placeholder="Nombre del chofer" :disabled="loading"
                  class="w-full" />
              </UFormField>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField label="DNI / ID Chofer:">
                  <UInput v-model="formData.choferDni" placeholder="456457457" :disabled="loading" class="w-full" />
                </UFormField>

                <UFormField label="# de Licencia de conducir:">
                  <UInput v-model="formData.choferLicencia" placeholder="456457457" :disabled="loading"
                    class="w-full" />
                </UFormField>
              </div>

              <UFormField label="Placa del Vehículo:">
                <UInput v-model="formData.choferPlaca" placeholder="456457457" :disabled="loading" class="w-full" />
              </UFormField>

              <UFormField label="Dirección final de destino (colocar la dirección completa de su almacén, casa, etc):">
                <UTextarea v-model="formData.direccionDestino" placeholder="Dirección completa" :rows="2"
                  :disabled="loading" class="w-full" />
              </UFormField>

              <UFormField label="Distrito de la dirección final de destino:">
                <USelectMenu v-model="formData.distritoDestino" :items="distritos" placeholder="Distrito" :disabled="loading" class="w-full" />
              </UFormField>
            </div>
          </div>

          <!-- Paso 4: Selección de fecha -->
          <div v-if="currentStep === 4" class="space-y-6 w-full">
            <div class="text-center mb-6">
             
              
            </div>
            <AppointmentScheduler :horarios="horarios" @date-selected="handleDateSelected" />
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <UButton v-if="currentStep > 1" @click="previousStep" variant="outline" icon="i-heroicons-arrow-left"
              :disabled="loading">
              Anterior
            </UButton>

            <div class="ml-auto">
              <UButton v-if="currentStep < 4" @click="nextStep" icon="i-heroicons-arrow-right" trailing
                :disabled="!canProceedToNextStep || loading" :loading="loading">
                Continuar
              </UButton>
              
              <UButton v-if="currentStep === 4" @click="finalizarReserva" color="primary" size="lg"
                :disabled="!canProceedToNextStep || loading" :loading="loading">
                Terminar formulario
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
import { useDelivery } from '~/composables/clientes/delivery/useDelivery'
import type { ClientesOptions } from '~/types/clientes/delivery/common'
import { useLocation } from '~/composables/commons/useLocation'
import { useSpinner } from '~/composables/commons/useSpinner'
import { useFormPersistence } from '~/composables/commons/useFormPersistence'
import { useRoute } from 'vue-router'
import { useUserRole } from '~/composables/auth/useUserRole'
const { showSuccess, showError } = useModal()
const { getDeliveryByConsolidadoId, clientes, carga, getDeliveryAgency, agencies, saveDeliveryProvincia, saveDeliveryLima, getHorariosDisponibles, horarios } = useDelivery()
const { departamentos, provincias, distritos, getDepartamentos, getProvincias, getDistritos, loadingDepartamentos, loadingProvincias, loadingDistritos } = useLocation()
const { withSpinner } = useSpinner()
const {
  userData,
  currentRole,
  userName,
  userEmail,
  fetchCurrentUser
} = useUserRole()
// Meta
definePageMeta({
  title: 'Formulario de Entrega - Lima',
  layout: 'default',
  middleware: 'auth'
})

// Route
const route = useRoute()
const consolidadoId = route.params.id as string
const { saveFormState, loadFormState, clearFormState } = useFormPersistence('lima', consolidadoId)

// Estado del formulario
const currentStep = ref(1)
const loading = ref(false)


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
  nombreCompleto: '',
  dni: '',
  importador: { label: '', value: '' },
  tipoComprobante: { label: 'BOLETA', value: 'BOLETA' },
  tiposProductos: '',

  // Paso 2
  clienteDni: '',
  clienteNombre: '',
  clienteCorreo: '',
  clienteRuc: '',
  clienteRazonSocial: '',

  // Paso 3
  choferNombre: '',
  choferDni: '',
  choferLicencia: '',
  choferPlaca: '',
  direccionDestino: '',
  distritoDestino: '',

  // Paso 4
  fechaEntrega: null as Date | null,
  horarioSeleccionado: null as any
})

// Opciones para selects


const tiposComprobante = [
  { label: 'BOLETA', value: 'BOLETA' },
  { label: 'FACTURA', value: 'FACTURA' }
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
      if (formData.tipoComprobante.value === 'BOLETA') {
        return formData.clienteDni && formData.clienteNombre && formData.clienteCorreo
      } else if (formData.tipoComprobante.value === 'FACTURA') {
        return formData.clienteRuc && formData.clienteRazonSocial && formData.clienteCorreo
      }
      return false
    case 3:
      return true // Este paso es opcional
    case 4:
      return formData.fechaEntrega !== null && formData.horarioSeleccionado !== null
    default:
      return false
  }
})

// Navegación entre pasos
const nextStep = () => {
  console.log(canProceedToNextStep.value, "waos")
  if (currentStep.value < 4 && canProceedToNextStep.value) {
    currentStep.value++
    // Guardar estado después de cambiar de paso
    saveFormState(formData, currentStep.value)
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    // Guardar estado después de cambiar de paso
    saveFormState(formData, currentStep.value)
  }
}

// Manejo de fecha seleccionada del calendario
const handleDateSelected = (date: Date | null, timeSlot: any) => {
  formData.fechaEntrega = date
  formData.horarioSeleccionado = timeSlot
  // Guardar estado cuando se selecciona fecha/horario
  saveFormState(formData, currentStep.value)
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
    await withSpinner(async () => {
      try {
        const data = {
          ...formData,
          importador: formData.importador.value,
          tipoComprobante: formData.tipoComprobante.value,
          fechaEntrega: formData.fechaEntrega,
          horarioSeleccionado: formData.horarioSeleccionado,
          distritoDestino: formData.distritoDestino.label
        }
        
        const response = await saveDeliveryLima(data)
        console.log(response, "response")
        if (response.success) {
          console.log("exitosamente")
          showSuccess('Guardado exitosamente', 'Los datos se han guardado correctamente')
          // Limpiar estado del localStorage al enviar exitosamente
          clearFormState()
          resetForm()
          navigateTo(`/`)
        } else {
          showError('Error al guardar', response.error || 'Error al guardar los datos')
        }
      } catch (error: any) {
        // Manejar errores de API correctamente
        const errorMessage = error?.response?.data?.message || 
                           error?.message || 
                           'Error al guardar los datos'
        showError('Error al guardar', errorMessage)
        console.error('Error en saveDeliveryLima:', error)
      }
    }, 'Guardando datos de envío...')

  } catch (error: any) {
    // Manejar errores del spinner o otros errores
    const errorMessage = error?.message || 'Error inesperado al procesar el formulario'
    showError('Error al procesar', errorMessage)
    console.error('Error al finalizar formulario:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  currentStep.value = 1

  // Resetear formulario manteniendo algunos valores por defecto
  Object.assign(formData, {
    nombreCompleto: '',
    dni: '',
    importador: { label: '', value: '' },
    tipoComprobante: { label: 'BOLETA', value: 'BOLETA' },
    tiposProductos: '',
    clienteDni: '',
    clienteNombre: '',
    clienteCorreo: '',
    clienteRuc: '',
    clienteRazonSocial: '',
    choferNombre: '',
    choferDni: '',
    choferLicencia: '',
    choferPlaca: '',
    direccionDestino: '',
    distritoDestino: '',
    fechaEntrega: null,
    horarioSeleccionado: null
  })
}

// Actualizar datos del consolidado
watch(() => formData.tipoComprobante, (newValue) => {
  if (newValue.value === 'BOLETA') {
    // Pre-llenar datos para BOLETA
    
  } else if (newValue.value === 'FACTURA') {
    // Pre-llenar datos para FACTURA
    
  }
})
onMounted(async () => {
  // Cargar datos del servidor
  await getDeliveryByConsolidadoId(Number(consolidadoId))
  await getHorariosDisponibles(Number(consolidadoId))
  if(formData.tipoComprobante.value === 'BOLETA'){
    formData.clienteDni = userData.value?.dni || ''
    formData.clienteNombre = userData.value?.name || ''
  }
  formData.clienteCorreo = userData.value?.email || ''
  //// Intentar cargar estado guardado
  const savedState = loadFormState()
  if (savedState) {
    console.log('Estado guardado encontrado:', savedState)
    // Restaurar datos del formulario
    Object.assign(formData, savedState.formData)
    // Restaurar paso actual
    currentStep.value = savedState.currentStep
  }
  await getDistritos('1')
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.step-indicator {
  transition: all 0.3s ease;
}
</style>
