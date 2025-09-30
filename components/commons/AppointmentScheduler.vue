<template>
  <UCard class="h-auto" variant="soft">
    <div class="max-w-6xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div class="space-y-6">
          <div class="rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <UButton @click="previousMonth" icon="i-heroicons-chevron-left" variant="ghost" color="neutral"
                size="sm" />
              <h3 class="text-lg font-semibold text-white">
                {{ currentMonthYear }}
              </h3>
              <UButton @click="nextMonth" icon="i-heroicons-chevron-right" variant="ghost" color="neutral" size="sm" />
            </div>

            <!-- Días de la semana -->
            <div class="grid grid-cols-7 gap-2 mb-3">
              <div v-for="day in daysOfWeek" :key="day" class="text-center text-xs text-gray-400 py-2">
                {{ day }}
              </div>
            </div>

            <!-- Días del mes -->
            <div class="grid grid-cols-7 gap-2">
              <button v-for="date in calendarDays" :key="date.value" @click="selectDate(date)" :class="[
                'w-10 h-10 rounded-full text-sm font-medium transition-all duration-200',
                date.isCurrentMonth
                  ? 'hover:bg-gray-600'
                  : 'text-neutral-500',
                date.isSelected
                  ? 'bg-primary-600 text-white'
                  : '',
                date.isAvailable && date.isCurrentMonth
                  ? 'hover:bg-gray-700'
                  : 'text-neutral-500'
              ]" :disabled="!date.isCurrentMonth || !date.isAvailable">
                {{ date.day }}
              </button>
            </div>
          </div>
        </div>

        <!-- Sección Derecha: Selección de Horario -->
        <div class="space-y-6">

          <div class="rounded-lg p-6">
            <h3 class="text-lg font-semibold mb-4">
              Escoge tu horario:
            </h3>

            <!-- Horarios Disponibles -->
            <div v-if="selectedDate && availableTimeSlotsForSelectedDate.length > 0"
              class="space-y-3 grid grid-cols-3 gap-2">
              <button v-for="timeSlot in availableTimeSlotsForSelectedDate" :key="timeSlot.range_id"
                @click="selectTimeSlot(timeSlot)" :class="[
                  'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 h-20 flex flex-col justify-center',
                  selectedTimeSlot?.range_id === timeSlot.range_id
                    ? 'bg-primary-600 hover:bg-primary-700'
                    : 'bg-gray-600 hover:bg-gray-500'
                ]">
                <div class="text-sm font-semibold flex-col items-center  justify-center ">
                  <div>
                    {{ formatTimeToAMPM(timeSlot.start_time) }}
                  </div>
                  <div>
                    -
                  </div>
                  <div>
                    {{ formatTimeToAMPM(timeSlot.end_time) }}
                  </div>
                </div>

              </button>
            </div>

            <!-- Mensaje cuando no hay horarios disponibles -->
            <div v-else-if="selectedDate && availableTimeSlotsForSelectedDate.length === 0"
              class="mt-6 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <p class="text-yellow-400 text-sm text-center">
                No hay horarios disponibles para esta fecha
              </p>
            </div>

            <!-- Mensaje de Error/Instrucción -->
            <div v-if="!selectedDate" class="mt-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
              <p class="text-red-400 text-sm text-center">
                Seleccione una fecha para ver los horarios disponibles
              </p>
            </div>

            <!-- Botón de Confirmación -->
            <!-- <UButton v-if="selectedDate && selectedTimeSlot" @click="confirmAppointment" color="primary" size="lg" block
              class="mt-6">
              Confirmar Recogida
            </UButton> -->
          </div>

          <!-- Resumen de la Cita -->
          <div v-if="selectedDate && selectedTimeSlot" class="rounded-lg p-6">
            <h4 class="text-lg font-semibold mb-4">
              Resumen de tu recogida
            </h4>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <!--Dirección de recojo: Calle Rio Nazca 243- San Luis. Ref. Al costado de la Agencia Antezana
                ➡  MAPS: https://maps.app.goo.gl/5raLmkX65nNHB2Fr9 -->

                <span class="text-gray-400">Dirección de recojo:</span>
                <span class="text-white ml-2">
                  <div class="flex items-center gap-2 justify-center">
                    Calle Rio Nazca 243- San Luis. Ref. Al costado de la Agencia Antezana
                    <a href="https://maps.app.goo.gl/5raLmkX65nNHB2Fr9" target="_blank" class="text-white">
                      <UButton icon="i-heroicons-map-pin" variant="ghost" color="neutral" size="sm" />
                    </a>
                  </div>
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Fecha:</span>
                <span class="text-white">{{ formatSelectedDate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Horario:</span>
                <span class="text-white">{{ formatTimeToAMPM(selectedTimeSlot.start_time) }} - {{
                  formatTimeToAMPM(selectedTimeSlot.end_time) }}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useModal } from '~/composables/commons/useModal'
import type { Horario, HorarioTime } from '~/types/clientes/delivery/horario'

// Composables
const { showSuccess } = useModal()

// Props
const props = defineProps<{
  horarios: Horario[]
}>()

// Emits
const emit = defineEmits<{
  'date-selected': [date: Date | null, timeSlot: HorarioTime | null]
}>()

// Estado del componente
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const selectedTimeSlot = ref<HorarioTime | null>(null)

// Días de la semana en español
const daysOfWeek = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']

// Meses en español
const months = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// Computed properties
const currentMonthYear = computed(() => {
  const month = months[currentDate.value.getMonth()]
  const year = currentDate.value.getFullYear()
  return `${month} de ${year}`
})

// Crear un Set de fechas disponibles para búsqueda rápida
const availableDates = computed(() => {
  return new Set(
    props.horarios.map(horario => {
      // Crear fecha en formato YYYY-MM-DD para comparación
      const date = new Date(horario.year, horario.month - 1, horario.day)
      return date.toDateString()
    })
  )
})

// Obtener horarios disponibles para la fecha seleccionada
const availableTimeSlotsForSelectedDate = computed(() => {
  if (!selectedDate.value) return []

  const selectedDateString = selectedDate.value.toDateString()

  // Buscar el horario correspondiente a la fecha seleccionada
  const horarioForDate = props.horarios.find(horario => {
    const date = new Date(horario.year, horario.month - 1, horario.day)
    return date.toDateString() === selectedDateString
  })

  // Retornar los slots disponibles (solo los que tienen cupos > 0)
  return horarioForDate?.slots?.filter(slot => slot.available > 0) || []
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // Primer día del mes
  const firstDay = new Date(year, month, 1)
  // Último día del mes
  const lastDay = new Date(year, month + 1, 0)

  // Día de la semana del primer día (0 = Domingo)
  const startDay = firstDay.getDay()

  // Número de días del mes
  const daysInMonth = lastDay.getDate()

  // Días del mes anterior para completar la primera semana
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const days = []

  // Días del mes anterior
  for (let i = startDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    days.push({
      day,
      value: new Date(year, month - 1, day),
      isCurrentMonth: false,
      isSelected: false,
      isAvailable: false
    })
  }

  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const isSelected = selectedDate.value?.toDateString() === date.toDateString()
    const isAvailable = availableDates.value.has(date.toDateString())

    days.push({
      day,
      value: date,
      isCurrentMonth: true,
      isSelected,
      isAvailable
    })
  }

  // Completar con días del mes siguiente
  const remainingDays = 42 - days.length // 6 semanas * 7 días
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      value: new Date(year, month + 1, day),
      isCurrentMonth: false,
      isSelected: false,
      isAvailable: false
    })
  }

  return days
})

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return ''

  const day = selectedDate.value.getDate()
  const month = months[selectedDate.value.getMonth()]
  const year = selectedDate.value.getFullYear()

  return `${day} de ${month} de ${year}`
})

