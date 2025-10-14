import { TrayectoService } from "~/services/clientes/importaciones/trayectoService"
import type { PaginationInfo } from "~/types/data-table"
import type { Trayecto } from "~/types/clientes/importaciones/trayecto"
import type { Provider, FileAlmacenInspection } from "~/types/clientes/importaciones/inspeccion"
import type { Seguimiento } from "~/types/clientes/importaciones/seguimiento"
export const useTrayecto = () => {
    const trayectos = ref<Trayecto[]>([])
    const entregados = ref<Trayecto[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const pagination = ref<PaginationInfo>({
        current_page: 1,
        last_page: 1,
        per_page: 100,
        total: 0,
        from: 0,
        to: 0
    })
    const search = ref('')
    const providers=ref<Provider[]>([])
    const filesAlmacenInspection=ref<FileAlmacenInspection[]>([])
    const tabs=ref<{ id: string; label: string; value: string }[]>([])
    const activeTab=ref<string>('')
    const activeFilesAlmacenInspection=ref<FileAlmacenInspection[]>([])
    const seguimientos=ref<Seguimiento[]>([])
    const cargaInfo=ref<any>(null)
    const getTrayectos = async () => {
        try {
            const params: any = {
                page: pagination.value.current_page,
                limit: pagination.value.per_page
            }
            if (search.value.trim()) {
                params.search = search.value.trim()
            }
            const response = await TrayectoService.getTrayectos(params)
            trayectos.value = response.data
            pagination.value = response.pagination
        } catch (err: any) {
            error.value = err.message
            console.error('Error en getTrayectos:', err)
        } finally {
            loading.value = false
        }
        }
    const getInspeccion = async (uuid: string) => {
        try {
            loading.value = true
            const response = await TrayectoService.getInspeccion(uuid)
            providers.value = response.data.providers
            filesAlmacenInspection.value = response.data.files_almacen_inspection
            await procesarProveedores(response.data)
            if(tabs.value.length > 0) {
                await cambiarProveedor(tabs.value[0]?.value || '')
            }
        } catch (err: any) {
            error.value = err.message
            console.error('Error en getInspeccion:', err)
        } finally {
            loading.value = false
        }
        
    }
    const procesarProveedores = async (data: any) => {
        providers.value = data.providers
        tabs.value = data.providers.map((provider: Provider) => ({
            id: provider.id.toString(),
            label: provider.code_supplier,
            value: provider.code_supplier
        }))
    }
    const cambiarProveedor = async (codeSupplier: string) => {
        activeTab.value = codeSupplier
        const proveedor = providers.value.find(p => p.code_supplier.toString() === codeSupplier)
        console.log(proveedor,'proveedor')
        if (proveedor) {
            activeFilesAlmacenInspection.value = filesAlmacenInspection.value.filter(f => f.id_proveedor === proveedor.id)
        }
    }
    const getSeguimiento = async (uuid: string) => {
        try {
            const response = await TrayectoService.getSeguimiento(uuid)
            seguimientos.value = response.data
            cargaInfo.value = response
        }catch(err: any) {
            error.value = err.message
            console.error('Error en getSeguimiento:', err)
        }
    }
    const getEntregados = async () => {
        try {
            const response = await TrayectoService.getEntregados({
                page: pagination.value.current_page,
                limit: pagination.value.per_page
            })
            entregados.value = response.data
        }catch(err: any) {
            error.value = err.message
            console.error('Error en getEntregados:', err)
        }
    }
    return {
        trayectos,
        loading,
        error,
        pagination,
        search,
        getTrayectos,
        getInspeccion,
        providers,
        filesAlmacenInspection,
        tabs,
        activeTab,
        activeFilesAlmacenInspection,
        cambiarProveedor,
        getSeguimiento,
        seguimientos,
        cargaInfo,
        getEntregados,
        entregados
    }
}