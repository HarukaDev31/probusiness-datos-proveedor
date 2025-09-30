import { BaseService } from "~/services/base/BaseService"
import type { ClientesResponse, AgenciesResponse } from "~/types/clientes/delivery/common"

export class DeliveryService extends BaseService {
    private static baseUrl = 'api/clientes/delivery'

    static async getDeliveryByConsolidadoId(id: number): Promise<ClientesResponse> {
        try {
            const response = await this.apiCall<any>(`${this.baseUrl}/${id}`)
            return response
        } catch (error) {
            console.error('Error al obtener el delivery por consolidado id:', error)
            throw error
        }
    }
    static async getDeliveryAgency(): Promise<AgenciesResponse> {
        try {
            const response = await this.apiCall<AgenciesResponse>(`${this.baseUrl}/agencies`)
            return response
        } catch (error) {
            console.error('Error al obtener el delivery por agency:', error)
            throw error
        }
    }
    static async saveDeliveryProvincia(data: any): Promise<any> {
        try {
            const response = await this.apiCall<any>(`${this.baseUrl}/provincia`, {
                method: 'POST',
                body: data
            })
            return response
        } catch (error) {
            console.error('Error al guardar el delivery por provincia:', error)
            throw error
        }

    }
}