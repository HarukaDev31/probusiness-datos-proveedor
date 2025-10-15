<template>
    <div class="p-6">
        <PageHeader title="" subtitle="" icon="" :hide-back-button="false"
            @back="navigateTo(`/importaciones/entregados/`)">
            <template #actions>
                <!--button save-->
                <UButton label="Guardar cambios" color="primary" variant="solid" icon="i-heroicons-arrow-down-tray"
                    size="sm" @click="handleSaveChanges" v-if="isCoordinacion" />
            </template>
        </PageHeader>

        <!-- Loading state -->
        <div v-if="loading" class="mt-6">
            <!-- Skeleton para la información del cliente -->
            <UCard class="mb-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 md:w-24 animate-pulse"></div>
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 md:w-36 animate-pulse"></div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                    </div>
                </div>
            </UCard>

            <!-- Skeleton para los tabs -->
            <div class="mb-6">
                <div class="flex space-x-2">
                    <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-24 md:w-32 animate-pulse"></div>
                    <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-24 md:w-32 animate-pulse"></div>
                    <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-24 md:w-32 animate-pulse"></div>
                </div>
            </div>

            <!-- Skeleton para el contenido principal -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Skeleton para la sección de Documentación -->
                <UCard class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <!-- Header skeleton -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                            </div>
                            <div class="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                        </div>

                        <!-- Campos skeleton -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            </div>
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                            </div>
                        </div>

                        <!-- FileUploader skeletons -->
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
                                <div
                                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                    <div
                                        class="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
                                        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    </div>
                                    <div class="mt-4 space-y-2">
                                        <div
                                            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse">
                                        </div>
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
                                <div
                                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                    <div
                                        class="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
                                        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    </div>
                                    <div class="mt-4 space-y-2">
                                        <div
                                            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse">
                                        </div>
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
                                <div
                                    class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                                    <div
                                        class="mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse">
                                        <div class="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                    </div>
                                    <div class="mt-4 space-y-2">
                                        <div
                                            class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto animate-pulse">
                                        </div>
                                        <div
                                            class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>

                <!-- Skeleton para la sección de Cotizaciones -->
                <UCard class="bg-white dark:bg-gray-800 p-6 rounded-lg h-40 shadow-md">
                    <div class="space-y-4">
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    </div>
                </UCard>
            </div>

            <!-- Skeleton para la sección de archivos -->
            <div class="mt-6">
                <UCard class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <div class="space-y-4">
                        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div class="space-y-3">
                                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                                <div class="space-y-2">
                                    <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                    <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                                <div class="space-y-2">
                                    <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                    <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>
            </div>
        </div>

        
        <!-- Main content -->
        <div  class="mt-6 ">
            
            <!-- Tabs de proveedores -->
            <div v-if="providers?.length > 0" class="mb-6">
                <div class="tabs-responsive">
                  <UTabs v-model="activeTab" :items="tabs" size="md" variant="pill"
                    :class="{ 'w-80 md:w-200': tabs.length >=3, 'w-100 md:w-50': tabs.length <3, 'w-80 md:w-300': tabs.length >= 5 }"
                    color="neutral"
                    @update:model-value="handleTabChange" />
                </div>
            </div>


            <!-- Contenido por proveedor -->
            <div v-if="activeFilesAlmacenInspection.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Sección de Documentación -->
                
                <UCard class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                   
                    <div class="space-y-4">
                        <div v-for="file in activeFilesAlmacenInspection"
                            :key="file.id">

                            <FileUploader :accepted-types="['.xlsx', '.png', '.jpg', '.jpeg','.pdf']" :immediate="false"
                                :show-remove-button="false" :initial-files="[{
                                    id: file.id,
                                    file_name: file.file_name,
                                    file_url: file.file_url,
                                    type: file.file_ext,
                                    size: 0,
                                    lastModified: 0,
                                    file_ext: file.file_ext
                                }]" />
                        </div>

                    </div>

                </UCard>
                
            </div>
            <div v-else>
                <p>No hay archivos de inspección</p>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useModal } from '~/composables/commons/useModal'
import { useSpinner } from '~/composables/commons/useSpinner'
import { useVariacionCliente } from '~/composables/cargaconsolidada/useVariacionCliente'
import FileUploader from '~/components/commons/FileUploader.vue'
import type { FileItem } from '~/types/commons/file'

