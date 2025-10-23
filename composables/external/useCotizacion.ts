import { CotizacionService } from '~/services/cargaconsolidada/cotizacionService'
export const useCotizacion = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const data = ref<any>(null)

    const getCotizacionByUUID = async (uuid: string) => {
        try {
            loading.value = true
            const response = await CotizacionService.getCotizacionByUUID(uuid)
            data.value = response.data
        } catch (error) {
            loading.value = false
            error.value = error as string
        } finally {
            loading.value = false
        }
    }
    const updateProveedores = async (uuid: string, data: any) => {
        try {
            loading.value = true
            const response = await CotizacionService.updateProveedores(uuid, data)
            return response
        } catch (error) {
            loading.value = false
            error.value = error as string
            throw error
        } finally {
            loading.value = false
        }
    }
    return {
        loading,
        data,
        getCotizacionByUUID,
        updateProveedores,
        error
    }
}