// Métodos
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

// Función para formatear hora a formato AM/PM
const formatTimeToAMPM = (time24: string): string => {
  // Dividir la hora y minutos
  const [hours, minutes] = time24.split(':')
  const hour24 = parseInt(hours, 10)

  // Convertir a formato 12 horas
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
  const ampm = hour24 >= 12 ? 'PM' : 'AM'

  return `${hour12}:${minutes} ${ampm}`
}

const selectDate = (date: any) => {
  if (date.isCurrentMonth && date.isAvailable) {
    selectedDate.value = date.value
    // Resetear horario seleccionado cuando cambia la fecha
    selectedTimeSlot.value = null
    // Emitir evento
    emit('date-selected', selectedDate.value, selectedTimeSlot.value)
  }
}

const selectTimeSlot = (timeSlot: HorarioTime) => {
  selectedTimeSlot.value = timeSlot
  // Emitir evento cuando se selecciona un horario
  emit('date-selected', selectedDate.value, selectedTimeSlot.value)
}

const confirmAppointment = async () => {
  if (!selectedDate.value || !selectedTimeSlot.value) return

  try {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))

    const startTimeFormatted = formatTimeToAMPM(selectedTimeSlot.value.start_time)
    const endTimeFormatted = formatTimeToAMPM(selectedTimeSlot.value.end_time)

    showSuccess(
      '¡Cita confirmada!',
      `Tu cita ha sido programada para el ${formatSelectedDate.value} de ${startTimeFormatted} a ${endTimeFormatted}. Recibirás un recordatorio por correo electrónico.`
    )

    // Resetear selecciones
    selectedDate.value = null
    selectedTimeSlot.value = null

  } catch (error) {
    console.error('Error al confirmar cita:', error)
  }
}

// Configurar fecha inicial al mes actual
onMounted(() => {
  currentDate.value = new Date()
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
.grid {
  display: grid;
}
</style>