import { ROLES, ID_JEFEVENTAS } from '~/constants/roles'
import { CUSTOMIZED_ICONS_URL } from '~/constants/ui'
import { useUserRole } from '~/composables/auth/useUserRole'
const { currentRole, currentId, isCoordinacion } = useUserRole()
import SimpleUploadFile from '~/components/commons/SimpleUploadFile.vue'
import { useTrayecto } from '~/composables/clientes/importaciones/useTrayecto'
const { showSuccess, showError, showConfirmation } = useModal()
const { withSpinner } = useSpinner()

const { getInspeccion, providers, filesAlmacenInspection,loading,tabs,activeTab,cambiarProveedor,activeFilesAlmacenInspection} = useTrayecto()
import { useOverlay } from '#imports'
const overlay = useOverlay()
const simpleUploadFile = overlay.create(SimpleUploadFile)
// Estado local para cambios pendientes
const pendingChanges = ref({
    volumen_doc: null as number | null,
    valor_doc: null as number | null,
    factura_comercial: null as File | null,
    packing_list: null as File | null,
    excel_confirmacion: null as File | null
})

// Estado para controlar si hay cambios sin guardar
const hasUnsavedChanges = computed(() => {
    return pendingChanges.value.volumen_doc !== null ||
        pendingChanges.value.valor_doc !== null ||
        pendingChanges.value.factura_comercial !== null ||
        pendingChanges.value.packing_list !== null ||
        pendingChanges.value.excel_confirmacion !== null
})

// Route
const route = useRoute()
const uuid =route.params.id

// Manejadores de tabs
const handleTabChange = async (tabId: string) => {
    await cambiarProveedor(tabId)
}

// Manejadores de campos del proveedor
const handleVolumenChange = (value: number) => {
    pendingChanges.value.volumen_doc = value
}

const handleValorChange = (value: number) => {
    pendingChanges.value.valor_doc = value
}

// Manejadores de archivos
const handleFacturaComercial = (files: File[]) => {
    if (files.length > 0) {
        pendingChanges.value.factura_comercial = files[0]
    }
}

const handleRemoveFacturaComercial = (idProveedor: number) => {

    pendingChanges.value.factura_comercial = null
    showConfirmation(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este archivo? Esta acción no se puede deshacer.',
        async () => {
            try {
                await withSpinner(async () => {
                    const result = await deleteFacturaComercial(idProveedor)
                    if (result.success) {
                        showSuccess('Eliminación Exitosa', 'El archivo se ha eliminado correctamente.')
                        await getClienteDocumentacion(clienteId)
                    }
                }, 'Eliminando archivo...')
            } catch (error) {
                console.error('Error al eliminar archivo:', error)
                showError('Error de Eliminación', 'Error al eliminar el archivo')
            }
        }
    )
}

const handlePackingList = (files: File[]) => {
    if (files.length > 0) {
        pendingChanges.value.packing_list = files[0]
    }
}

const handleRemovePackingList = (idProveedor: number) => {
    pendingChanges.value.packing_list = null
    showConfirmation(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este archivo? Esta acción no se puede deshacer.',
        async () => {
            try {
                await withSpinner(async () => {
                    const result = await deletePackingList(idProveedor)
                    if (result.success) {
                        showSuccess('Eliminación Exitosa', 'El archivo se ha eliminado correctamente.')
                        await getClienteDocumentacion(clienteId)
                    }
                }, 'Eliminando archivo...')
            } catch (error) {
                console.error('Error al eliminar archivo:', error)
                showError('Error de Eliminación', 'Error al eliminar el archivo')
            }
        }
    )
}

const handleExcelConfirmacion = (files: File[]) => {
    if (files.length > 0) {
        pendingChanges.value.excel_confirmacion = files[0]
    }
}

const handleRemoveExcelConfirmacion = (idProveedor: number) => {
    pendingChanges.value.excel_confirmacion = null
    showConfirmation(
        'Confirmar eliminación',
        '¿Está seguro de que desea eliminar este archivo? Esta acción no se puede deshacer.',
        async () => {
            try {
                await withSpinner(async () => {
                    const result = await deleteExcelConfirmacion(idProveedor)
                    if (result.success) {
                        showSuccess('Eliminación Exitosa', 'El archivo se ha eliminado correctamente.')
                        await getClienteDocumentacion(clienteId)
                    }
                }, 'Eliminando archivo...')
            } catch (error) {
                console.error('Error al eliminar archivo:', error)
                showError('Error de Eliminación', 'Error al eliminar el archivo')
            }
        }
    )
}

