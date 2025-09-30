import { BaseService } from "../base/BaseService"

export class LocationService extends BaseService {
    private static baseUrl = 'api/clientes/ubicacion'

    static async getDepartamentos() {
        try {
            console.log('Llamando a API departamentos...')
            const response = await this.apiCall<any>(`${this.baseUrl}/departamentos`)
            console.log('Respuesta de departamentos:', response)
            return response
        } catch (error) {
            console.error('Error al obtener departamentos:', error)
            throw error
        }
    }

    static async getProvincias(departamentoId) {
        try {
            const response = await this.apiCall<any>(`${this.baseUrl}/provincias/${departamentoId}`, {
                
            })
            return response
        } catch (error) {
            console.error('Error al obtener provincias:', error)
            throw error
        }
    }

    static async getDistritos(provinciaId) {
        try {
            const response = await this.apiCall<any>(`${this.baseUrl}/distritos/${provinciaId}`, {
                
            })
            return response
        } catch (error) {
            console.error('Error al obtener distritos:', error)
            throw error
        }
    }
}