import { TrayectoService } from "~/services/clientes/importaciones/trayectoService"
import type { PaginationInfo } from "~/types/data-table"
import type { Trayecto } from "~/types/clientes/importaciones/trayecto"
export const useTrayecto = () => {
    const trayectos = ref<Trayecto[]>([])
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
    return {
        trayectos,
        loading,
        error,
        pagination,
        search,
        getTrayectos
    }
}