// Función para guardar todos los cambios
const handleSaveChanges = async () => {
    if (!proveedorActivo.value || !hasUnsavedChanges.value) return

    try {
        await withSpinner(async () => {
            // Preparar FormData con todos los cambios
            const formData = new FormData()

            // Agregar valores si han cambiado
            if (pendingChanges.value.volumen_doc !== null) {
                formData.append('volumen_doc', pendingChanges.value.volumen_doc.toString())
            }
            if (pendingChanges.value.valor_doc !== null) {
                formData.append('valor_doc', pendingChanges.value.valor_doc.toString())
            }

            // Agregar archivos si han cambiado
            if (pendingChanges.value.factura_comercial) {
                formData.append('file_comercial', pendingChanges.value.factura_comercial)
            }
            if (pendingChanges.value.packing_list) {
                formData.append('packing_list', pendingChanges.value.packing_list)
            }
            if (pendingChanges.value.excel_confirmacion) {
                formData.append('excel_confirmacion', pendingChanges.value.excel_confirmacion)
            }

            // Agregar IDs
            formData.append('id', clienteId.toString())
            formData.append('idProveedor', proveedorActivo.value.id.toString())

            // Enviar todos los cambios en una sola petición
            const result = await updateProveedorDocumentacion(proveedorActivo.value.id, formData)

            if (!result.success) {
                throw new Error(result.error || 'Error al guardar los cambios')
            }

            // Limpiar cambios pendientes
            pendingChanges.value = {
                volumen_doc: null,
                valor_doc: null,
                factura_comercial: null,
                packing_list: null,
                excel_confirmacion: null
            }

            // Recargar datos
            await getClienteDocumentacion(clienteId)
            showSuccess('Éxito', 'Todos los cambios se han guardado correctamente')
        }, 'Guardando cambios...')
    } catch (error: any) {
        showError('Error', error.message || 'Error al guardar los cambios')
    }
}

// Manejadores de cotizaciones
const handleDownloadCotizacionInicial = async () => {
    if (!cliente.value?.cotizacion_file_url) {
        showError('Error', 'No hay cotización inicial disponible')
        return
    }

    try {
        await withSpinner(async () => {
            const a = document.createElement('a')
            a.href = cliente.value!.cotizacion_file_url!
            a.download = 'cotizacion_inicial'
            a.target = '_blank'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 'Descargando cotización inicial...')

        showSuccess('Éxito', 'Cotización inicial descargada correctamente')
    } catch (error) {
        showError('Error', 'Error al descargar la cotización inicial')
    }
}

const handleDownloadCotizacionFinal = async () => {
    if (!cliente.value?.cotizacion_final_url) {
        showError('Error', 'No hay cotización final disponible')
        return
    }

    try {
        await withSpinner(async () => {
            const a = document.createElement('a')
            a.href = cliente.value!.cotizacion_final_url!
            a.download = 'cotizacion_final'
            a.target = '_blank'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 'Descargando cotización final...')

        showSuccess('Éxito', 'Cotización final descargada correctamente')
    } catch (error) {
        showError('Error', 'Error al descargar la cotización final')
    }
}

// Manejador del botón nuevo documento
const handleNuevoDocumento = () => {
    simpleUploadFile.open({
        title: 'Nuevo Documento',
        withNameField: true,
        onSave: (data: { file: File, name?: string | null }) => {

            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('file', data.file)
            formData.append('id_cotizacion', clienteId.toString())
            formData.append('id_proveedor', proveedorActivo.value.id.toString())
            withSpinner(async () => {
                const result = await createProveedorDocumentacion(formData)
                if (result.success) {
                    showSuccess('Éxito', 'Documento subido correctamente')
                    await getClienteDocumentacion(clienteId)
                } else {
                    showError('Error', 'Error al subir el documento')
                }
            }, 'Subiendo documento...')
        }
    })
}

// Descargar archivo
const downloadArchivo = async (fileUrl: string) => {
    try {
        await withSpinner(async () => {
            const a = document.createElement('a')
            a.href = fileUrl
            a.download = 'archivo'
            a.target = '_blank'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }, 'Descargando archivo...')

        showSuccess('Éxito', 'Archivo descargado correctamente')
    } catch (error) {
        showError('Error', 'Error al descargar el archivo')
    }
}

onMounted(async () => {
    getInspeccion(uuid as string)
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */

.tabs-responsive {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

@media (max-width: 640px) {
    .tabs-responsive {
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .tabs-responsive .u-tabs {
        flex-basis: 100%;
        min-width: 0;
    }
}
</style>
