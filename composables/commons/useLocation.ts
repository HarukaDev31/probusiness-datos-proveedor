import { LocationService } from "~/services/commons/locationService"

export const useLocation = () => {
    const departamentos = ref<any[]>([])
    const provincias = ref<any[]>([])
    const distritos = ref<any[]>([])
    const loadingDepartamentos = ref(false)
    const loadingProvincias = ref(false)
    const loadingDistritos = ref(false)
    const getDepartamentos = async () => {
        try {
            const response = await LocationService.getDepartamentos()
            departamentos.value = response.data.map((departamento: any) => ({
                label: departamento.nombre,
                value: departamento.id
            }))
            loadingDepartamentos.value = false
            return response
        } catch (error) {
            console.error('Error en getDepartamentos:', error)
        }
    }
    const getProvincias = async (departamentoId: string) => {
        try {
            loadingProvincias.value = true
            const response = await LocationService.getProvincias(departamentoId)
            provincias.value = response.data.map((provincia: any) => ({
                label: provincia.nombre,
                value: provincia.id
            }))
            return response
        } catch (error) {
            console.error('Error en getProvincias:', error)
        } finally {
            loadingProvincias.value = false
        }
    }
    const getAllProvincias = async () => {
        try {
            const response = await LocationService.getAllProvincias()
            provincias.value = response.data
            return response
        } catch (error) {
            console.error('Error en getAllProvincias:', error)
        }
    }
    const getDistritos = async (provinciaId: string) => {
        try {
            loadingDistritos.value = true
            const response = await LocationService.getDistritos(provinciaId)
            distritos.value = response.data.map((distrito: any) => ({
                label: distrito.nombre,
                value: distrito.id
            }))
            return response
        } catch (error) {
            console.error('Error en getDistritos:', error)
        } finally {
            loadingDistritos.value = false
        }
    }
    return {
        getDepartamentos,
        getProvincias,
        getAllProvincias,
        getDistritos,
        departamentos,
        provincias,
        distritos,
        loadingDepartamentos,
        loadingProvincias,
        loadingDistritos
    }
}   