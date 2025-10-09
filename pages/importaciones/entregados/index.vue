<template>
  <div class="entregados-container">
    <DataTable
      :data="entregados"
      :columns="tableColumns"
      :loading="loading"
      :total-records="pagination.total"
      :items-per-page="pagination.per_page"
      :current-page="pagination.current_page"
      title="Trayectos de Importación"
      subtitle="Lista de trayectos de contenedores"
      icon="i-heroicons-truck"
      show-filters
      show-export
      show-pagination
      show-bottom-section
      show-top-section
    />
  </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
import { h, resolveComponent } from 'vue'
import type { ContainerJourney } from "../../../types/containers"
import { journeySeeder } from "../../../helpers/datatable-seeder"
import type { TableColumn } from '@nuxt/ui'
import { USelect, UBadge, UButton } from '#components'
import { useTrayecto } from '~/composables/clientes/importaciones/useTrayecto'
const { trayectos, loading, error, pagination, search, getTrayectos,getEntregados,entregados } = useTrayecto()
const NuxtLink = resolveComponent('NuxtLink')
const UIcon = resolveComponent('UIcon')

const customers = ref([] as ContainerJourney[])
const isLoading = ref(false)

// Configuración de columnas para NuxtUI DataTable
const tableColumns: ref<TableColumn<any>[]> = ref([
  {
    accessorKey: 'carga',
    header: 'Carga',
    cell: ({ row }) => h('span', { class: 'font-medium' }, `Contenedor #${row.getValue('carga')}`)
  },
  {
    accessorKey: 'fecha_cierre',
    header: 'Fecha Cierre',
    cell: ({ row }) => h('span', {}, formatDateTimeToDmy(row.getValue('fecha_cierre')))
  },
  {
    accessorKey: 'fecha_arribo',
    header: 'Fecha Arribo',
    cell: ({ row }) => h('span', {}, formatDateTimeToDmy(row.getValue('fecha_arribo')))
  },
  {
    accessorKey: 'fecha_entrega',
    header: 'Fecha Entrega',
    cell: ({ row }) => h('span', {}, formatDateTimeToDmy(row.getValue('fecha_entrega')))
  },
  {
    accessorKey: 'qty_box',
    header: 'Qty Box',
    cell: ({ row }) => h('span', { class: 'font-medium' }, row.getValue('qty_box'))
  },
  {
    accessorKey: 'cbm',
    header: 'CBM',
    cell: ({ row }) => h('span', {}, formatNumber(row.getValue('cbm'), 2))
  },
  {
    accessorKey: 'fob',
    header: 'FOB',
    cell: ({ row }) => h('span', { class: 'font-medium text-green-600' }, formatCurrency(row.getValue('fob')))
  },
  {
    accessorKey: 'logistica',
    header: 'Logística',
    cell: ({ row }) => h('span', { class: 'font-medium text-blue-600' }, formatCurrency(row.getValue('logistica')))
  },
  {
    accessorKey: 'impuestos',
    header: 'Impuestos',
    cell: ({ row }) => h('span', { class: 'font-medium text-red-600' }, formatCurrency(row.getValue('impuestos')))
  },
  {
    id: 'actions',
    header: 'Seguimiento',
    cell: ({ row }) => {
      return h(NuxtLink, {
        to: `/importaciones/entregados/seguimiento/${row.original.id}`,
        class: 'flex justify-center items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
      }, [
        h(UIcon, { name: 'i-heroicons-eye', class: 'w-4 h-4 text-gray-600 dark:text-gray-400' }),
      ])
    }
  },
  {
    accessorKey: 'acciones',
    header: 'Inspecciónes',
    cell: ({ row }) => {
      return h(UButton, {
        icon: 'i-heroicons-eye',
        variant: 'ghost',
        size: 'xs',
        onClick: () => {
          navigateTo(`/importaciones/entregados/inspeccion/${row.original.id}`)
        }
      })
    }
  }
])

// Función para formatear fechas
const formatDate = (dateString: string) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

onMounted(() => {
  getEntregados()
  
})

const openSeguimiento = (id: number) => {
  alert(`Abriendo seguimiento para el entregados con ID: ${id}`)
}

</script>